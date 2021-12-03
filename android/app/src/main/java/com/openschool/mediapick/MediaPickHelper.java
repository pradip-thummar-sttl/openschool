package com.openschool.mediapick;


import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

import com.openschool.fragments.MediaPickHelperFragment;
import com.openschool.fragments.MediaSourcePickDialogFragment;

public class MediaPickHelper {

    public static void pickAnImage(FragmentActivity activity, int requestCode) {
        MediaPickHelperFragment mediaPickHelperFragment = MediaPickHelperFragment.start(activity, requestCode);
        showImageSourcePickerDialog(activity.getSupportFragmentManager(), mediaPickHelperFragment);
    }

    private static void showImageSourcePickerDialog(FragmentManager fm, MediaPickHelperFragment fragment) {
        MediaSourcePickDialogFragment.show(fm,
                new MediaSourcePickDialogFragment.LoggableActivityImageSourcePickedListener(fragment));
    }
}