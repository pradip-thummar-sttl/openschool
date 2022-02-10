package com.openschool.fragments;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.ToggleButton;

import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.openschool.R;
import com.quickblox.videochat.webrtc.QBRTCMediaConfig;

public class ScreenShareFragment extends BaseToolBarFragment {
    private static final String TAG = ScreenShareFragment.class.getSimpleName();

    private OnSharingEvents onSharingEvents;

    public static ScreenShareFragment newInstance() {
        return new ScreenShareFragment();
    }

    @Override
    int getFragmentLayout() {
        return R.layout.fragment_screensharing;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = super.onCreateView(inflater, container, savedInstanceState);

        if (view != null) {
//            ToggleButton micToggle = view.findViewById(R.id.tb_switch_mic);
//            ToggleButton cameraToggle = view.findViewById(R.id.tb_switch_cam);
//            ToggleButton endCallToggle = view.findViewById(R.id.tb_end_call);
            ImageView shareScreenToggle = view.findViewById(R.id.button_screen_sharing);
            LinearLayout llCamara = view.findViewById(R.id.llCamara);
            LinearLayout llMic = view.findViewById(R.id.llMic);
            LinearLayout llVideo = view.findViewById(R.id.llVideo);
            LinearLayout llBoard = view.findViewById(R.id.llBoard);
            TextView tvShare = view.findViewById(R.id.tvShare);
//            ToggleButton swapCamToggle = view.findViewById(R.id.tb_swap_cam);

            llCamara.setVisibility(View.GONE);
            llMic.setVisibility(View.GONE);
            llVideo.setVisibility(View.GONE);
            llBoard.setVisibility(View.GONE);
            tvShare.setText("STOP");

//            shareScreenToggle.setChecked(false);
//            shareScreenToggle.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
//                @Override
//                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
//                    Log.d(TAG, "Stop Screen Sharing");
//                    if (onSharingEvents != null) {
//                        onSharingEvents.onStopPreview();
//                    }
//                }
//            });

            shareScreenToggle.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (onSharingEvents != null) {
                        onSharingEvents.onStopPreview();
                    }
                }
            });
        }

        ImagesAdapter adapter = new ImagesAdapter(getChildFragmentManager());
        ViewPager pager = (ViewPager) view.findViewById(R.id.pager);
        pager.setAdapter(adapter);

        QBRTCMediaConfig.setVideoWidth(QBRTCMediaConfig.VideoQuality.HD_VIDEO.width);
        QBRTCMediaConfig.setVideoHeight(QBRTCMediaConfig.VideoQuality.HD_VIDEO.height);
        return view;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        try {
            onSharingEvents = (OnSharingEvents) context;
        } catch (ClassCastException e) {
            throw new ClassCastException(getActivity().toString() + " must implement OnSharingEvents");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        onSharingEvents = null;
    }

    public static class ImagesAdapter extends FragmentPagerAdapter {
        private static final int NUM_ITEMS = 1;

        private int[] images = {R.drawable.pres_img/*, R.drawable.p2p, R.drawable.group_call, R.drawable.opponents*/};

        ImagesAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public int getCount() {
            return NUM_ITEMS;
        }

        @Override
        public Fragment getItem(int position) {
            return PreviewFragment.newInstance(images[position]);
        }
    }

    public interface OnSharingEvents {

        void onStopPreview();
    }
}