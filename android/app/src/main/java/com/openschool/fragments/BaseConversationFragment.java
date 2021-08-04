package com.openschool.fragments;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import androidx.annotation.DimenRes;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.openschool.R;
import com.openschool.activity.CallActivity;
import com.openschool.activity.WhiteBoardActivity;
import com.openschool.adapter.OpponentsFromCallAdapter;
import com.openschool.util.CollectionsUtils;
import com.openschool.util.Consts;
import com.openschool.util.PNFragmentImpl;
import com.openschool.util.ParentActivityImpl;
import com.openschool.util.WebRtcSessionManager;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;
import com.quickblox.chat.model.QBChatDialog;
import com.quickblox.chat.model.QBDialogType;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.conference.view.QBConferenceSurfaceView;
import com.quickblox.users.model.QBUser;
import com.quickblox.videochat.webrtc.BaseSession;
import com.quickblox.videochat.webrtc.callbacks.QBRTCClientVideoTracksCallbacks;
import com.quickblox.videochat.webrtc.callbacks.QBRTCSessionStateCallback;
import com.quickblox.videochat.webrtc.view.QBRTCVideoTrack;

import org.webrtc.CameraVideoCapturer;
import org.webrtc.RendererCommon;
import org.webrtc.SurfaceViewRenderer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public abstract class BaseConversationFragment extends BaseToolBarFragment implements CallActivity.CurrentCallStateCallback, QBRTCSessionStateCallback<ConferenceSession>,
        QBRTCClientVideoTracksCallbacks<ConferenceSession>, OpponentsFromCallAdapter.OnAdapterEventListener, PNFragmentImpl {

    private static final String TAG = BaseConversationFragment.class.getSimpleName();

    protected static final long LOCAL_TRACk_INITIALIZE_DELAY = 500;
    private static final int REQUEST_ADD_OCCUPANTS = 175;

    private static final int DISPLAY_ROW_AMOUNT = 2;
    private static final int SMALL_CELLS_AMOUNT = 8;
    private static final int LARGE_CELLS_AMOUNT = 12;

    protected WebRtcSessionManager sessionManager;
    protected ConferenceSession currentSession;
    protected ArrayList<QBUser> opponents = new ArrayList<>();
    protected ArrayList<QBUser> opponentsTemp;
    protected ArrayList<Integer> opponentsIds;
    protected ArrayList<String> channels;
    private LocalViewOnClickListener localViewOnClickListener;
    private Set<Integer> usersToDestroy;
    private boolean allCallbacksInit;

    private RecyclerView recyclerView;
    protected QBConferenceSurfaceView localVideoView;
    private List<QBUser> allOpponents;
    protected boolean isRemoteShown;
    protected TextView connectionStatusLocal;
    protected LinearLayout actionButtonsLayout;
    protected OpponentsFromCallAdapter opponentsAdapter;

    private GridLayoutManager gridLayoutManager;
    private SpanSizeLookupImpl spanSizeLookup;

    protected boolean isNeedCleanUp;

    private ToggleButton toggle_camera_view;
    private ToggleButton micToggleCall;
    private TextView handUpCall;
    private TextView tvTeacherEmoji;
    private TextView tvTitle;
    private ImageView button_screen_sharing;
    private ImageView whiteboard;
    private ImageView icPEmoji1;
    private ImageView icPEmoji2;
    private ImageView icPEmoji3;
    private LinearLayout llShare;
    private LinearLayout llPupilEmoji;
    protected ConversationFragmentCallbackListener conversationFragmentCallbackListener;
    protected View outgoingOpponentsRelativeLayout;
    protected TextView allOpponentsTextView;
    protected TextView ringingTextView;
    protected QBUser currentUser;
    protected Map<Integer, QBRTCVideoTrack> videoTrackMap;
    protected boolean asListenerRole;
    protected boolean isTeacher;
    protected String currentUserID;
    protected String currentName;
    protected String teacherQBUserID;
    protected String title;

    ParentActivityImpl hostActivity;

    private SparseArray<OpponentsFromCallAdapter.ViewHolder> opponentViewHolders;

    public abstract void onReady();

    public static BaseConversationFragment newInstance(BaseConversationFragment baseConversationFragment) {
        Bundle args = new Bundle();

        baseConversationFragment.setArguments(args);

        return baseConversationFragment;
    }


    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);

        try {
            conversationFragmentCallbackListener = (ConversationFragmentCallbackListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement ConversationFragmentCallbackListener");
        }

        this.hostActivity = (ParentActivityImpl) activity;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        conversationFragmentCallbackListener.addCurrentCallStateCallback(this);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = super.onCreateView(inflater, container, savedInstanceState);
        opponentsIds = this.getArguments().getIntegerArrayList(Consts.EXTRA_DIALOG_OCCUPANTS);
        opponentsTemp = (ArrayList<QBUser>) this.getArguments().getSerializable(Consts.EXTRA_SELECTED_DIALOG_OCCUPANTS);
        asListenerRole = this.getArguments().getBoolean(Consts.EXTRA_AS_LISTENER);
        currentUserID = this.getArguments().getString(Consts.EXTRA_CURRENTUSERID);
        currentName = this.getArguments().getString(Consts.EXTRA_CURRENTUSERNAME);
        isTeacher = this.getArguments().getBoolean(Consts.EXTRA_DIALOG_IS_TEACHER);
        teacherQBUserID = this.getArguments().getString(Consts.EXTRA_TEACHER_USER_ID);
        title = this.getArguments().getString(Consts.TITLE);
        channels = this.getArguments().getStringArrayList(Consts.EXTRA_CHANNELS);
        sessionManager = WebRtcSessionManager.getInstance(getActivity());
        System.out.println("KDKD: opponents " + opponents + " " + teacherQBUserID);
        currentSession = sessionManager.getCurrentSession();
        if (currentSession == null) {
            Log.d(TAG, "currentSession = null onCreateView");
            return view;
        }

        if (!isTeacher) {
            opponents.addAll(selectTeacherForPupil());
        } else {
            opponents.addAll(opponentsTemp);
        }

        initFields();
        initViews(view);
        initActionBar();
        initButtonsListener();
        prepareAndShowOutgoingScreen();

        onReady();
        hostActivity.getPubNub().addListener(provideListener());
        subscribe();

        return view;
    }

    private void prepareAndShowOutgoingScreen() {
        configureOutgoingScreen();
        allOpponentsTextView.setText(CollectionsUtils.makeStringFromUsersFullNames(opponents));
    }

    @Override
    int getFragmentLayout() {
        return R.layout.fragment_conversation;
    }

    protected void configureOutgoingScreen() {
        outgoingOpponentsRelativeLayout.setBackgroundColor(ContextCompat.getColor(getActivity(), R.color.grey_transparent_50));
        allOpponentsTextView.setTextColor(ContextCompat.getColor(getActivity(), R.color.white));
        ringingTextView.setTextColor(ContextCompat.getColor(getActivity(), R.color.white));
    }

    private ArrayList<QBUser> selectTeacherForPupil() {
        ArrayList<QBUser> qbUsers = new ArrayList<>();
        for (QBUser user : opponentsTemp) {
            if (user.getId() == Integer.parseInt(teacherQBUserID)) {
                qbUsers.add(user);
            }
        }

        return qbUsers;
    }

    private void initActionBar() {
        configureToolbar();
        configureActionBar();
    }

    protected void configureActionBar() {
        actionBar = ((AppCompatActivity) getActivity()).getDelegate().getSupportActionBar();
        actionBar.setDisplayShowTitleEnabled(false);
    }

    protected void configureToolbar() {
        toolbar.setVisibility(View.GONE);
        toolbar.setBackgroundColor(ContextCompat.getColor(getActivity(), R.color.black_transparent_50));
        toolbar.setTitleTextColor(ContextCompat.getColor(getActivity(), R.color.white));
        toolbar.setSubtitleTextColor(ContextCompat.getColor(getActivity(), R.color.white));
    }

    protected void initFields() {
        sessionManager = WebRtcSessionManager.getInstance(getActivity());
        currentSession = sessionManager.getCurrentSession();

        initOpponentsList();

        localViewOnClickListener = new LocalViewOnClickListener();
        usersToDestroy = new HashSet<>();
        allOpponents = Collections.synchronizedList(new ArrayList<QBUser>(opponents.size()));
        allOpponents.addAll(opponents);
        System.out.println("KDKD: allOpponents " + allOpponents);

        Log.d(TAG, "opponents: " + opponents.toString());
        Log.d(TAG, "currentSession " + currentSession.toString());
    }

    protected void setOpponentToAdapter(Integer userID) {
        QBUser qbUser = getUserById(userID);
        if (qbUser != null) {
            opponentsAdapter.add(qbUser);
        } else {
            QBUser user = new QBUser(userID);
            user.setFullName("NoName");
            opponentsAdapter.add(user);
        }
        recyclerView.requestLayout();
    }

    public void setDuringCallActionBar() {
        System.out.println("KDKD: Pending: Put name here");
        String fullName = currentName;
        actionBar.setDisplayShowTitleEnabled(true);
        actionBar.setTitle(fullName);
    }

    protected void updateActionBar(int amountOpponents) {
        actionBar.setSubtitle(getString(R.string.opponents, String.valueOf(amountOpponents)));
    }

    private void setProgressBarForOpponentGone(int userId) {
        final OpponentsFromCallAdapter.ViewHolder holder = getViewHolderForOpponent(userId);
        if (holder == null) {
            return;
        }
        holder.getProgressBar().setVisibility(View.GONE);
    }

    //last opponent view is bind
    @Override
    public void OnBindLastViewHolder(final OpponentsFromCallAdapter.ViewHolder holder, final int position) {
        Log.i(TAG, "OnBindLastViewHolder position=" + position);

    }

    @Override
    public void onToggleButtonItemClick(int position, boolean isAudioEnabled) {
        int userId = opponentsAdapter.getItem(position);
        Log.d(TAG, "onToggleButtonItemClick userId= " + userId);
        adjustOpponentAudio(userId, isAudioEnabled);
    }

    @Override
    public void onEmojiItemClick(String channel, String message) {
        sendEmoji(channel, message, currentUserID);
    }

    private void adjustOpponentAudio(int userID, boolean isAudioEnabled) {
        currentSession.getMediaStreamManager().getAudioTrack(userID).setEnabled(isAudioEnabled);
    }


    @SuppressWarnings("unchecked")
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == REQUEST_ADD_OCCUPANTS) {
                Log.d(TAG, "onActivityResult REQUEST_ADD_OCCUPANTS");
                ArrayList<QBUser> addedOccupants = (ArrayList<QBUser>) data
                        .getSerializableExtra(Consts.EXTRA_QB_USERS);
                List<Integer> allOccupants = (List<Integer>) data
                        .getSerializableExtra(Consts.EXTRA_QB_OCCUPANTS_IDS);
                allOpponents.addAll(0, addedOccupants);
            }
        }
    }

    private void startScreenSharing() {
        conversationFragmentCallbackListener.onStartScreenSharing();
    }

    @Override
    public void onStart() {
        super.onStart();
        if (currentSession == null) {
            Log.d(TAG, "currentSession = null onStart");
            return;
        }

        if (currentSession.getState() != BaseSession.QBRTCSessionState.QB_RTC_SESSION_CONNECTED) {
            startJoinConference();
        }
        if (!allCallbacksInit) {
            conversationFragmentCallbackListener.addClientConnectionCallback(this);
            initTrackListeners();
            allCallbacksInit = true;
        }
    }

    protected void initTrackListeners() {
        initVideoTracksListener();
    }

    protected void removeTrackListeners() {
        removeVideoTracksListener();
    }

    @Override
    public void onResume() {
        super.onResume();
        isNeedCleanUp = true;
        cleanAdapterIfNeed();
    }

    @Override
    public void onPause() {
        super.onPause();
        isNeedCleanUp = false;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        Log.d(TAG, "onDestroyView");
        removeVideoTrackRenderers();
        releaseViews();
        releaseViewHolders();
        removeConnectionStateListeners();
        removeTrackListeners();
    }

    private void removeConnectionStateListeners() {
        conversationFragmentCallbackListener.removeClientConnectionCallback(this);
    }


    protected void releaseOpponentsViews() {
        RecyclerView.LayoutManager layoutManager = recyclerView.getLayoutManager();
        int childCount = layoutManager.getChildCount();
        Log.d(TAG, " releaseOpponentsViews for  " + childCount + " views");
        for (int i = 0; i < childCount; i++) {
            View childView = layoutManager.getChildAt(i);
            Log.d(TAG, " release View for  " + i + ", " + childView);
            OpponentsFromCallAdapter.ViewHolder childViewHolder = (OpponentsFromCallAdapter.ViewHolder) recyclerView.getChildViewHolder(childView);
            childViewHolder.getOpponentView().release();
        }
    }

    private QBUser getUserById(int userID) {
        System.out.println("KDKD: allOpponents1 " + allOpponents);
        for (QBUser qbUser : allOpponents) {
            System.out.println("KDKD: qbUser " + qbUser + " " + qbUser.getId());
            if (qbUser.getId().equals(userID)) {
                return qbUser;
            }
        }
        return null;
    }

    @Override
    public void onDestroy() {
        conversationFragmentCallbackListener.removeCurrentCallStateCallback(this);
        hostActivity.getPubNub().removeListener(provideListener());

        super.onDestroy();
    }

    private void startJoinConference() {
        conversationFragmentCallbackListener.onStartJoinConference();
    }

    protected void initViews(View view) {
        Log.i(TAG, "initViews");
        toggle_camera_view = (ToggleButton) view.findViewById(R.id.toggle_camera_view);
        micToggleCall = (ToggleButton) view.findViewById(R.id.toggle_mic);
        handUpCall = (TextView) view.findViewById(R.id.button_hangup_call);
        tvTeacherEmoji = (TextView) view.findViewById(R.id.tvTeacherEmoji);
        tvTitle = (TextView) view.findViewById(R.id.tvTitle);
        button_screen_sharing = (ImageView) view.findViewById(R.id.button_screen_sharing);
        whiteboard = (ImageView) view.findViewById(R.id.whiteboard);
        icPEmoji1 = (ImageView) view.findViewById(R.id.icPEmoji1);
        icPEmoji2 = (ImageView) view.findViewById(R.id.icPEmoji2);
        icPEmoji3 = (ImageView) view.findViewById(R.id.icPEmoji3);
        llShare = (LinearLayout) view.findViewById(R.id.llShare);
        llPupilEmoji = (LinearLayout) view.findViewById(R.id.llPupilEmoji);
        outgoingOpponentsRelativeLayout = view.findViewById(R.id.layout_background_outgoing_screen);
        allOpponentsTextView = (TextView) view.findViewById(R.id.text_outgoing_opponents_names);
        ringingTextView = (TextView) view.findViewById(R.id.text_ringing);

        opponentViewHolders = new SparseArray<>(opponents.size());
        isRemoteShown = false;

        localVideoView = (QBConferenceSurfaceView) view.findViewById(R.id.local_video_view);
        localVideoView.setOnClickListener(localViewOnClickListener);

        tvTitle.setText(title);

        recyclerView = (RecyclerView) view.findViewById(R.id.grid_opponents);

        recyclerView.addItemDecoration(new DividerItemDecoration(getActivity(), R.dimen.grid_item_divider));
        recyclerView.setHasFixedSize(false);

        gridLayoutManager = new GridManager(getActivity(), 12);
        gridLayoutManager.setReverseLayout(false);
        spanSizeLookup = new SpanSizeLookupImpl();
        spanSizeLookup.setSpanIndexCacheEnabled(false);
        gridLayoutManager.setSpanSizeLookup(spanSizeLookup);
        recyclerView.setLayoutManager(gridLayoutManager);

//          for correct removing item in adapter
        recyclerView.setItemAnimator(null);
        recyclerView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                setGrid(recyclerView.getHeight());
                recyclerView.getViewTreeObserver().removeGlobalOnLayoutListener(this);
            }
        });

        connectionStatusLocal = (TextView) view.findViewById(R.id.connectionStatusLocal);

        actionButtonsLayout = (LinearLayout) view.findViewById(R.id.element_set_call_buttons);

        actionButtonsEnabled(false);
        setActionButtonsVisibility();
    }

    private void setActionButtonsVisibility() {
        if (asListenerRole) {
            setActionButtonsInvisible();
        }
    }

    protected void setActionButtonsInvisible() {
        micToggleCall.setVisibility(View.INVISIBLE);
    }

    private void setGrid(int recycleViewHeight) {
        ArrayList<QBUser> qbUsers = new ArrayList<>();
        int itemHeight = 0;
        if (!isTeacher) {
            itemHeight = recycleViewHeight;
            llShare.setVisibility(View.GONE);
            icPEmoji1.setVisibility(View.VISIBLE);
            icPEmoji2.setVisibility(View.VISIBLE);
            icPEmoji3.setVisibility(View.VISIBLE);
        } else {
            itemHeight = opponents.size() == 1 ? recycleViewHeight : recycleViewHeight / DISPLAY_ROW_AMOUNT;
            llShare.setVisibility(View.VISIBLE);
            icPEmoji1.setVisibility(View.GONE);
            icPEmoji2.setVisibility(View.GONE);
            icPEmoji3.setVisibility(View.GONE);
        }
        opponentsAdapter = new OpponentsFromCallAdapter(getActivity(), currentSession, qbUsers,
                (int) getResources().getDimension(R.dimen.item_width),
                itemHeight,
                isTeacher);
        opponentsAdapter.setAdapterListener(this);
        recyclerView.setAdapter(opponentsAdapter);

        localVideoView.setZOrderOnTop(true);
    }

    private void releaseViewHolders() {
        if (opponentViewHolders != null) {
            opponentViewHolders.clear();
        }
    }

    private void removeVideoTrackRenderers() {
        Log.d(TAG, "removeVideoTrackRenderers");
        Log.d(TAG, "remove opponents video Tracks");
        Map<Integer, QBRTCVideoTrack> videoTrackMap = getVideoTrackMap();
        for (QBRTCVideoTrack videoTrack : videoTrackMap.values()) {
            if (videoTrack.getRenderer() != null) {
                Log.d(TAG, "remove opponent video Tracks");
                videoTrack.removeRenderer(videoTrack.getRenderer());
            }
        }
    }

    private void releaseViews() {
        if (localVideoView != null) {
            localVideoView.release();
        }
        localVideoView = null;

        releaseOpponentsViews();
    }

    protected void initButtonsListener() {
        toggle_camera_view.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                switchCamera(isChecked);
            }
        });

        micToggleCall.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                conversationFragmentCallbackListener.onSetAudioEnabled(isChecked);
            }
        });

        handUpCall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                actionButtonsEnabled(false);
                handUpCall.setEnabled(false);
                handUpCall.setActivated(false);

                conversationFragmentCallbackListener.onLeaveCurrentSession();
                Log.d(TAG, "Call is stopped");
            }
        });

        button_screen_sharing.setOnClickListener(v -> startScreenSharing());

        whiteboard.setOnClickListener(v -> startActivity(new Intent(getActivity(), WhiteBoardActivity.class)));

        icPEmoji1.setOnClickListener(v -> sendEmoji(channels.get(0), "0", currentUserID));

        icPEmoji2.setOnClickListener(v -> sendEmoji(channels.get(0), "1", currentUserID));

        icPEmoji3.setOnClickListener(v -> sendEmoji(channels.get(0), "2", currentUserID));
    }

    protected void actionButtonsEnabled(boolean inability) {

        micToggleCall.setEnabled(inability);

        // inactivate toggle buttons
        micToggleCall.setActivated(inability);
    }

    private void hideOutgoingScreen() {
        outgoingOpponentsRelativeLayout.setVisibility(View.GONE);
    }

    @Override
    public void onCallStarted() {
        hideOutgoingScreen();
        actionButtonsEnabled(true);
    }

    private void initOpponentsList() {
        Log.v(TAG, "initOpponentsList() opponentsIds= " + opponentsIds);
    }

    protected OpponentsFromCallAdapter.ViewHolder getViewHolderForOpponent(Integer userID) {
        OpponentsFromCallAdapter.ViewHolder holder = opponentViewHolders.get(userID);
        if (holder == null) {
            Log.d(TAG, "holder not found in cache");
            holder = findHolder(userID);
            if (holder != null) {
                opponentViewHolders.put(userID, holder);
            }
        }
        return holder;
    }

    private void setStatusForOpponent(int userId, final String status) {
        System.out.println("KDKD: Pending: Put opponent ID here");
        Integer id = Integer.parseInt(currentUserID);
        if (userId == id) {
            return;
        }
        final OpponentsFromCallAdapter.ViewHolder holder = getViewHolderForOpponent(userId);
        if (holder == null) {
            return;
        }

        holder.setStatus(status);
    }

    protected void setStatusForCurrentUser(final String status) {
        connectionStatusLocal.setText(status);
    }

    protected void cleanUpAdapter(int userId) {
        Log.d(TAG, "onConnectionClosedForUser cleanUpAdapter userId= " + userId);
        OpponentsFromCallAdapter.ViewHolder itemHolder = getViewHolderForOpponent(userId);
        if (itemHolder != null) {
            if (itemHolder.getAdapterPosition() != -1) {
                Log.d(TAG, "onConnectionClosedForUser  opponentsAdapter.removeItem");
                opponentsAdapter.removeItem(itemHolder.getAdapterPosition());
                opponentViewHolders.remove(userId);
            }
        }
        updateActionBar(opponentsAdapter.getItemCount());
        recyclerView.requestLayout();
        getVideoTrackMap().remove(userId);
    }

    private QBChatDialog getChatDialog(String dialogId) {
        QBChatDialog chatDialog = new QBChatDialog(dialogId);
        chatDialog.setType(QBDialogType.GROUP);
        return chatDialog;
    }

    protected void cleanAdapterIfNeed() {
        if (!usersToDestroy.isEmpty()) {
            Iterator<Integer> iterator = usersToDestroy.iterator();
            while (iterator.hasNext()) {
                cleanUpAdapter(iterator.next());
                iterator.remove();
            }
        }
    }

    protected void setRecyclerViewVisibleState() {
        recyclerView.setVisibility(View.VISIBLE);
    }


    protected OpponentsFromCallAdapter.ViewHolder findHolder(Integer userID) {
        Log.d(TAG, "findHolder for " + userID);
        int childCount = recyclerView.getChildCount();
        Log.d(TAG, "findHolder for childCount= " + childCount);
        for (int i = 0; i < childCount; i++) {
            View childView = recyclerView.getChildAt(i);
            OpponentsFromCallAdapter.ViewHolder childViewHolder = (OpponentsFromCallAdapter.ViewHolder) recyclerView.getChildViewHolder(childView);
            Log.d(TAG, "childViewHolder.getUserId= " + childViewHolder.getUserId());
            if (userID.equals(childViewHolder.getUserId())) {
                Log.d(TAG, "return childViewHolder");
                return childViewHolder;
            }
        }
        return null;
    }

    private void setOpponentView(int userID) {
        setOpponentToAdapter(userID);
        if (!isRemoteShown) {
            isRemoteShown = true;
            setRecyclerViewVisibleState();
            setDuringCallActionBar();
        }
        updateActionBar(opponentsAdapter.getItemCount());
    }

    private boolean checkIfUserInAdapter(int userId) {
        for (QBUser user : opponentsAdapter.getOpponents()) {
            if (user.getId() == userId) {
                return true;
            }
        }
        return false;
    }

    ///////////////////////////////  QBRTCSessionConnectionCallbacks ///////////////////////////

    @Override
    public void onConnectedToUser(ConferenceSession qbrtcSession, final Integer userId) {
        if (checkIfUserInAdapter(userId)) {
            setStatusForOpponent(userId, getString(R.string.text_status_connected));
            Log.d(TAG, "onConnectedToUser user already in, userId= " + userId);
            return;
        }
        setOpponentView(userId);

        mainHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                setRemoteViewMultiCall(userId);

                setStatusForOpponent(userId, getString(R.string.text_status_connected));
                setProgressBarForOpponentGone(userId);
            }
        }, LOCAL_TRACk_INITIALIZE_DELAY);
    }

    @Override
    public void onConnectionClosedForUser(ConferenceSession qbrtcSession, Integer userId) {
        Log.d(TAG, "onConnectionClosedForUser userId= " + userId);

        if (currentSession.isDestroyed()) {
            Log.d(TAG, "onConnectionClosedForUser isDestroyed userId= " + userId);
            return;
        }

        if (isNeedCleanUp) {
            setStatusForOpponent(userId, getString(R.string.text_status_closed));
            cleanUpAdapter(userId);
        } else {
            usersToDestroy.add(userId);
        }

    }

    @Override
    public void onDisconnectedFromUser(ConferenceSession qbrtcSession, Integer integer) {
        setStatusForOpponent(integer, getString(R.string.text_status_disconnected));
    }

    @Override
    public void onStateChanged(ConferenceSession session, BaseSession.QBRTCSessionState state) {

    }

    //////////////////////////////////   end     //////////////////////////////////////////


    protected Map<Integer, QBRTCVideoTrack> getVideoTrackMap() {
        if (videoTrackMap == null) {
            videoTrackMap = new HashMap<>();
        }
        return videoTrackMap;
    }


    @Override
    public void onLocalVideoTrackReceive(ConferenceSession session, QBRTCVideoTrack videoTrack) {
        Log.d(TAG, "onLocalVideoTrackReceive");
    }

    @Override
    public void onRemoteVideoTrackReceive(ConferenceSession session, final QBRTCVideoTrack videoTrack, final Integer userID) {
        Log.d(TAG, "onRemoteVideoTrackReceive for opponent= " + userID);
        getVideoTrackMap().put(userID, videoTrack);
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.conversation_fragment, menu);
        if (asListenerRole) {
            MenuItem cameraSwitchItem = menu.findItem(R.id.camera_switch);
            cameraSwitchItem.setVisible(false);
        }
        super.onCreateOptionsMenu(menu, inflater);
    }

    protected void setRemoteViewMultiCall(int userID) {
        if (currentSession.isDestroyed()) {
            Log.d(TAG, "setRemoteViewMultiCall currentSession.isDestroyed RETURN");
            return;
        }
        updateActionBar(opponentsAdapter.getItemCount());
        Log.d(TAG, "setRemoteViewMultiCall fillVideoView");

        final OpponentsFromCallAdapter.ViewHolder itemHolder = getViewHolderForOpponent(userID);
        if (itemHolder == null) {
            Log.d(TAG, "itemHolder == null - true");
            return;
        }
        final QBConferenceSurfaceView remoteVideoView = itemHolder.getOpponentView();

        if (remoteVideoView != null) {
            remoteVideoView.setZOrderMediaOverlay(true);
            updateVideoView(remoteVideoView, false);
            Log.d(TAG, "onRemoteVideoTrackReceive fillVideoView");
            QBRTCVideoTrack remoteVideoTrack = getVideoTrackMap().get(userID);
            if (remoteVideoTrack != null) {
                fillVideoView(remoteVideoView, remoteVideoTrack, true);
            }
        }
    }

    protected void updateVideoView(SurfaceViewRenderer surfaceViewRenderer, boolean mirror) {
        updateVideoView(surfaceViewRenderer, mirror, RendererCommon.ScalingType.SCALE_ASPECT_FILL);
    }

    protected void updateVideoView(SurfaceViewRenderer surfaceViewRenderer, boolean mirror, RendererCommon.ScalingType scalingType) {
        Log.i(TAG, "updateVideoView mirror:" + mirror + ", scalingType = " + scalingType);
        surfaceViewRenderer.setScalingType(scalingType);
        surfaceViewRenderer.setMirror(mirror);
        surfaceViewRenderer.requestLayout();
    }

    protected void fillVideoView(QBConferenceSurfaceView videoView, QBRTCVideoTrack videoTrack,
                                 boolean remoteRenderer) {
        videoTrack.removeRenderer(videoTrack.getRenderer());
        videoTrack.addRenderer(videoView);
        Log.d(TAG, (remoteRenderer ? "remote" : "local") + " Track is rendering");
    }

    private void initVideoTracksListener() {
        if (currentSession != null) {
            currentSession.addVideoTrackCallbacksListener(this);
        }
    }

    private void removeVideoTracksListener() {
        if (currentSession != null) {
            currentSession.removeVideoTrackCallbacksListener(this);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.add_opponent:
                Log.d(TAG, "add_opponent");
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    private class GridManager extends GridLayoutManager {

        GridManager(Context context, int spanCount) {
            super(context, spanCount);
        }

        @Override
        public void onItemsAdded(RecyclerView recyclerView, int positionStart, int itemCount) {
            super.onItemsAdded(recyclerView, positionStart, itemCount);
            Log.d("GridManager", "onItemsAdded positionStart= " + positionStart);
        }

        @Override
        public void onItemsRemoved(RecyclerView recyclerView, int positionStart, int itemCount) {
            super.onItemsRemoved(recyclerView, positionStart, itemCount);
            Log.d("GridManager", "onItemsRemoved positionStart= " + positionStart);
            updateAdaptersItems();
        }

        private void updateAdaptersItems() {
            if (opponentsAdapter.getItemCount() > 0) {
                OpponentsFromCallAdapter.ViewHolder itemHolder = getViewHolderForOpponent(opponentsAdapter.getItem(0));
                if (itemHolder != null) {
                    itemHolder.itemView.requestLayout();
                }
            }
        }

        @Override
        public void onItemsUpdated(RecyclerView recyclerView, int positionStart, int itemCount,
                                   Object payload) {
            super.onItemsUpdated(recyclerView, positionStart, itemCount, payload);
            Log.d("GridManager", "onItemsUpdated positionStart= " + positionStart);
        }

        @Override
        public void onItemsChanged(RecyclerView recyclerView) {
            super.onItemsChanged(recyclerView);
            Log.d("GridManager", "onItemsChanged");
        }

        @Override
        public void onLayoutCompleted(RecyclerView.State state) {
            super.onLayoutCompleted(state);
            Log.d("GridManager", "onLayoutCompleted");
        }
    }

    private class SpanSizeLookupImpl extends GridManager.SpanSizeLookup {


        @Override
        public int getSpanSize(int position) {
            int itemCount = opponentsAdapter.getItemCount();
            System.out.println("KDKDKD: " + itemCount + " " + position);

            if (!isTeacher) {
                return 12;
            }

            if (itemCount <= 2) {
                return 12;
            }

            if (itemCount % 2 == 0) {
                return 6;
            } else {
                if (position == itemCount - 1) {
                    return 12;
                } else {
                    return 6;
                }
            }
//            if (itemCount % 4 == 0) {
//                return 3;
//            }
//
//            if (itemCount % 4 == 1) {
//                //check last position
//                if (position == itemCount - 1) {
//                    return 12;
//                }
//            } else if (itemCount % 4 == 2) {
//                if (position == itemCount - 1 || position == itemCount - 2) {
//                    return 6;
//                }
//            } else if (itemCount % 4 == 3) {
//                if (position == itemCount - 1 || position == itemCount - 2 || position == itemCount - 3) {
//                    return 4;
//                }
//            }
//
//            return 3;
        }
    }


    private class DividerItemDecoration extends RecyclerView.ItemDecoration {

        private int space;

        public DividerItemDecoration(@NonNull Context context, @DimenRes int dimensionDivider) {
            this.space = context.getResources().getDimensionPixelSize(dimensionDivider);
        }

        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            outRect.set(space, space, space, space);
        }
    }

    private class LocalViewOnClickListener implements View.OnClickListener {

        @Override
        public void onClick(View v) {
            Log.d(TAG, "localView onClick");
        }
    }

    private void switchCamera(boolean flag) {
        if (VideoConversationFragment.cameraState == VideoConversationFragment.CameraState.DISABLED_FROM_USER) {
            return;
        }
        conversationFragmentCallbackListener.onSwitchCamera(new CameraVideoCapturer.CameraSwitchHandler() {
            @Override
            public void onCameraSwitchDone(boolean b) {
                Log.d(TAG, "camera switched, bool = " + b);
//                updateSwitchCameraIcon(item);
                toggleCameraInternal(flag);
            }

            @Override
            public void onCameraSwitchError(String s) {
                Log.d(TAG, "camera switch error " + s);
                Toast.makeText(getContext(), getString(R.string.camera_swicth_failed) + s, Toast.LENGTH_SHORT).show();
                toggle_camera_view.setEnabled(true);
            }
        });
    }

    private void toggleCameraInternal(boolean flag) {
        Log.d(TAG, "Camera was switched!");
        updateVideoView(localVideoView, flag);
    }

    private void subscribe() {
        System.out.println("KDKDKD: channels " + channels);
        hostActivity.getPubNub()
                .subscribe()
                .channels(channels)
//                .channels(channels)
//                .withPresence()
                .execute();
    }

    protected void setEmojiForPupil(String message) {
        System.out.println("KDKDKD: Pupil message " + message);
        String tempIndex = message.replace("\"", "");
        if (!isTeacher) {
            int[] teacherEmojis = {0x1F44A, 0x1F44F, 0x263A, 0x1F496, 0x1F44B, 0x1F44D};
            tvTeacherEmoji.setText(getEmoticon(teacherEmojis[Integer.parseInt(tempIndex)]));
        }
    }

    protected void setEmojiForTeacher(String message) {
        String tempMsg = message.replace("\"", "");
        String[] splitStr = tempMsg.split("#@#");

        final OpponentsFromCallAdapter.ViewHolder holder = getViewHolderForOpponent(Integer.parseInt(splitStr[1]));
        if (holder == null) {
            return;
        }

        holder.setPupilEmoji(splitStr[0]);
    }

    public String getEmoticon(int originalUnicode) {
        return new String(Character.toChars(originalUnicode));
    }

    protected void sendEmoji(String channel, String message, String currentUserID) {
        System.out.println("KDKDKD: channel send" + channel);
        hostActivity.getPubNub()
                .publish()
                .channel(channel)
                .message(isTeacher ? message : message + "#@#" + currentUserID)
                .async(new PNCallback<PNPublishResult>() {
                    @Override
                    public void onResponse(PNPublishResult result, PNStatus status) {
                        System.out.println("KDKDKD: Sender " + status.getStatusCode());
                    }
                });


        // 0x1F44F#@#13248732468578
    }
}