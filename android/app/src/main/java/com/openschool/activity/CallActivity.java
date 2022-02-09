package com.openschool.activity;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.database.Cursor;
import android.media.MediaScannerConnection;
import android.media.projection.MediaProjectionManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;

import com.facebook.react.bridge.Callback;
import com.hbisoft.hbrecorder.HBRecorder;
import com.hbisoft.hbrecorder.HBRecorderListener;
import com.openschool.BuildConfig;
import com.openschool.R;
import com.openschool.fragments.AudioConversationFragment;
import com.openschool.fragments.BaseConversationFragment;
import com.openschool.fragments.ConversationFragmentCallbackListener;
import com.openschool.fragments.OnCallEventsController;
import com.openschool.fragments.ScreenShareFragment;
import com.openschool.fragments.VideoConversationFragment;
import com.openschool.util.Consts;
import com.openschool.util.FragmentExecuotr;
import com.openschool.util.NetworkConnectionChecker;
import com.openschool.util.ParentActivityImpl;
import com.openschool.util.WebRtcSessionManager;
import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.enums.PNLogVerbosity;
import com.pubnub.api.enums.PNReconnectionPolicy;
import com.quickblox.conference.ConferenceClient;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.conference.QBConferenceRole;
import com.quickblox.conference.WsException;
import com.quickblox.conference.WsHangUpException;
import com.quickblox.conference.callbacks.ConferenceEntityCallback;
import com.quickblox.conference.callbacks.ConferenceSessionCallbacks;
import com.quickblox.users.model.QBUser;
import com.quickblox.videochat.webrtc.AppRTCAudioManager;
import com.quickblox.videochat.webrtc.BaseSession;
import com.quickblox.videochat.webrtc.QBRTCCameraVideoCapturer;
import com.quickblox.videochat.webrtc.QBRTCConfig;
import com.quickblox.videochat.webrtc.QBRTCScreenCapturer;
import com.quickblox.videochat.webrtc.QBRTCTypes;
import com.quickblox.videochat.webrtc.callbacks.QBRTCSessionStateCallback;

import org.webrtc.CameraVideoCapturer;

import java.io.File;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * QuickBlox team
 */
public class CallActivity extends BaseActivity implements QBRTCSessionStateCallback<ConferenceSession>, ConferenceSessionCallbacks,
        OnCallEventsController, ConversationFragmentCallbackListener, NetworkConnectionChecker.OnConnectivityChangedListener, ParentActivityImpl,
        HBRecorderListener {

    //    private static final String TAG = CallActivity.class.getSimpleName();
    private static final String TAG = "KDKDKD";
    private static final String ICE_FAILED_REASON = "ICE failed";

    private HBRecorder hbRecorder;
    private final int SCREEN_RECORD_REQUEST_CODE = 1002;
    public static final int POLLING_REQUEST_CODE = 1003;
    public static final int POLLING_ANS_REQUEST_CODE = 1004;

    private ConferenceSession currentSession;
    private String hangUpReason;
    private ConferenceClient rtcClient;
    private OnChangeDynamicToggle onChangeDynamicCallback;
    private SharedPreferences sharedPref;
    private LinearLayout connectionView;
    private AppRTCAudioManager audioManager;
    private NetworkConnectionChecker networkConnectionChecker;
    private WebRtcSessionManager sessionManager;
    private boolean isVideoCall;
    private ArrayList<CurrentCallStateCallback> currentCallStateCallbackList = new ArrayList<>();
    private ArrayList<Integer> opponentsIdsList;
    private ArrayList<QBUser> opponentsList;
    private boolean callStarted;
    private boolean previousDeviceEarPiece;
    private boolean showToastAfterHeadsetPlugged = true;
    private Set<Integer> subscribedPublishers = new CopyOnWriteArraySet<>();
    private volatile boolean connectedToJanus;
    private String dialogID;
    private boolean readyToSubscribe;
    private boolean asListenerRole;
    private boolean isTeacher;
    private String currentUserID;
    private String currentName;
    private String teacherQBUserID;
    private String title;
    private ArrayList<String> channelList;
    private static Callback _callback;

    private PubNub mPubNub; // a field of MainActivity.java

    public static void start(Context context, String dialogID, String currentName, String currentUserID, List<Integer> occupants, ArrayList<QBUser> selectedUsers, boolean listenerRole, boolean isTeacher, String teacherQBUserID, String title, List<String> channels, Callback callBack) {
        System.out.println("KDKD: Start()");
        _callback = callBack;
        Intent intent = new Intent(context, CallActivity.class);
        intent.putExtra(Consts.EXTRA_DIALOG_ID, dialogID);
        intent.putExtra(Consts.EXTRA_DIALOG_OCCUPANTS, (Serializable) occupants);
        intent.putExtra(Consts.EXTRA_SELECTED_DIALOG_OCCUPANTS, selectedUsers);
        intent.putExtra(Consts.EXTRA_AS_LISTENER, listenerRole);
        intent.putExtra(Consts.EXTRA_CURRENTUSERID, currentUserID);
        intent.putExtra(Consts.EXTRA_CURRENTUSERNAME, currentName);
        intent.putExtra(Consts.EXTRA_DIALOG_IS_TEACHER, isTeacher);
        intent.putExtra(Consts.EXTRA_TEACHER_USER_ID, teacherQBUserID);
        intent.putExtra(Consts.TITLE, title);
        intent.putExtra(Consts.EXTRA_CHANNELS, (Serializable) channels);

        context.startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        boolean tabletSize = getResources().getBoolean(R.bool.isTablet);
        if(tabletSize)
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        parseIntentExtras();

        sessionManager = WebRtcSessionManager.getInstance(this);
        if (!currentSessionExist()) {
            //we have already currentSession == null, so it's no reason to do further initialization
            finish();
            Log.d(TAG, "finish CallActivity");
            return;
        }
        isVideoCall = QBRTCTypes.QBConferenceType.QB_CONFERENCE_TYPE_VIDEO.equals(currentSession.getConferenceType());
        initCurrentSession(currentSession);

//        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);
        sharedPref = PreferenceManager.getDefaultSharedPreferences(this);
        initConferenceClient();
        initAudioManager();
        initWiFiManagerListener();

        connectionView = (LinearLayout) View.inflate(this, R.layout.connection_popup, null);

        hbRecorder = new HBRecorder(this, this);
        System.out.println("KDKD: CallActivity " + hbRecorder);

        initializePubNub();

        startConversationFragment();
    }

    @Override
    protected View getSnackbarAnchorView() {
        return null;
    }

    private boolean currentSessionExist() {
        currentSession = sessionManager.getCurrentSession();
        return currentSession != null;
    }

//    @Override
//    protected View getSnackbarAnchorView() {
//        return null;
//    }

    private void parseIntentExtras() {
        dialogID = getIntent().getExtras().getString(Consts.EXTRA_DIALOG_ID);
        opponentsIdsList = (ArrayList<Integer>) getIntent().getSerializableExtra(Consts.EXTRA_DIALOG_OCCUPANTS);
        opponentsList = (ArrayList<QBUser>) getIntent().getSerializableExtra(Consts.EXTRA_SELECTED_DIALOG_OCCUPANTS);
        asListenerRole = getIntent().getBooleanExtra(Consts.EXTRA_AS_LISTENER, false);
        currentUserID = getIntent().getStringExtra(Consts.EXTRA_CURRENTUSERID);
        currentName = getIntent().getStringExtra(Consts.EXTRA_CURRENTUSERNAME);
        isTeacher = getIntent().getBooleanExtra(Consts.EXTRA_DIALOG_IS_TEACHER, false);
        teacherQBUserID = getIntent().getStringExtra(Consts.EXTRA_TEACHER_USER_ID);
        title = getIntent().getStringExtra(Consts.TITLE);
        channelList = (ArrayList<String>) getIntent().getSerializableExtra(Consts.EXTRA_CHANNELS);
    }

    private void initAudioManager() {
        audioManager = AppRTCAudioManager.create(this, new AppRTCAudioManager.OnAudioManagerStateListener() {
            @Override
            public void onAudioChangedState(AppRTCAudioManager.AudioDevice audioDevice) {
                if (callStarted) {
                    if (audioManager.getSelectedAudioDevice() == AppRTCAudioManager.AudioDevice.EARPIECE) {
                        previousDeviceEarPiece = true;
                    } else if (audioManager.getSelectedAudioDevice() == AppRTCAudioManager.AudioDevice.SPEAKER_PHONE) {
                        previousDeviceEarPiece = false;
                    }
                    if (showToastAfterHeadsetPlugged) {
                        Toast.makeText(CallActivity.this, "Audio device switched to  " + audioDevice, Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        if (isVideoCall) {
            audioManager.setDefaultAudioDevice(AppRTCAudioManager.AudioDevice.SPEAKER_PHONE);
            Log.d(TAG, "AppRTCAudioManager.AudioDevice.SPEAKER_PHONE");
        } else {
            audioManager.setDefaultAudioDevice(AppRTCAudioManager.AudioDevice.EARPIECE);
            previousDeviceEarPiece = true;
            Log.d(TAG, "AppRTCAudioManager.AudioDevice.EARPIECE");
        }

        audioManager.setOnWiredHeadsetStateListener(new AppRTCAudioManager.OnWiredHeadsetStateListener() {
            @Override
            public void onWiredHeadsetStateChanged(boolean plugged, boolean hasMicrophone) {
                if (callStarted) {
                    Toast.makeText(CallActivity.this, "Headset " + (plugged ? "plugged" : "unplugged"), Toast.LENGTH_SHORT).show();
                }
                if (onChangeDynamicCallback != null) {
                    if (!plugged) {
                        showToastAfterHeadsetPlugged = false;
                        if (previousDeviceEarPiece) {
                            setAudioDeviceDelayed(AppRTCAudioManager.AudioDevice.EARPIECE);
                        } else {
                            setAudioDeviceDelayed(AppRTCAudioManager.AudioDevice.SPEAKER_PHONE);
                        }
                    }
                    onChangeDynamicCallback.enableDynamicToggle(plugged, previousDeviceEarPiece);
                }
            }
        });
        audioManager.init();
    }

    private void setAudioDeviceDelayed(final AppRTCAudioManager.AudioDevice audioDevice) {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                showToastAfterHeadsetPlugged = true;
                audioManager.setAudioDevice(audioDevice);
            }
        }, 500);
    }

    private void initConferenceClient() {
        rtcClient = ConferenceClient.getInstance(this);

        rtcClient.setCameraErrorHandler(new CameraVideoCapturer.CameraEventsHandler() {
            @Override
            public void onCameraError(final String s) {

//                showToast("Camera error: " + s);
            }

            @Override
            public void onCameraDisconnected() {
//                showToast("Camera onCameraDisconnected: ");
            }

            @Override
            public void onCameraFreezed(String s) {
//                showToast("Camera freezed: " + s);
                if (currentSession != null) {
                    leaveCurrentSession();
                }
            }

            @Override
            public void onCameraOpening(String s) {
//                showToast("Camera aOpening: " + s);
            }

            @Override
            public void onFirstFrameAvailable() {
//                showToast("onFirstFrameAvailable: ");
            }

            @Override
            public void onCameraClosed() {
            }
        });
        QBRTCConfig.setDebugEnabled(true);
    }

    @Override
    public void connectivityChanged(boolean availableNow) {
        if (callStarted) {
            showToast("Internet connection " + (availableNow ? "available" : " unavailable"));
        }
    }

    private void initWiFiManagerListener() {
        networkConnectionChecker = new NetworkConnectionChecker(getApplication());
    }

    public void leaveCurrentSession() {
        currentSession.leave();
    }

    private void setAudioEnabled(boolean isAudioEnabled) {
        if (currentSession != null && currentSession.getMediaStreamManager() != null) {
            currentSession.getMediaStreamManager().getLocalAudioTrack().setEnabled(isAudioEnabled);
        }
    }

    private void setVideoEnabled(boolean isVideoEnabled) {
        if (currentSession != null && currentSession.getMediaStreamManager() != null) {
            currentSession.getMediaStreamManager().getLocalVideoTrack().setEnabled(isVideoEnabled);
        }
    }

    @TargetApi(21)
    @Override
    public void onStartScreenSharing() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            return;
        }
        QBRTCScreenCapturer.requestPermissions(CallActivity.this);
    }

    private void startScreenSharing(final Intent data) {
        ScreenShareFragment screenShareFragment = ScreenShareFragment.newIntstance();
        FragmentExecuotr.addFragmentWithBackStack(getSupportFragmentManager(), R.id.fragment_container, screenShareFragment, ScreenShareFragment.TAG);
        currentSession.getMediaStreamManager().setVideoCapturer(new QBRTCScreenCapturer(data, null));
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, final Intent data) {
        Log.i(TAG, "onActivityResult requestCode=" + requestCode + ", resultCode= " + resultCode);
        if (requestCode == QBRTCScreenCapturer.REQUEST_MEDIA_PROJECTION) {
            if (resultCode == Activity.RESULT_OK) {
                startScreenSharing(data);
                Log.i(TAG, "Starting screen capture");
            } else {

            }
        } else if (requestCode == SCREEN_RECORD_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                //Start screen recording
                setOutputPath();

                hbRecorder.startScreenRecording(data, resultCode, this);
            }
        } else if (resultCode == POLLING_REQUEST_CODE || resultCode == POLLING_ANS_REQUEST_CODE) {
            for (Fragment fragment : getSupportFragmentManager().getFragments()) {
                fragment.onActivityResult(requestCode, resultCode, data);
            }
        }
    }

    @Override
    public void onStartScreenRecording(boolean isChecked) {
        if (!isChecked) {
            if (hbRecorder != null) {
                System.out.println("KDKD: Stopping is in progress");
                hbRecorder.stopScreenRecording();
            }
        } else {
            startRecordingScreen();
        }
    }

    ContentResolver resolver;
    ContentValues contentValues;
    Uri mUri;

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void setOutputPath() {
        String filename = generateFileName();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            resolver = this.getContentResolver();
            contentValues = new ContentValues();
            contentValues.put(MediaStore.Video.Media.RELATIVE_PATH, "DCIM/" + "OpenSchool");
            contentValues.put(MediaStore.Video.Media.TITLE, filename);
            contentValues.put(MediaStore.MediaColumns.DISPLAY_NAME, filename);
            contentValues.put(MediaStore.MediaColumns.MIME_TYPE, "video/mp4");
            mUri = resolver.insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, contentValues);
            //FILE NAME SHOULD BE THE SAME
            hbRecorder.setFileName(filename);
            hbRecorder.setOutputUri(mUri);
        } else {
            createFolder();
            hbRecorder.setOutputPath(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM) + "/OpenSchool");
        }
    }

    private String generateFileName() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss", Locale.getDefault());
        Date curDate = new Date(System.currentTimeMillis());
        return "MY CLASS RECORDING";
    }

    private void createFolder() {
        File f1 = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM), "OpenSchool");
        if (!f1.exists()) {
            if (f1.mkdirs()) {
                Log.i("Folder ", "created");
            }
        }
    }

    @Override
    public void HBRecorderOnStart() {
        System.out.println("KDKDKD: Recording Started");
    }

    @Override
    public void HBRecorderOnComplete() {
        System.out.println("KDKDKD: Recording Stoped");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            System.out.println("KDKD: " + mUri);
        } else {
            refreshGalleryFile();
        }
    }

    private void refreshGalleryFile() {
        MediaScannerConnection.scanFile(this,
                new String[]{hbRecorder.getFilePath()}, null,
                new MediaScannerConnection.OnScanCompletedListener() {
                    public void onScanCompleted(String path, Uri uri) {
                        mUri = Uri.parse(path);
                        Log.i("ExternalStorage", "Scanned " + path + ":");
                        Log.i("ExternalStorage", "-> uri=" + uri);
                    }
                });
    }

    @Override
    public void HBRecorderOnError(int errorCode, String reason) {
        System.out.println("KDKDKD: " + errorCode + ": " + reason);
    }

    private void startRecordingScreen() {
        MediaProjectionManager mediaProjectionManager = (MediaProjectionManager) this.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
        Intent permissionIntent = mediaProjectionManager != null ? mediaProjectionManager.createScreenCaptureIntent() : null;
        startActivityForResult(permissionIntent, SCREEN_RECORD_REQUEST_CODE);
    }

    @Override
    protected void onResume() {
        super.onResume();
        readyToSubscribe = true;
        subscribeToPublishersIfNeed();
        networkConnectionChecker.registerListener(this);
    }

    private void subscribeToPublishersIfNeed() {
        Set<Integer> notSubscribedPublishers = new CopyOnWriteArraySet<>(currentSession.getActivePublishers());
        notSubscribedPublishers.removeAll(subscribedPublishers);
        if (!notSubscribedPublishers.isEmpty()) {
            subscribeToPublishers(new ArrayList<>(notSubscribedPublishers));
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        readyToSubscribe = false;
        networkConnectionChecker.unregisterListener(this);
    }

    @Override
    protected void onStop() {
        super.onStop();
    }


    public void initCurrentSession(ConferenceSession session) {
        if (session != null) {
            Log.d(TAG, "Init new ConferenceSession");
            this.currentSession = session;
            this.currentSession.addSessionCallbacksListener(CallActivity.this);
            this.currentSession.addConferenceSessionListener(CallActivity.this);
        }
    }

    public void releaseCurrentSession() {
        Log.d(TAG, "Release current session");
        if (currentSession != null) {
            leaveCurrentSession();
            this.currentSession.removeSessionCallbacksListener(CallActivity.this);
            this.currentSession.removeConferenceSessionListener(CallActivity.this);
            this.currentSession = null;
        }
    }

    // ---------------Chat callback methods implementation  ----------------------//


    @Override
    public void onConnectionClosedForUser(ConferenceSession session, Integer userID) {
        Log.d(TAG, "QBRTCSessionStateCallbackImpl onConnectionClosedForUser userID=" + userID);
        // Close app after session close of network was disabled
        if (hangUpReason != null && hangUpReason.equals(Consts.WIFI_DISABLED)) {
            Intent returnIntent = new Intent();
            setResult(Consts.CALL_ACTIVITY_CLOSE_WIFI_DISABLED, returnIntent);
            finish();
        }
    }

    @Override
    public void onConnectedToUser(ConferenceSession session, final Integer userID) {
        Log.d(TAG, "onConnectedToUser userID= " + userID + " sessionID= " + session.getSessionID());
        callStarted = true;
        notifyCallStateListenersCallStarted();

        Log.d(TAG, "onConnectedToUser() is started");
    }

    @Override
    public void onStateChanged(ConferenceSession session, BaseSession.QBRTCSessionState state) {
        if (BaseSession.QBRTCSessionState.QB_RTC_SESSION_CONNECTED.equals(state)) {
            connectedToJanus = true;
            Log.d(TAG, "onStateChanged and begin subscribeToPublishersIfNeed");
            subscribeToPublishersIfNeed();
        }
    }

    @Override
    public void onDisconnectedFromUser(ConferenceSession session, Integer userID) {
        Log.d(TAG, "QBRTCSessionStateCallbackImpl onDisconnectedFromUser userID=" + userID);
    }

    private void showToast(final int message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(CallActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showToast(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(CallActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });
    }


    private Fragment getCurrentFragment() {
        return getSupportFragmentManager().findFragmentById(R.id.fragment_container);
    }

    private void startConversationFragment() {
        Bundle bundle = new Bundle();
        bundle.putIntegerArrayList(Consts.EXTRA_DIALOG_OCCUPANTS, opponentsIdsList);
        bundle.putSerializable(Consts.EXTRA_SELECTED_DIALOG_OCCUPANTS, opponentsList);
        bundle.putBoolean(Consts.EXTRA_AS_LISTENER, asListenerRole);
        bundle.putString(Consts.EXTRA_CURRENTUSERID, currentUserID);
        bundle.putString(Consts.EXTRA_CURRENTUSERNAME, currentName);
        bundle.putBoolean(Consts.EXTRA_DIALOG_IS_TEACHER, isTeacher);
        bundle.putString(Consts.EXTRA_TEACHER_USER_ID, teacherQBUserID);
        bundle.putString(Consts.TITLE, title);
        bundle.putStringArrayList(Consts.EXTRA_CHANNELS, channelList);
        bundle.putString(Consts.EXTRA_DIALOG_ID, dialogID);

        BaseConversationFragment conversationFragment = BaseConversationFragment.newInstance(
                isVideoCall
                        ? new VideoConversationFragment()
                        : new AudioConversationFragment());
        conversationFragment.setArguments(bundle);
        FragmentExecuotr.addFragment(getSupportFragmentManager(), R.id.fragment_container, conversationFragment, conversationFragment.getClass().getSimpleName());

    }


    public void onUseHeadSet(boolean use) {
        audioManager.setManageHeadsetByDefault(use);
    }

    @Override
    public void onBackPressed() {
    }

    ////////////////////////////// ConversationFragmentCallbackListener ////////////////////////////

    @Override
    public void addClientConnectionCallback(QBRTCSessionStateCallback clientConnectionCallbacks) {
        if (currentSession != null) {
            currentSession.addSessionCallbacksListener(clientConnectionCallbacks);
        }
    }

    @Override
    public void onSetAudioEnabled(boolean isAudioEnabled) {
        setAudioEnabled(isAudioEnabled);
    }

    @Override
    public void onLeaveCurrentSession() {
//        _callback.invoke(null, mUri.getPath());

        if (mUri != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                String path = getRealPath(this.getContentResolver(), mUri, null);
                _callback.invoke(null,"file://"+path);
            } else {
                _callback.invoke(null, "file://"+mUri.getPath());
            }
        }

        leaveCurrentSession();
        finish();
    }

    @SuppressLint("Recycle")
    private static String getRealPath(ContentResolver contentResolver, Uri uri, String whereClause) {
        String ret = "";

        // Query the uri with condition.

        Cursor cursor = contentResolver.query(uri, null, whereClause, null, null);

        if (cursor != null) {
            boolean moveToFirst = cursor.moveToFirst();
            if (moveToFirst) {

                // Get columns name by uri type.
                String columnName = MediaStore.Images.Media.DATA;

                if (uri == MediaStore.Images.Media.EXTERNAL_CONTENT_URI) {
                    columnName = MediaStore.Images.Media.DATA;
                } else if (uri == MediaStore.Audio.Media.EXTERNAL_CONTENT_URI) {
                    columnName = MediaStore.Audio.Media.DATA;
                } else if (uri == MediaStore.Video.Media.EXTERNAL_CONTENT_URI) {
                    columnName = MediaStore.Video.Media.DATA;
                }

                // Get column index.
                int columnIndex = cursor.getColumnIndex(columnName);

                // Get column value which is the uri related file local path.
                ret = cursor.getString(columnIndex);
            }
        }

        return ret;
    }

    @Override
    public void onSwitchCamera(CameraVideoCapturer.CameraSwitchHandler cameraSwitchHandler) {
        ((QBRTCCameraVideoCapturer) (currentSession.getMediaStreamManager().getVideoCapturer()))
                .switchCamera(cameraSwitchHandler);
    }

    @Override
    public void onStartJoinConference() {
        int userID = currentSession.getCurrentUserID();
        QBConferenceRole conferenceRole = asListenerRole ? QBConferenceRole.LISTENER : QBConferenceRole.PUBLISHER;
        currentSession.joinDialog(dialogID, conferenceRole, new JoinedCallback(userID));
    }

    @Override
    public void onSetVideoEnabled(boolean isNeedEnableCam) {
        setVideoEnabled(isNeedEnableCam);
    }

    @Override
    public void onSwitchAudio() {
        if (audioManager.getSelectedAudioDevice() == AppRTCAudioManager.AudioDevice.WIRED_HEADSET
                || audioManager.getSelectedAudioDevice() == AppRTCAudioManager.AudioDevice.EARPIECE) {
            audioManager.setAudioDevice(AppRTCAudioManager.AudioDevice.SPEAKER_PHONE);
        } else {
            audioManager.setAudioDevice(AppRTCAudioManager.AudioDevice.EARPIECE);
        }
    }

    @Override
    public void removeClientConnectionCallback(QBRTCSessionStateCallback clientConnectionCallbacks) {
        if (currentSession != null) {
            currentSession.removeSessionCallbacksListener(clientConnectionCallbacks);
        }
    }

    @Override
    public void addCurrentCallStateCallback(CurrentCallStateCallback currentCallStateCallback) {
        currentCallStateCallbackList.add(currentCallStateCallback);
    }

    @Override
    public void removeCurrentCallStateCallback(CurrentCallStateCallback currentCallStateCallback) {
        currentCallStateCallbackList.remove(currentCallStateCallback);
    }

    @Override
    public void addOnChangeDynamicToggle(OnChangeDynamicToggle onChangeDynamicCallback) {
        this.onChangeDynamicCallback = onChangeDynamicCallback;
    }

    @Override
    public void removeOnChangeDynamicToggle(OnChangeDynamicToggle onChangeDynamicCallback) {
        this.onChangeDynamicCallback = null;
    }

    ////////////////////////////// ConferenceSessionCallbacks ////////////////////////////

    private void subscribeToPublishers(ArrayList<Integer> publishersList) {
        subscribedPublishers.addAll(currentSession.getActivePublishers());
        for (Integer publisher : publishersList) {
            currentSession.subscribeToPublisher(publisher);
        }
    }

    @Override
    public void onPublishersReceived(ArrayList<Integer> publishersList) {
        Log.d(TAG, "OnPublishersReceived connectedToJanus " + connectedToJanus + ", readyToSubscribe= " + readyToSubscribe);
        if (connectedToJanus && readyToSubscribe) {
            subscribedPublishers.addAll(publishersList);
            subscribeToPublishers(publishersList);
        }
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
        Log.d(TAG, "OnError getClass= " + exception.getClass());
        if (WsHangUpException.class.isInstance(exception)) {
            Log.d(TAG, "OnError exception= " + exception.getMessage());
            if (exception.getMessage().equals(ICE_FAILED_REASON)) {
                showToast(exception.getMessage());
                releaseCurrentSession();
                finish();
            }
        } else {
            Toast.makeText(this, exception.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onSessionClosed(final ConferenceSession session) {
        Log.d(TAG, "Session " + session.getSessionID() + " start stop session");

        if (session.equals(currentSession)) {
            Log.d(TAG, "Stop session");

            if (audioManager != null) {
                audioManager.close();
            }
            releaseCurrentSession();

            finish();
        }
    }

    //////////////////////////////////////////   end   /////////////////////////////////////////////

    public interface OnChangeDynamicToggle {
        void enableDynamicToggle(boolean plugged, boolean wasEarpiece);
    }


    public interface CurrentCallStateCallback {
        void onCallStarted();
    }

    private void notifyCallStateListenersCallStarted() {
        for (CurrentCallStateCallback callback : currentCallStateCallbackList) {
            callback.onCallStarted();
        }
    }

    private class JoinedCallback implements ConferenceEntityCallback<ArrayList<Integer>> {
        Integer userID;

        JoinedCallback(Integer userID) {
            this.userID = userID;
        }

        @Override
        public void onSuccess(ArrayList<Integer> publishers) {
            Log.d(TAG, "onSuccess joinDialog sessionUserID= " + userID + ", publishers= " + publishers);
            if (rtcClient.isAutoSubscribeAfterJoin()) {
                subscribedPublishers.addAll(publishers);
            }
            if (asListenerRole) {
                connectedToJanus = true;
            }
        }

        @Override
        public void onError(WsException exception) {
            Log.d(TAG, "onError joinDialog exception= " + exception);
            showToast("Join exception: " + exception.getMessage());
//            releaseCurrentSession();
//            finish();
        }
    }

    private void initializePubNub() {
        // tag::KEYS-2[]
       try {
           String pubKey = BuildConfig.PUB_KEY;
           String subKey = BuildConfig.SUB_KEY;
           // end::KEYS-2[]

           // tag::INIT-1.2[]

           PNConfiguration pnConfiguration = new PNConfiguration("myUniqueUUID");
           pnConfiguration.setPublishKey(pubKey);
           pnConfiguration.setSubscribeKey(subKey);
           pnConfiguration.setLogVerbosity(PNLogVerbosity.BODY);
           pnConfiguration.setReconnectionPolicy(PNReconnectionPolicy.LINEAR);
           pnConfiguration.setMaximumReconnectionRetries(10);

           mPubNub = new PubNub(pnConfiguration);
       }catch (Exception e){
           e.printStackTrace();
       }
        // end::INIT-1.2[]
    }

    @Override
    public PubNub getPubNub() {
        return mPubNub;
    }
}