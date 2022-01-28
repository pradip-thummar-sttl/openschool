package com.openschool.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;

import com.openschool.BuildConfig;
import com.openschool.Model.ChatVO;
import com.openschool.R;
import com.openschool.adapter.ChatAdapter;
import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.callbacks.SubscribeCallback;
import com.pubnub.api.enums.PNLogVerbosity;
import com.pubnub.api.enums.PNReconnectionPolicy;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.pubsub.PNMessageResult;
import com.pubnub.api.models.consumer.pubsub.PNPresenceEventResult;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

public class GroupChatActivity extends AppCompatActivity {

    private PubNub pubnub;
    private List<ChatVO> _chatList = new ArrayList<>();
    private RecyclerView _recyclerView;
    private ChatAdapter _chatAdapter;
    private ImageView _btnSend, _btnBack;
    private EditText _edtText;

    private String currentUserID;
    private String currentUserName;
    private String currentDialogId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_chat);

        onVerbSet();
        onSetEvent();
        initChat();
        onGetChatHitory();
    }
    private void onVerbSet() {
        _edtText = (EditText) findViewById(R.id.edtText);
        _btnSend = (ImageView) findViewById(R.id.btnSend);
        _btnBack = (ImageView) findViewById(R.id.btnBack);
        _recyclerView = (RecyclerView) findViewById(R.id.recyclerChat);
        _chatAdapter = new ChatAdapter(_chatList);

        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext(),LinearLayoutManager.VERTICAL,true);
        _recyclerView.setLayoutManager(mLayoutManager);
        _recyclerView.setItemAnimator(new DefaultItemAnimator());
        _recyclerView.setAdapter(_chatAdapter);

        Intent intent = getIntent();
        currentUserID = intent.getStringExtra("CURRENT_ID");
        currentUserName = intent.getStringExtra("CURRENT_NAME");
        currentDialogId = intent.getStringExtra("DIALOG_ID");
    }

    private void onSetEvent() {
        _btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if ((_edtText.getText().toString()).matches(""))
                    return;
                else
                    onSendMsg();

            }
        });
        _btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    private void initChat() {

        // tag::KEYS-2[]
        String pubKey = BuildConfig.PUB_KEY;
        String subKey = BuildConfig.SUB_KEY;
        // end::KEYS-2[]

        // tag::INIT-1.2[]
        PNConfiguration pnConfiguration = new PNConfiguration();
        pnConfiguration.setPublishKey(pubKey);
        pnConfiguration.setSubscribeKey(subKey);
        pnConfiguration.setUuid("myUniqueUUID");

        pnConfiguration.setLogVerbosity(PNLogVerbosity.BODY);
        pnConfiguration.setReconnectionPolicy(PNReconnectionPolicy.LINEAR);
        pnConfiguration.setMaximumReconnectionRetries(10);

        pubnub = new PubNub(pnConfiguration);

        pubnub.addListener(new SubscribeCallback() {
            // PubNub status
            @Override
            public void status(PubNub pubnub, PNStatus status) {
                switch (status.getOperation()) {
                    // combine unsubscribe and subscribe handling for ease of use
                    case PNSubscribeOperation:
                    case PNUnsubscribeOperation:
                        // Note: subscribe statuses never have traditional errors,
                        // just categories to represent different issues or successes
                        // that occur as part of subscribe
                        switch (status.getCategory()) {
                            case PNConnectedCategory:
                                // No error or issue whatsoever.
                            case PNReconnectedCategory:
                                // Subscribe temporarily failed but reconnected.
                                // There is no longer any issue.
                            case PNDisconnectedCategory:
                                // No error in unsubscribing from everything.
                            case PNUnexpectedDisconnectCategory:
                                // Usually an issue with the internet connection.
                                // This is an error: handle appropriately.
                            case PNAccessDeniedCategory:
                                // PAM does not allow this client to subscribe to this
                                // channel and channel group configuration. This is
                                // another explicit error.
                            default:
                                // You can directly specify more errors by creating
                                // explicit cases for other error categories of
                                // `PNStatusCategory` such as `PNTimeoutCategory` or
                                // `PNMalformedFilterExpressionCategory` or
                                // `PNDecryptionErrorCategory`.
                        }

                    case PNHeartbeatOperation:
                        // Heartbeat operations can in fact have errors, so it's important to check first for an error.
                        // For more information on how to configure heartbeat notifications through the status
                        // PNObjectEventListener callback, refer to
                        // /docs/sdks/java/android/api-reference/configuration#configuration_basic_usage
                        if (status.isError()) {
                            // There was an error with the heartbeat operation, handle here
                        } else {
                            // heartbeat operation was successful
                        }
                    default: {
                        // Encountered unknown status type
                    }
                }
            }

            // Messages
            @Override
            public void message(PubNub pubnub, PNMessageResult message) {
                String dt = getDateFormate(message.getTimetoken() / 10000, "dd,MMM yy hh:mm");
                String messagePublisher = message.getPublisher();
                String msg = (message.getMessage() + "").replace("\"", "");

                String[] splitStr = msg.split("###");

                ChatVO chatView = new ChatVO(messagePublisher, splitStr[2].equals(currentUserID)  ? "You" : splitStr[1],  splitStr[0], dt);
                onUpdateMassageList(chatView);
            }

            // Presence
            @Override
            public void presence(PubNub pubnub, PNPresenceEventResult presence) {
                System.out.println("Presence Event: " + presence.getEvent());
                // Can be join, leave, state-change or timeout

                System.out.println("Presence Channel: " + presence.getChannel());
                // The channel to which the message was published

                System.out.println("Presence Occupancy: " + presence.getOccupancy());
                // Number of users subscribed to the channel

                System.out.println("Presence State: " + presence.getState());
                // User state

                System.out.println("Presence UUID: " + presence.getUuid());
                // UUID to which this event is related

                presence.getJoin();
                // List of users that have joined the channel (if event is 'interval')

                presence.getLeave();
                // List of users that have left the channel (if event is 'interval')

                presence.getTimeout();
                // List of users that have timed-out off the channel (if event is 'interval')

                presence.getHereNowRefresh();
                // Indicates to the client that it should call 'hereNow()' to get the
                // complete list of users present in the channel.
            }

        });

        pubnub.subscribe().channels(Arrays.asList(currentDialogId)).execute();
    }

    private void onGetChatHitory() {
//        pubnub.history()
//                .channel("history_channel") // where to fetch history from
//                .count(100) // how many items to fetch
//                .async(new PNCallback<PNHistoryResult>() {
//                    @Override
//                    public void onResponse(PNHistoryResult result, PNStatus status) {
//
//                    }
//                });
//
//        _chatAdapter.notifyDataSetChanged();


    }

    private void onSendMsg(){
        String msg = _edtText.getText().toString() +"###"+ currentUserName +"###"+currentUserID;
        pubnub.publish().message(msg).channel(currentDialogId).async(new PNCallback<PNPublishResult>() {
            @Override
            public void onResponse(PNPublishResult result, PNStatus status) {
                _edtText.setText("");
            }
        });
    }

    private void onUpdateMassageList(ChatVO chatView) {

        int newIndex = 0;
        _chatList.add(newIndex,chatView);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                _chatAdapter.notifyItemInserted(newIndex);
                _recyclerView.smoothScrollToPosition(newIndex);
            }
        });
    }

    public static String getDateFormate(long milliSeconds, String dateFormat)
    {
        // Create a DateFormatter object for displaying date in specified format.
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);

        // Create a calendar object that will convert the date and time value in milliseconds to date.
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        return formatter.format(calendar.getTime());
    }
}