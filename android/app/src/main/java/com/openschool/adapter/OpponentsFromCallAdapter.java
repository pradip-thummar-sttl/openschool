package com.openschool.adapter;

import android.content.Context;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
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
        v.findViewById(R.id.innerLayout)
                .setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, itemHeight));

        final ViewHolder vh = new ViewHolder(v);

        if (!isTeacher) {
            vh.toggleButton.setVisibility(View.GONE);
            vh.connectionStatus.setVisibility(View.GONE);
            vh.opponentsName.setVisibility(View.GONE);
            vh.btnEmojiTeacher.setVisibility(View.GONE);
        }

        vh.toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                adapterListener.onToggleButtonItemClick(vh.getAdapterPosition(), isChecked);
            }
        });
        vh.btnEmojiTeacher.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayPopup(v, vh);
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

//        float scale = context.getResources().getDisplayMetrics().density;
//        int dpAsPixels = (int) (85 * scale + 0.5f);
//        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT);
//        params.setMargins(0, 0, 0, opponents.size() - 1 == position ? dpAsPixels : 0);
//        holder.parentLayout.setLayoutParams(params);

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

    private void displayPopup(View view, final ViewHolder vh) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
        View popupView = inflater.inflate(R.layout.layout_popup, null);

        int width = LinearLayout.LayoutParams.WRAP_CONTENT;
        int height = LinearLayout.LayoutParams.WRAP_CONTENT;
        boolean focusable = true; // lets taps outside the popup also dismiss it
        final PopupWindow popupWindow = new PopupWindow(popupView, width, height, focusable);

        int[] location = new int[2];
        view.getLocationOnScreen(location);
        popupWindow.showAtLocation(view, Gravity.NO_GRAVITY, location[0], location[1]);

        ImageView iv1 = popupView.findViewById(R.id.iv1);
        iv1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "0");
            }
        });
        ImageView iv2 = popupView.findViewById(R.id.iv2);
        iv2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "1");
            }
        });
        ImageView iv3 = popupView.findViewById(R.id.iv3);
        iv3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "2");
            }
        });
        ImageView iv4 = popupView.findViewById(R.id.iv4);
        iv4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "3");
            }
        });
        ImageView iv5 = popupView.findViewById(R.id.iv5);
        iv5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "4");
            }
        });
        ImageView iv6 = popupView.findViewById(R.id.iv6);
        iv6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapterListener.onEmojiItemClick(opponents.get(vh.getAdapterPosition()).getCustomData(), "5");
            }
        });
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    public interface OnAdapterEventListener {
        void OnBindLastViewHolder(ViewHolder holder, int position);

        void onToggleButtonItemClick(int position, boolean isChecked);

        void onEmojiItemClick(String channel, String message);
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        ToggleButton toggleButton;
        ImageView btnEmojiTeacher;
        TextView opponentsName;
        TextView connectionStatus;
        TextView tvPupilEmoji;
        TextView tvPupilPollAns;
        QBConferenceSurfaceView opponentView;
        ProgressBar progressBar;
        RelativeLayout innerLayout;
        FrameLayout parentLayout;
        private int userId;

        public ViewHolder(View itemView) {
            super(itemView);
            toggleButton = (ToggleButton) itemView.findViewById(R.id.opponent_toggle_mic);
            opponentsName = (TextView) itemView.findViewById(R.id.opponentName);
            connectionStatus = (TextView) itemView.findViewById(R.id.connectionStatus);
            tvPupilEmoji = (TextView) itemView.findViewById(R.id.tvPupilEmoji);
            tvPupilPollAns = (TextView) itemView.findViewById(R.id.tvPupilPollAns);
            opponentView = (QBConferenceSurfaceView) itemView.findViewById(R.id.opponentView);
            progressBar = (ProgressBar) itemView.findViewById(R.id.progress_bar_adapter);
            innerLayout = (RelativeLayout) itemView.findViewById(R.id.innerLayout);
            parentLayout = (FrameLayout) itemView.findViewById(R.id.parentLayout);

            btnEmojiTeacher = (ImageView) itemView.findViewById(R.id.btnEmojiTeacher);
        }

        public void setStatus(String status) {
            connectionStatus.setText(status);
        }

        public void setUserName(String userName) {
            opponentsName.setText(userName);
        }

        public void setPupilEmoji(String index) {
            int[] pupilEmojis = {0x1F914, 0x270B, 0x1F44D};
            tvPupilEmoji.setText(getEmoticon(pupilEmojis[Integer.parseInt(index)]));
        }

        public void setPupilPollAns(String ans) {
            tvPupilPollAns.setText(ans);
        }

        public String getEmoticon(int originalUnicode) {
            return new String(Character.toChars(originalUnicode));
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