package com.openschool.services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Binder;
import android.os.Build;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.openschool.util.WebRtcSessionManager;
import com.quickblox.conference.ConferenceClient;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.conference.QBConferenceRole;
import com.quickblox.conference.WsException;
import com.quickblox.conference.callbacks.ConferenceEntityCallback;
import com.quickblox.conference.callbacks.ConferenceSessionCallbacks;
import com.openschool.MainApplication;
import com.openschool.R;
import com.openschool.activity.CallActivity;
import com.openschool.utils.Consts;
import com.openschool.utils.NetworkConnectionChecker;
import com.openschool.utils.ToastUtils;
import com.quickblox.videochat.webrtc.AppRTCAudioManager;
import com.quickblox.videochat.webrtc.BaseSession;
import com.quickblox.videochat.webrtc.QBMediaStreamManager;
import com.quickblox.videochat.webrtc.QBRTCAudioTrack;
import com.quickblox.videochat.webrtc.QBRTCCameraVideoCapturer;
import com.quickblox.videochat.webrtc.QBRTCConfig;
import com.quickblox.videochat.webrtc.QBRTCScreenCapturer;
import com.quickblox.videochat.webrtc.callbacks.QBRTCClientAudioTracksCallback;
import com.quickblox.videochat.webrtc.callbacks.QBRTCClientVideoTracksCallbacks;
import com.quickblox.videochat.webrtc.callbacks.QBRTCSessionStateCallback;
import com.quickblox.videochat.webrtc.view.QBRTCVideoTrack;

import org.webrtc.CameraVideoCapturer;
import org.webrtc.VideoSink;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;


public class CallService extends Service {
    private static final String TAG = CallService.class.getSimpleName();

    private static final int SERVICE_ID = 646;
    private static final String CHANNEL_ID = "Quickblox Conference Channel";
    private static final String CHANNEL_NAME = "Quickblox Background Conference service";
    private static final String ICE_FAILED_REASON = "ICE failed";

    private HashMap<Integer, QBRTCVideoTrack> videoTrackMap = new HashMap<>();
    private CallServiceBinder callServiceBinder = new CallServiceBinder();
    private NetworkConnectionListener networkConnectionListener;
    private NetworkConnectionChecker networkConnectionChecker;
    private SessionStateListener sessionStateListener;
    private VideoTrackListener videoTrackListener;
    private AudioTrackListener audioTrackListener;
    private ConferenceSessionListener conferenceSessionListener;
    private ArrayList<CurrentCallStateCallback> currentCallStateCallbackList = new ArrayList<>();
    private Set<Integer> subscribedPublishers = new CopyOnWriteArraySet<>();
    private ArrayList<Integer> opponentsIDsList = new ArrayList<>();
    private Map<Integer, Boolean> onlineParticipants = new HashMap<>();
    private OnlineParticipantsChangeListener onlineParticipantsChangeListener;
    private OnlineParticipantsCheckerCountdown onlineParticipantsCheckerCountdown;
    private UsersConnectDisconnectCallback usersConnectDisconnectCallback;
    private AppRTCAudioManager audioManager;
    private boolean sharingScreenState = false;
    private boolean isCallState = false;
    private volatile boolean connectedToJanus;
    private String roomID;
    private String roomTitle;
    private String dialogID;
    private boolean asListenerRole;
    private boolean previousDeviceEarPiece;
    private ConferenceSession currentSession;
    private ConferenceClient conferenceClient;

    public static void start(Context context, String roomID, String roomTitle, String dialogID, List<Integer> occupants, boolean listenerRole) {
        Intent intent = new Intent(context, CallService.class);
        intent.putExtra(Consts.EXTRA_ROOM_ID, roomID);
        intent.putExtra(Consts.EXTRA_ROOM_TITLE, roomTitle);
        intent.putExtra(Consts.EXTRA_DIALOG_ID, dialogID);
        intent.putExtra(Consts.EXTRA_DIALOG_OCCUPANTS, (Serializable) occupants);
        intent.putExtra(Consts.EXTRA_AS_LISTENER, listenerRole);

        context.startService(intent);
    }

    public static void stop(Context context) {
        Intent intent = new Intent(context, CallService.class);
        context.stopService(intent);
    }

    @Override
    public void onCreate() {
        currentSession = WebRtcSessionManager.getInstance(this).getCurrentSession();
        initConferenceClient();
        initNetworkChecker();
        initListeners();
        initAudioManager();
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Notification notification = initNotification();
        startForeground(SERVICE_ID, notification);
        if (intent != null) {
            roomID = intent.getStringExtra(Consts.EXTRA_ROOM_ID);
            roomTitle = intent.getStringExtra(Consts.EXTRA_ROOM_TITLE);
            dialogID = intent.getStringExtra(Consts.EXTRA_DIALOG_ID);
            opponentsIDsList = (ArrayList<Integer>) intent.getSerializableExtra(Consts.EXTRA_DIALOG_OCCUPANTS);
            asListenerRole = intent.getBooleanExtra(Consts.EXTRA_AS_LISTENER, false);
        }
        if (!isListenerRole()) {
            onlineParticipantsCheckerCountdown = new OnlineParticipantsCheckerCountdown(Long.MAX_VALUE, 3000);
            onlineParticipantsCheckerCountdown.start();
        }
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        networkConnectionChecker.unregisterListener(networkConnectionListener);
        if (!isListenerRole()) {
            onlineParticipantsCheckerCountdown.cancel();
        }
        removeVideoTrackRenders();
        releaseAudioManager();

        stopForeground(true);
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (notificationManager != null) {
            notificationManager.cancelAll();
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return callServiceBinder;
    }

    private Notification initNotification() {
        Intent notifyIntent = new Intent(this, CallActivity.class);
        notifyIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

        PendingIntent notifyPendingIntent = PendingIntent.getActivity(this, 0,
                notifyIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        String notificationTitle = getString(R.string.notification_title);
        String notificationText = getString(R.string.notification_text, "");


        NotificationCompat.BigTextStyle bigTextStyle = new NotificationCompat.BigTextStyle();
        bigTextStyle.setBigContentTitle(notificationTitle);
        bigTextStyle.bigText(notificationText);

        String channelID = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ?
                createNotificationChannel(CHANNEL_ID, CHANNEL_NAME)
                : getString(R.string.app_name);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, channelID);
        builder.setStyle(bigTextStyle);
        builder.setContentTitle(notificationTitle);
        builder.setContentText(notificationText);
        builder.setWhen(System.currentTimeMillis());
        builder.setSmallIcon(R.drawable.ic_logo_vector);

        Bitmap bitmapIcon = BitmapFactory.decodeResource(getResources(), R.drawable.ic_logo_vector);
        builder.setLargeIcon(bitmapIcon);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            builder.setPriority(NotificationManager.IMPORTANCE_LOW);
        } else {
            builder.setPriority(Notification.PRIORITY_LOW);
        }
        builder.setContentIntent(notifyPendingIntent);

        return builder.build();
    }

    public String getDialogID() {
        return dialogID;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private String createNotificationChannel(String channelID, String channelName) {
        NotificationChannel channel = new NotificationChannel(channelID, channelName, NotificationManager.IMPORTANCE_LOW);
        channel.setLightColor(getColor(R.color.green));
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);

        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) {
            manager.createNotificationChannel(channel);
        }
        return channelID;
    }

    public void setOnlineParticipantsChangeListener(OnlineParticipantsChangeListener onlineParticipantsChangeListener) {
        this.onlineParticipantsChangeListener = onlineParticipantsChangeListener;
    }

    private void initNetworkChecker() {
        networkConnectionChecker = new NetworkConnectionChecker(getApplication());
        networkConnectionListener = new NetworkConnectionListener();
        networkConnectionChecker.registerListener(networkConnectionListener);
    }

    private void initConferenceClient() {
        conferenceClient = ConferenceClient.getInstance(this);
        conferenceClient.setCameraErrorHandler(new CameraEventsListener());
        QBRTCConfig.setDebugEnabled(true);
    }

    private void initListeners() {
        sessionStateListener = new SessionStateListener();
        addSessionStateListener(sessionStateListener);

        videoTrackListener = new VideoTrackListener();
        addVideoTrackListener(videoTrackListener);

        audioTrackListener = new AudioTrackListener();
        addAudioTrackListener(audioTrackListener);

        conferenceSessionListener = new ConferenceSessionListener();
        addConferenceSessionListener(conferenceSessionListener);
    }

    private void initAudioManager() {
        audioManager = AppRTCAudioManager.create(this);
        audioManager.selectAudioDevice(AppRTCAudioManager.AudioDevice.SPEAKER_PHONE);
        previousDeviceEarPiece = false;
        Log.d(TAG, "AppRTCAudioManager.AudioDevice.SPEAKER_PHONE");

        audioManager.setOnWiredHeadsetStateListener((plugged, hasMicrophone) -> {
            if (isCallState) {
                ToastUtils.shortToast(getApplicationContext(), "Headset " + (hasMicrophone ? "with microphone" : "without microphone") + (plugged ? "plugged" : "unplugged"));
            }
            if (!plugged) {
                if (previousDeviceEarPiece) {
                    setAudioDeviceDelayed(AppRTCAudioManager.AudioDevice.EARPIECE);
                } else {
                    setAudioDeviceDelayed(AppRTCAudioManager.AudioDevice.SPEAKER_PHONE);
                }
            }
        });

        audioManager.setBluetoothAudioDeviceStateListener(connected -> {
            if (isCallState) {
                ToastUtils.shortToast(getApplicationContext(), "Bluetooth " + (connected ? "connected" : "disconnected"));
            }
        });

        audioManager.start((audioDevice, set) -> ToastUtils.shortToast(getApplicationContext(), "Audio Device Switched to " + audioDevice));
    }

    private void setAudioDeviceDelayed(final AppRTCAudioManager.AudioDevice audioDevice) {
        new Handler().postDelayed(() -> audioManager.selectAudioDevice(audioDevice), 500);
    }

    private void releaseAudioManager() {
        audioManager.stop();
    }

    public boolean currentSessionExist() {
        return currentSession != null;
    }

    public void leaveCurrentSession() {
        currentSession.leave();
    }

    private void releaseCurrentSession() {
        Log.d(TAG, "Release current session");
        removeSessionStateListener(sessionStateListener);
        removeVideoTrackListener(videoTrackListener);
        removeAudioTrackListener(audioTrackListener);
        removeConferenceSessionListener(conferenceSessionListener);
        CallService.stop(this);
    }

    //Manage Listeners

    private void addSessionStateListener(QBRTCSessionStateCallback callback) {
        if (currentSession != null) {
            currentSession.addSessionCallbacksListener(callback);
        }
    }

    private void removeSessionStateListener(QBRTCSessionStateCallback callback) {
        if (currentSession != null) {
            currentSession.removeSessionCallbacksListener(callback);
        }
    }

    private void addVideoTrackListener(QBRTCClientVideoTracksCallbacks callback) {
        if (currentSession != null) {
            currentSession.addVideoTrackCallbacksListener(callback);
        }
    }

    private void removeVideoTrackListener(QBRTCClientVideoTracksCallbacks callback) {
        if (currentSession != null) {
            currentSession.removeVideoTrackCallbacksListener(callback);
        }
    }

    private void addAudioTrackListener(QBRTCClientAudioTracksCallback callback) {
        if (currentSession != null) {
            currentSession.addAudioTrackCallbacksListener(callback);
        }
    }

    public void removeAudioTrackListener(QBRTCClientAudioTracksCallback callback) {
        if (currentSession != null) {
            currentSession.removeAudioTrackCallbacksListener(callback);
        }
    }

    private void addConferenceSessionListener(ConferenceSessionListener listener) {
        if (currentSession != null) {
            currentSession.addConferenceSessionListener(listener);
        }
    }

    private void removeConferenceSessionListener(ConferenceSessionListener listener) {
        if (currentSession != null) {
            currentSession.removeConferenceSessionListener(listener);
        }
    }

    private void notifyFragmentParticipantsChanged() {
        onlineParticipantsChangeListener.onParticipantsCountChanged(onlineParticipants);
    }

    // Common methods

    public ArrayList<Integer> getOpponentsIDsList() {
        return opponentsIDsList;
    }

    public ArrayList<Integer> getActivePublishers() {
        return new ArrayList<>(currentSession.getActivePublishers());
    }

    public void getOnlineParticipants(ConferenceEntityCallback<Map<Integer, Boolean>> callback) {
        currentSession.getOnlineParticipants(new ConferenceEntityCallback<Map<Integer, Boolean>>() {
            @Override
            public void onSuccess(Map<Integer, Boolean> integerBooleanMap) {
                onlineParticipants = integerBooleanMap;
                callback.onSuccess(integerBooleanMap);
            }

            @Override
            public void onError(WsException e) {
                callback.onError(e);
            }
        });
    }

    public String getRoomID() {
        return roomID;
    }

    public String getRoomTitle() {
        return roomTitle;
    }

    public boolean isListenerRole() {
        return asListenerRole;
    }

    public void setAudioEnabled(boolean enabled) {
        if (currentSession != null && currentSession.getMediaStreamManager() != null
                && currentSession.getMediaStreamManager().getLocalAudioTrack() != null) {
            currentSession.getMediaStreamManager().getLocalAudioTrack().setEnabled(enabled);
        }
    }

    public boolean isAudioEnabledForUser(Integer userID) {
        if (currentSession.getMediaStreamManager() != null) {
            boolean isAudioEnabled = true;
            try {
                isAudioEnabled = currentSession.getMediaStreamManager().getAudioTrack(userID).enabled();
            } catch (Exception e) {
                if (e.getMessage() != null) {
                    Log.d(TAG, e.getMessage());
                }
            }
            return isAudioEnabled;
        } else {
            return false;
        }
    }

    public void setAudioEnabledForUser(Integer userID, boolean isAudioEnabled) {
        currentSession.getMediaStreamManager().getAudioTrack(userID).setEnabled(isAudioEnabled);
    }

    public void setVideoEnabled(boolean videoEnabled) {
        QBMediaStreamManager streamManager = currentSession.getMediaStreamManager();
        QBRTCVideoTrack videoTrack = streamManager.getLocalVideoTrack();
        if (currentSession != null && videoTrack != null) {
            videoTrack.setEnabled(videoEnabled);
        }
    }

    public void switchCamera(CameraVideoCapturer.CameraSwitchHandler cameraSwitchHandler) {
        if (currentSession != null && currentSession.getMediaStreamManager() != null) {
            QBRTCCameraVideoCapturer videoCapturer = (QBRTCCameraVideoCapturer) currentSession.getMediaStreamManager().getVideoCapturer();
            videoCapturer.switchCamera(cameraSwitchHandler);
        }
    }

    public boolean isSharingScreenState() {
        return sharingScreenState;
    }

    public HashMap<Integer, QBRTCVideoTrack> getVideoTrackMap() {
        return videoTrackMap;
    }

    private void addVideoTrack(Integer userId, QBRTCVideoTrack videoTrack) {
        videoTrackMap.put(userId, videoTrack);
    }

    private void removeVideoTrack(int userId) {
        videoTrackMap.remove(userId);
    }

    private void removeVideoTrackRenders() {
        Log.d(TAG, "removeVideoTrackRenders");
        if (!videoTrackMap.isEmpty()) {
            for (Map.Entry<Integer, QBRTCVideoTrack> entry : videoTrackMap.entrySet()) {
                Integer userId = (Integer) entry.getKey();
                QBRTCVideoTrack videoTrack = (QBRTCVideoTrack) entry.getValue();
                Integer currentUserID = currentSession.getCurrentUserID();
                boolean remoteVideoTrack = !userId.equals(currentUserID);
                if (remoteVideoTrack) {
                    VideoSink renderer = videoTrack.getRenderer();
                    if (renderer != null) {
                        videoTrack.removeRenderer(renderer);
                    }
                }
            }
        }
    }

    public void startScreenSharing(Intent data) {
        sharingScreenState = true;
        if (data != null && currentSession != null) {
            currentSession.getMediaStreamManager().setVideoCapturer(new QBRTCScreenCapturer(data, null));
            setVideoEnabled(true);
        }
    }

    public void stopScreenSharing() {
        sharingScreenState = false;
        if (currentSession != null) {
            try {
                currentSession.getMediaStreamManager().setVideoCapturer(new QBRTCCameraVideoCapturer(this, null));
            } catch (QBRTCCameraVideoCapturer.QBRTCCameraCapturerException e) {
                Log.i(TAG, "Error: device doesn't have camera");
            }
        }
    }

    private void subscribeToPublishers(ArrayList<Integer> publishersList) {
        subscribedPublishers.addAll(currentSession.getActivePublishers());
        for (Integer publisher : publishersList) {
            currentSession.subscribeToPublisher(publisher);
        }
    }

    public void joinConference() {
        Log.d(TAG, "Start Join Conference");
        int userID = currentSession.getCurrentUserID();
        QBConferenceRole conferenceRole = asListenerRole ? QBConferenceRole.LISTENER : QBConferenceRole.PUBLISHER;

        currentSession.joinDialog(roomID, conferenceRole, new ConferenceEntityCallback<ArrayList<Integer>>() {
            @Override
            public void onSuccess(ArrayList<Integer> publishers) {
                Log.d(TAG, "onSuccess joinDialog sessionUserID= " + userID + ", publishers= " + publishers);
                if (conferenceClient.isAutoSubscribeAfterJoin()) {
                    subscribedPublishers.addAll(publishers);
                }
                if (asListenerRole) {
                    connectedToJanus = true;
                }
            }

            @Override
            public void onError(WsException exception) {
                Log.d(TAG, "onError joinDialog exception= " + exception);
                ToastUtils.shortToast(getApplicationContext(), "Join exception: " + exception.getMessage());
                releaseCurrentSession();
            }
        });
    }

    private void notifyCallStateListenersCallStarted() {
        for (CurrentCallStateCallback callback : currentCallStateCallbackList) {
            callback.onCallStarted();
        }
    }

    public void setUsersConnectDisconnectCallback(UsersConnectDisconnectCallback callback) {
        this.usersConnectDisconnectCallback = callback;
    }

    public void removeUsersConnectDisconnectCallback() {
        this.usersConnectDisconnectCallback = null;
    }

    //////////////////////////////////////////
    //    Call Service Binder
    //////////////////////////////////////////

    public class CallServiceBinder extends Binder {
        public CallService getService() {
            return CallService.this;
        }
    }

    //////////////////////////////////////////
    //    Conference Session Callbacks
    //////////////////////////////////////////

    private class ConferenceSessionListener implements ConferenceSessionCallbacks {
        @Override
        public void onPublishersReceived(ArrayList<Integer> publishersList) {
            Log.d(TAG, "OnPublishersReceived connectedToJanus " + connectedToJanus);
            subscribedPublishers.addAll(publishersList);
            subscribeToPublishers(publishersList);
        }

        @Override
        public void onPublisherLeft(Integer userID) {
            Log.d(TAG, "OnPublisherLeft userID" + userID);
            subscribedPublishers.remove(userID);
        }

        @Override
        public void onMediaReceived(String type, boolean success) {
            Log.d(TAG, "OnMediaReceived type " + type + ", success" + success);
        }

        @Override
        public void onSlowLinkReceived(boolean uplink, int nacks) {
            Log.d(TAG, "OnSlowLinkReceived uplink " + uplink + ", nacks" + nacks);
        }

        @Override
        public void onError(WsException exception) {
            Log.d(TAG, "OnError exception= " + exception.getMessage());
            if (exception.getMessage().equals(ICE_FAILED_REASON)) {
                releaseCurrentSession();
            }
        }

        @Override
        public void onSessionClosed(ConferenceSession session) {
            Log.d(TAG, "Session " + session.getSessionID() + " start stop session");

            if (session.equals(currentSession)) {
                Log.d(TAG, "Stop session");
                if (audioManager != null) {
                    audioManager.stop();
                }
                releaseCurrentSession();
            }
        }
    }

    //////////////////////////////////////////
    //    Session State Callback
    //////////////////////////////////////////

    private class SessionStateListener implements QBRTCSessionStateCallback<ConferenceSession> {
        @Override
        public void onStateChanged(ConferenceSession conferenceSession, BaseSession.QBRTCSessionState qbrtcSessionState) {
            if (BaseSession.QBRTCSessionState.QB_RTC_SESSION_CONNECTED.equals(qbrtcSessionState)) {
                connectedToJanus = true;
                Log.d(TAG, "onStateChanged and begin subscribeToPublishersIfNeed");
                subscribeToPublishersIfNeed();
            } else {
                connectedToJanus = false;
            }
        }

        private void subscribeToPublishersIfNeed() {
            Set<Integer> notSubscribedPublishers = new CopyOnWriteArraySet<>(currentSession.getActivePublishers());
            notSubscribedPublishers.removeAll(subscribedPublishers);
            if (!notSubscribedPublishers.isEmpty()) {
                subscribeToPublishers(new ArrayList<>(notSubscribedPublishers));
            }
        }

        @Override
        public void onConnectedToUser(ConferenceSession conferenceSession, Integer userID) {
            Log.d(TAG, "onConnectedToUser userID= " + userID + " sessionID= " + conferenceSession.getSessionID());
            isCallState = true;
            notifyCallStateListenersCallStarted();
            if (usersConnectDisconnectCallback != null) {
                usersConnectDisconnectCallback.onUserConnected(userID);
            }
        }

        @Override
        public void onDisconnectedFromUser(ConferenceSession conferenceSession, Integer userID) {
            Log.d(TAG, "QBRTCSessionStateCallbackImpl onDisconnectedFromUser userID=" + userID);
        }

        @Override
        public void onConnectionClosedForUser(ConferenceSession conferenceSession, Integer userID) {
            Log.d(TAG, "QBRTCSessionStateCallbackImpl onConnectionClosedForUser userID=" + userID);
            removeVideoTrack(userID);
            if (usersConnectDisconnectCallback != null) {
                usersConnectDisconnectCallback.onUserDisconnected(userID);
            }
        }
    }

    //////////////////////////////////////////
    //    Network Connection Checker
    //////////////////////////////////////////

    private class NetworkConnectionListener implements NetworkConnectionChecker.OnConnectivityChangedListener {

        @Override
        public void connectivityChanged(boolean availableNow) {
            ToastUtils.shortToast(getApplicationContext(), "Internet Connection " + (availableNow ? "Available" : "Unavailable"));
        }
    }

    //////////////////////////////////////////
    //    Camera Events Handler
    //////////////////////////////////////////

    private class CameraEventsListener implements CameraVideoCapturer.CameraEventsHandler {
        @Override
        public void onCameraError(String s) {
            ToastUtils.shortToast(getApplicationContext(), "Camera Error: " + s);
        }

        @Override
        public void onCameraDisconnected() {
            ToastUtils.shortToast(getApplicationContext(), "Camera Disconnected");
        }

        @Override
        public void onCameraFreezed(String s) {
            ToastUtils.shortToast(getApplicationContext(), "Camera Freezed");
            // TODO: Need to make switching camera OFF and then Switching it ON
            /*if (currentSession != null) {
                try {
                    currentSession.getMediaStreamManager().getVideoCapturer().stopCapture();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                new Timer().schedule(new TimerTask() {
                    @Override
                    public void run() {
                        int videoWidth = QBRTCMediaConfig.VideoQuality.VGA_VIDEO.width;
                        int videoHeight = QBRTCMediaConfig.VideoQuality.VGA_VIDEO.height;

                        if (currentSession != null && currentSession.getMediaStreamManager() != null
                                && currentSession.getMediaStreamManager().getVideoCapturer() != null) {
                            currentSession.getMediaStreamManager().getVideoCapturer().startCapture(videoWidth, videoHeight, 30);
                        }
                    }
                }, 3000);

            }*/
        }

        @Override
        public void onCameraOpening(String s) {
            ToastUtils.shortToast(getApplicationContext(), "Camera Opening");
        }

        @Override
        public void onFirstFrameAvailable() {
            ToastUtils.shortToast(getApplicationContext(), "Camera onFirstFrameAvailable");
        }

        @Override
        public void onCameraClosed() {
            ToastUtils.shortToast(getApplicationContext(), "Camera Closed");
        }
    }

    //////////////////////////////////////////
    //    Video Tracks Callbacks
    //////////////////////////////////////////

    private class VideoTrackListener implements QBRTCClientVideoTracksCallbacks<ConferenceSession> {
        @Override
        public void onLocalVideoTrackReceive(ConferenceSession qbrtcSession, QBRTCVideoTrack videoTrack) {
            Log.d(TAG, "onLocalVideoTrackReceive()");
            if (videoTrack != null) {
                int userID = currentSession.getCurrentUserID();
                removeVideoTrack(userID);
                addVideoTrack(userID, videoTrack);
            }
        }

        @Override
        public void onRemoteVideoTrackReceive(ConferenceSession session, QBRTCVideoTrack videoTrack, Integer userID) {
            Log.d(TAG, "onRemoteVideoTrackReceive for Opponent= " + userID);
            if (videoTrack != null && userID != null) {
                addVideoTrack(userID, videoTrack);
            }
        }
    }

    private class AudioTrackListener implements QBRTCClientAudioTracksCallback<ConferenceSession> {
        @Override
        public void onLocalAudioTrackReceive(ConferenceSession conferenceSession, QBRTCAudioTrack qbrtcAudioTrack) {
            Log.d(TAG, "onLocalAudioTrackReceive()");
            boolean isMicEnabled = ((MainApplication) getApplicationContext()).getSharedPrefsHelper().get(Consts.PREF_MIC_ENABLED, true);
            currentSession.getMediaStreamManager().getLocalAudioTrack().setEnabled(isMicEnabled);
        }

        @Override
        public void onRemoteAudioTrackReceive(ConferenceSession conferenceSession, QBRTCAudioTrack qbrtcAudioTrack, Integer userID) {
            Log.d(TAG, "onRemoteAudioTrackReceive for Opponent= " + userID);
        }
    }

    private class OnlineParticipantsCheckerCountdown extends CountDownTimer {

        OnlineParticipantsCheckerCountdown(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {
            getOnlineParticipants(new ConferenceEntityCallback<Map<Integer, Boolean>>() {
                @Override
                public void onSuccess(Map<Integer, Boolean> integerBooleanMap) {
                    boolean onlineParticipantsCountChanged = onlineParticipants != null && integerBooleanMap.size() != onlineParticipants.size();
                    if (onlineParticipantsCountChanged) {
                        Log.d(TAG, "Participants count changed. Now online is : " + integerBooleanMap.size());
                    }
                    notifyFragmentParticipantsChanged();
                    onlineParticipants = integerBooleanMap;
                }

                @Override
                public void onError(WsException e) {
                    if (e != null) {
                        Log.d(TAG, "Error Getting Online Participants - " + e.getMessage());
                    }
                }
            });
        }

        @Override
        public void onFinish() {
            start();
        }
    }

    public interface OnChangeDynamicToggle {

        void enableDynamicToggle(boolean plugged, boolean wasEarpiece);
    }

    public interface CurrentCallStateCallback {

        void onCallStarted();
    }

    public interface UsersConnectDisconnectCallback {

        void onUserConnected(Integer userID);

        void onUserDisconnected(Integer userID);
    }

    public interface OnlineParticipantsChangeListener {

        void onParticipantsCountChanged(Map<Integer, Boolean> onlineParticipants);
    }
}