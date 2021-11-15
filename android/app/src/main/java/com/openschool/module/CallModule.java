package com.openschool.module;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.openschool.activity.CallActivity;
import com.openschool.util.QBResRequestExecutor;
import com.openschool.util.WebRtcSessionManager;
import com.quickblox.conference.ConferenceClient;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.conference.WsException;
import com.quickblox.conference.callbacks.ConferenceEntityCallback;
import com.quickblox.core.helper.StringifyArrayList;
import com.quickblox.users.model.QBUser;
import com.quickblox.videochat.webrtc.QBRTCTypes;

import java.util.ArrayList;
import java.util.List;

public class CallModule extends ReactContextBaseJavaModule {

    private QBResRequestExecutor requestExecutor;
    private WebRtcSessionManager webRtcSessionManager;

    public CallModule(ReactApplicationContext context) {
        super(context);

        init();
    }

    @Override
    public String getName() {
        return "CallModule";
    }

    private void init() {
        requestExecutor = getQbResRequestExecutor();
        webRtcSessionManager = WebRtcSessionManager.getInstance(getCurrentActivity());
    }

    @ReactMethod
    public void qbLaunchLiveClass(String dialogID,
                                  String currentUserID,
                                  String currentName,
                                  ReadableArray occupants,
                                  ReadableArray userNames,
                                  ReadableArray names,
                                  boolean isTeacher,
                                  String teacherQBUserID,
                                  String title,
                                  ReadableArray channels,
                                  Callback callBack) {

        ArrayList<QBUser> selectedUsers = new ArrayList<>();
        List<Integer> selectedOccupants = new ArrayList<>();
        List<String> channelList = new ArrayList<>();
        for (int i = 0; i < occupants.size(); i++) {
            QBUser qbUser = new QBUser();
            StringifyArrayList<String> userTags = new StringifyArrayList<>();
            userTags.add(occupants.getString(i));

            qbUser.setId(Integer.parseInt(occupants.getString(i)));
            qbUser.setFullName(names.getString(i));
            qbUser.setEmail(userNames.getString(i));
            qbUser.setLogin(userNames.getString(i));
            if (isTeacher) {
                qbUser.setCustomData(channels.getString(i));
            }
            qbUser.setTags(userTags);

            selectedUsers.add(qbUser);
            selectedOccupants.add(Integer.parseInt(occupants.getString(i)));
        }

        for (int i = 0; i < channels.size(); i++) {
            channelList.add(channels.getString(i));
        }

        System.out.println("KDKD: Welcome to the CallModule! " + dialogID + " " + currentUserID + " " + currentName + " " + occupants + " " + userNames + " " + names + " " + teacherQBUserID + " " + isTeacher + selectedUsers.size());
        startConference(dialogID, currentUserID, currentName, selectedUsers, true, selectedOccupants, false, isTeacher, teacherQBUserID, title, channelList, callBack);
    }

    private void startConference(final String dialogID, String currentUserID, String currentName, ArrayList<QBUser> selectedUsers, boolean isVideoCall, final List<Integer> occupants, final boolean asListener, boolean isTeacher, String teacherQBUserID, String title, final List<String> channels, Callback callBack) {
        ConferenceClient client = ConferenceClient.getInstance(getCurrentActivity());

        QBRTCTypes.QBConferenceType conferenceType = isVideoCall
                ? QBRTCTypes.QBConferenceType.QB_CONFERENCE_TYPE_VIDEO
                : QBRTCTypes.QBConferenceType.QB_CONFERENCE_TYPE_AUDIO;

        client.createSession(Integer.parseInt(currentUserID), conferenceType, new ConferenceEntityCallback<ConferenceSession>() {
            @Override
            public void onSuccess(ConferenceSession session) {
                webRtcSessionManager.setCurrentSession(session);

                CallActivity.start(getCurrentActivity(), dialogID, currentName, currentUserID, occupants, selectedUsers, asListener, isTeacher, teacherQBUserID, title, channels, callBack);
            }

            @Override
            public void onError(WsException responseException) {
                callBack.invoke(responseException.getMessage(), null);
            }
        });
    }

    public synchronized QBResRequestExecutor getQbResRequestExecutor() {
        return requestExecutor == null
                ? requestExecutor = new QBResRequestExecutor()
                : requestExecutor;
    }
}
