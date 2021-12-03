package com.openschool.activity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.StringRes;

import com.google.android.material.snackbar.Snackbar;
import com.openschool.MainApplication;
import com.openschool.manager.ChatHelper;
import com.openschool.manager.DialogsManager;
import com.openschool.util.QBResRequestExecutor;
import com.openschool.utils.ErrorUtils;
import com.openschool.utils.SharedPrefsHelper;
import com.openschool.utils.qb.QBDialogsHolder;
import com.openschool.utils.qb.QBUsersHolder;

/**
 * QuickBlox team
 */
public abstract class BaseActivity extends CoreBaseActivity {

//    SharedPrefsHelper sharedPrefsHelper;
//    protected GooglePlayServicesHelper googlePlayServicesHelper;
    protected QBResRequestExecutor requestExecutor;

    private static final String TAG = BaseActivity.class.getSimpleName();
    private static final String DUMMY_VALUE = "dummy_value";

    private ProgressDialog progressDialog = null;
    private Snackbar snackbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestExecutor = getQbResRequestExecutor();
//        sharedPrefsHelper = SharedPrefsHelper.getInstance();
//        googlePlayServicesHelper = new GooglePlayServicesHelper();
    }

    private QBResRequestExecutor getQbResRequestExecutor() {
        return requestExecutor == null
                ? requestExecutor = new QBResRequestExecutor()
                : requestExecutor;
    }

//    public void initDefaultActionBar() {
//        String currentUserFullName = "";
//        String currentRoomName = sharedPrefsHelper.get(Consts.PREF_CURREN_ROOM_NAME, "");
//
//        if (sharedPrefsHelper.getQbUser() != null) {
//            currentUserFullName = sharedPrefsHelper.getQbUser().getFullName();
//        }
//
//        setActionBarTitle(currentRoomName);
//        setActionbarSubTitle(String.format(getString(R.string.subtitle_text_logged_in_as), currentUserFullName));
//    }


    public void setActionbarSubTitle(String subTitle) {
        if (actionBar != null)
            actionBar.setSubtitle(subTitle);
    }

    public void removeActionbarSubTitle() {
        if (actionBar != null)
            actionBar.setSubtitle(null);
    }

    void showProgressDialog(@StringRes int messageId) {
        if (progressDialog == null) {
            progressDialog = new ProgressDialog(this);
            progressDialog.setIndeterminate(true);
            progressDialog.setCancelable(false);
            progressDialog.setCanceledOnTouchOutside(false);

            // Disable the back button
            DialogInterface.OnKeyListener keyListener = new DialogInterface.OnKeyListener() {
                @Override
                public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
                    return keyCode == KeyEvent.KEYCODE_BACK;
                }
            };
            progressDialog.setOnKeyListener(keyListener);
        }

        progressDialog.setMessage(getString(messageId));

        progressDialog.show();

    }

    void hideProgressDialog() {
        if (progressDialog != null && progressDialog.isShowing()) {
            progressDialog.dismiss();
        }
    }

    protected SharedPrefsHelper getSharedPrefsHelper() {
        return ((MainApplication) getApplicationContext()).getSharedPrefsHelper();
    }

    protected QBUsersHolder getQBUsersHolder() {
        return ((MainApplication) getApplicationContext()).getQBUsersHolder();
    }

    protected QBDialogsHolder getQBDialogsHolder() {
        return ((MainApplication) getApplicationContext()).getQBDialogsHolder();
    }

    protected ChatHelper getChatHelper() {
        return ((MainApplication) getApplicationContext()).getChatHelper();
    }

    protected DialogsManager getDialogsManager() {
        return ((MainApplication) getApplicationContext()).getDialogsManager();
    }

//    protected abstract View getSnackbarAnchorView();

    protected boolean isProgressDialogShowing() {
        if (progressDialog != null) {
            return progressDialog.isShowing();
        } else {
            return false;
        }
    }

    protected void showErrorSnackbar(@StringRes int resId, Exception e,
                                     View.OnClickListener clickListener) {
            Toast.makeText(this, "Retry", Toast.LENGTH_SHORT).show();
    }

    protected void showInfoSnackbar(String message, @StringRes int actionLabel, View.OnClickListener clickListener) {
        View rootView = getWindow().getDecorView().findViewById(android.R.id.content);
        if (rootView != null) {
            snackbar = ErrorUtils.showInfoSnackbar(getApplicationContext(), rootView, message, actionLabel, clickListener);
        }
    }

    protected void hideSnackbar() {
        if (snackbar != null && snackbar.isShown()) {
            snackbar.dismiss();
        }
    }

    public void onResumeFinished() {
        // Need to Override onResumeFinished() method in nested classes if we need to handle returning from background in Activity
    }
}