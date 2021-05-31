package com.openschool.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.ToggleButton;

import androidx.recyclerview.widget.RecyclerView;

import com.openschool.R;
import com.openschool.util.QBRTCSessionUtils;
import com.quickblox.conference.ConferenceSession;
import com.quickblox.conference.QBConferencePeerConnection;
import com.quickblox.conference.view.QBConferenceSurfaceView;
import com.quickblox.users.model.QBUser;
import com.quickblox.videochat.webrtc.QBRTCTypes;

import java.util.List;

/**
 * QuickBlox team
 */
public class OpponentsFromCallAdapter extends RecyclerView.Adapter<OpponentsFromCallAdapter.ViewHolder> {

    //    private static final String TAG = OpponentsFromCallAdapter.class.getSimpleName();
    private static final String TAG = "KDKDKD";
    private final int itemHeight;
    private final int itemWidth;

    private Context context;
    private ConferenceSession session;
    private List<QBUser> opponents;
    private LayoutInflater inflater;
    private OnAdapterEventListener adapterListener;
    private boolean isTeacher;


    public OpponentsFromCallAdapter(Context context, ConferenceSession session, List<QBUser> users, int width, int height, boolean isTeacher) {
        this.context = context;
        this.session = session;
        this.opponents = users;
        this.inflater = LayoutInflater.from(context);
        this.isTeacher = isTeacher;
        itemWidth = width;
        itemHeight = height;
        Log.d(TAG, "item width=" + itemWidth + ", item height=" + itemHeight);
    }

    public void setAdapterListener(OnAdapterEventListener adapterListener) {
        this.adapterListener = adapterListener;
    }

    @Override
    public int getItemCount() {
        return opponents.size();
    }

    public Integer getItem(int position) {
        return opponents.get(position).getId();
    }

    public List<QBUser> getOpponents() {
        return opponents;
    }

    public void removeItem(int index) {
        opponents.remove(index);
        notifyItemRemoved(index);
        notifyItemRangeChanged(index, opponents.size());
    }

    public void removeOpponent(QBUser user) {
        opponents.remove(user);
        notifyDataSetChanged();
    }

    public void replaceUsers(int position, QBUser qbUser) {
        opponents.set(position, qbUser);
        notifyItemChanged(position);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = inflater.inflate(R.layout.list_item_opponent_from_call, null);
        v.findViewById(R.id.innerLayout).setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, itemHeight));

        final ViewHolder vh = new ViewHolder(v);

        if (!isTeacher){
            vh.toggleButton.setVisibility(View.GONE);
            vh.connectionStatus.setVisibility(View.GONE);
            vh.opponentsName.setVisibility(View.GONE);
        }

        vh.toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                adapterListener.onToggleButtonItemClick(vh.getAdapterPosition(), isChecked);
            }
        });
        vh.showOpponentView(true);
        return vh;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        final QBUser user = opponents.get(position);
        int userID = user.getId();
        holder.opponentsName.setText(user.getFullName());

        if (session.getMediaStreamManager() != null) {
            holder.toggleButton.setChecked(session.getMediaStreamManager().getAudioTrack(userID).enabled());
        }

        holder.getOpponentView().setId(user.getId());
        holder.setUserId(userID);
        QBConferencePeerConnection peerConnection = session.getPeerConnection(userID);
        if (peerConnection != null) {
            QBRTCTypes.QBRTCConnectionState state = peerConnection.getState();
            Log.d(TAG, "state ordinal= " + state.ordinal());
            holder.setStatus(context.getResources().getString(QBRTCSessionUtils.getStatusDescriptionResource(state)));
        }
        if (position == (opponents.size() - 1)) {
            adapterListener.OnBindLastViewHolder(holder, position);
        }
    }

    public void add(QBUser item) {
        opponents.add(item);
        notifyItemRangeChanged((opponents.size() - 1), opponents.size());
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    public interface OnAdapterEventListener {
        void OnBindLastViewHolder(ViewHolder holder, int position);

        void onToggleButtonItemClick(int position, boolean isChecked);
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        ToggleButton toggleButton;
        TextView opponentsName;
        TextView connectionStatus;
        QBConferenceSurfaceView opponentView;
        ProgressBar progressBar;
        private int userId;

        public ViewHolder(View itemView) {
            super(itemView);
            toggleButton = (ToggleButton) itemView.findViewById(R.id.opponent_toggle_mic);
            opponentsName = (TextView) itemView.findViewById(R.id.opponentName);
            connectionStatus = (TextView) itemView.findViewById(R.id.connectionStatus);
            opponentView = (QBConferenceSurfaceView) itemView.findViewById(R.id.opponentView);
            progressBar = (ProgressBar) itemView.findViewById(R.id.progress_bar_adapter);
        }

        public void setStatus(String status) {
            connectionStatus.setText(status);
        }

        public void setUserName(String userName) {
            opponentsName.setText(userName);
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public int getUserId() {
            return userId;
        }

        public ProgressBar getProgressBar() {
            return progressBar;
        }

        public QBConferenceSurfaceView getOpponentView() {
            return opponentView;
        }

        public void showOpponentView(boolean show) {
            Log.d(TAG, "show? " + show);
            opponentView.setVisibility(show ? View.VISIBLE : View.GONE);
        }
    }
}