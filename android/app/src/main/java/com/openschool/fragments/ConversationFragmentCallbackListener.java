package com.openschool.fragments;

import com.openschool.activity.CallActivity;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.videochat.webrtc.callbacks.QBRTCSessionStateCallback;
import com.quickblox.videochat.webrtc.view.QBRTCVideoTrack;

import org.webrtc.CameraVideoCapturer;

import java.util.HashMap;


public interface ConversationFragmentCallbackListener {

    void addClientConnectionCallback(QBRTCSessionStateCallback<ConferenceSession> clientConnectionCallbacks);

    void removeClientConnectionCallback(QBRTCSessionStateCallback clientConnectionCallbacks);

    void addCurrentCallStateCallback(CallActivity.CurrentCallStateCallback currentCallStateCallback);

    void removeCurrentCallStateCallback(CallActivity.CurrentCallStateCallback currentCallStateCallback);

    void addOnChangeDynamicToggle(CallActivity.OnChangeDynamicToggle onChangeDynamicCallback);

    void removeOnChangeDynamicToggle(CallActivity.OnChangeDynamicToggle onChangeDynamicCallback);

    void onSetAudioEnabled(boolean isAudioEnabled);

    void onSetVideoEnabled(boolean isNeedEnableCam);

    void onSwitchAudio();

    void onLeaveCurrentSession();

    boolean isScreenSharingState();

    HashMap<Integer, QBRTCVideoTrack> getVideoTrackMap();

    void onStartScreenSharing();

    void onStartScreenRecording(boolean isChecked);

    void onSwitchCamera(CameraVideoCapturer.CameraSwitchHandler cameraSwitchHandler);

    void onStartJoinConference();
}