package com.openschool.activity;

import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.OpenableColumns;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.openschool.BuildConfig;
import com.openschool.Model.ChatVO;
import com.openschool.R;
import com.openschool.adapter.ChatAdapter;
import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.PubNubException;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.callbacks.SubscribeCallback;
import com.pubnub.api.enums.PNLogVerbosity;
import com.pubnub.api.enums.PNReconnectionPolicy;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.files.PNFileUploadResult;
import com.pubnub.api.models.consumer.files.PNFileUrlResult;
import com.pubnub.api.models.consumer.objects_api.channel.PNChannelMetadataResult;
import com.pubnub.api.models.consumer.objects_api.membership.PNMembershipResult;
import com.pubnub.api.models.consumer.objects_api.uuid.PNUUIDMetadataResult;
import com.pubnub.api.models.consumer.pubsub.PNMessageResult;
import com.pubnub.api.models.consumer.pubsub.PNPresenceEventResult;
import com.pubnub.api.models.consumer.pubsub.PNSignalResult;
import com.pubnub.api.models.consumer.pubsub.files.PNFileEventResult;
import com.pubnub.api.models.consumer.pubsub.message_actions.PNMessageActionResult;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.InputStream;
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
    private ImageView _btnSend, _btnBack, _btnAttachment;
    private EditText _edtText;
    private ProgressBar _progressBar;

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
        _progressBar = (ProgressBar) findViewById(R.id.progressBar);
        _edtText = (EditText) findViewById(R.id.edtText);
        _btnSend = (ImageView) findViewById(R.id.btnSend);
        _btnAttachment = (ImageView) findViewById(R.id.btnAttachment);
        _btnBack = (ImageView) findViewById(R.id.btnBack);
        _recyclerView = (RecyclerView) findViewById(R.id.recyclerChat);
        _chatAdapter = new ChatAdapter(_chatList, new ChatAdapter.Onclick() {
            @Override
            public void onDownload(String url) {

//                pubnub.getFile()
//                        .channel("my_channel")
//                        .fileName("cat_picture.jpg")
//                        .fileId("d9515cb7-48a7-41a4-9284-f4bf331bc770")
//                        .async(new PNCallback<PNDownloadFileResult>() {
//                            @Override
//                            public void onResponse(PNDownloadFileResult result, PNStatus status) {
//                                if (!status.isError()) {
//                                    System.out.println("getFile fileName: " + result.getFileName());
//                                    System.out.println("getFile byteStream: " + result.getByteStream());
//                                }
//                                System.out.println("getFileonDownload status code: " + status.getStatusCode());
//                            }
//                        });

                System.out.println("KDKDKD: value " + url);
                File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).getPath() + "/OpenSchool/" + getFileName(url));

                Uri uri = Uri.parse(url);
                DownloadManager.Request request = new DownloadManager.Request(uri);
                request.setTitle(getFileName(url));
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationUri(Uri.fromFile(file));

                DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
                long reference = manager.enqueue(request);
                System.out.println("KDKDKD: reference " + reference);
            }
        });

        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, true);
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

        _btnAttachment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Intent chooseFile = new Intent(Intent.ACTION_GET_CONTENT);
                chooseFile.addCategory(Intent.CATEGORY_OPENABLE);
                chooseFile.setType("*/*");
                startActivityForResult(
                        Intent.createChooser(chooseFile, "Choose a file"),
                        2022
                );
            }
        });
    }

    private void initChat() {

        try {
            String pubKey = BuildConfig.PUB_KEY;
            String subKey = BuildConfig.SUB_KEY;
            PNConfiguration pnConfiguration = null;
            pnConfiguration = new PNConfiguration("myUniqueUUID");
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
                    String msg = (message.getMessage().getAsString()).replace("\"", "");
                    String[] splitStr = msg.split("###");

                    ChatVO chatView;
                    if (splitStr[3].equals("TEXT"))
                        chatView = new ChatVO(messagePublisher, splitStr[2].equals(currentUserID) ? "You" : splitStr[1], splitStr[0], dt, splitStr[3], "", "");
                    else {
                        chatView = new ChatVO(splitStr[4], splitStr[2].equals(currentUserID) ? "You" : splitStr[1], "", dt, splitStr[3], splitStr[0], getFileName(splitStr[0]));
                    }
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

//                    System.out.println("Presence State: " + presence.getState());
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

                @Override
                public void signal(@NotNull PubNub pubnub, @NotNull PNSignalResult pnSignalResult) {

                }

                @Override
                public void uuid(@NotNull PubNub pubnub, @NotNull PNUUIDMetadataResult pnUUIDMetadataResult) {

                }

                @Override
                public void channel(@NotNull PubNub pubnub, @NotNull PNChannelMetadataResult pnChannelMetadataResult) {

                }

                @Override
                public void membership(@NotNull PubNub pubnub, @NotNull PNMembershipResult pnMembershipResult) {

                }

                @Override
                public void messageAction(@NotNull PubNub pubnub, @NotNull PNMessageActionResult pnMessageActionResult) {

                }

                @Override
                public void file(@NotNull PubNub pubnub, @NotNull PNFileEventResult pnFileEventResult) {
                    onSendAttachment(pnFileEventResult.getFile().getUrl(), pnFileEventResult.getFile().getId());
                }

            });

            pubnub.subscribe().channels(Arrays.asList(currentDialogId)).execute();
        } catch (PubNubException e) {
            e.printStackTrace();
        }
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

    private void onSendAttachment(String url, String id) {

        String msg = url + "###" + currentUserName + "###" + currentUserID + "###" + "DOCUMENT" + "###" + id;
        System.out.println("KDKD: msg " + msg);
        pubnub.publish().message(msg).channel(currentDialogId).async(new PNCallback<PNPublishResult>() {
            @Override
            public void onResponse(PNPublishResult result, PNStatus status) {

            }
        });
    }

    private void onSendMsg() {
        String msg = _edtText.getText().toString() + "###" + currentUserName + "###" + currentUserID + "###TEXT";
        pubnub.publish().message(msg).channel(currentDialogId).async(new PNCallback<PNPublishResult>() {
            @Override
            public void onResponse(PNPublishResult result, PNStatus status) {
                _edtText.setText("");
            }
        });
    }

    private void onUpdateMassageList(ChatVO chatView) {

        int newIndex = 0;
        _chatList.add(newIndex, chatView);

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                _chatAdapter.notifyItemInserted(newIndex);
                _recyclerView.smoothScrollToPosition(newIndex);

                if (chatView.getName().equals("You") && chatView.getRowType().equals("DOCUMENT")) {
                    _progressBar.setVisibility(View.GONE);
                    _btnAttachment.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    public static String getDateFormate(long milliSeconds, String dateFormat) {
        // Create a DateFormatter object for displaying date in specified format.
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);

        // Create a calendar object that will convert the date and time value in milliseconds to date.
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        return formatter.format(calendar.getTime());
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 2022:
                if (resultCode == RESULT_OK) {
                    _progressBar.setVisibility(View.VISIBLE);
                    _btnAttachment.setVisibility(View.GONE);
                    onSendAttachment(data);
                }
                break;
            case 2023:
                if (resultCode == RESULT_OK) {

                }
                break;
        }
    }

    private void onSendAttachment(Intent data) {
        try {

            String fileName = getFileName(data.getData());
            InputStream in = this.getContentResolver().openInputStream(data.getData());

            pubnub.sendFile().channel(currentDialogId)
                    .fileName(fileName)
                    .inputStream(in)
                    .async(new PNCallback<PNFileUploadResult>() {
                        @Override
                        public void onResponse(PNFileUploadResult result, PNStatus status) {
                            if (!status.isError()) {
                                System.out.println("send timetoken: " + result.getTimetoken());
                                System.out.println("send status: " + result.getStatus());
                                System.out.println("send fileId: " + result.getFile().getId());
                                System.out.println("send fileName: " + result.getFile().getName());
                                System.out.println("send url: " + result);

                                onGetFileUrl(result.getFile().getId(), result.getFile().getName());
                            }
                            System.out.println("send status code: " + status.getStatusCode());
                        }
                    });

        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    private void onGetFileUrl(String id, String name) {
        pubnub.getFileUrl()
                .channel(currentDialogId)
                .fileName(name)
                .fileId(id)
                .async(new PNCallback<PNFileUrlResult>() {
                    @Override
                    public void onResponse(PNFileUrlResult result, PNStatus status) {
                        if (!status.isError()) {
                            System.out.println("getUrl fileUrl: " + result.getUrl());
                        }
                        System.out.println("getUrl status code: " + status.getStatusCode());
                    }
                });
    }

    private String getExtn(String someFilepath) {
        return someFilepath.substring(someFilepath.lastIndexOf("."));
    }

    private String getFileName(String someFilepath) {
        return someFilepath.substring(someFilepath.lastIndexOf("/") + 1);
    }

    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                cursor.close();
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf('/');
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }
}