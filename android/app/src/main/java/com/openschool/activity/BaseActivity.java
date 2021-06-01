package com.openschool.activity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.StringRes;

import com.openschool.util.QBResRequestExecutor;

/**
 * QuickBlox team
 */
public abstract class BaseActivity extends CoreBaseActivity {

//    SharedPrefsHelper sharedPrefsHelper;
    private ProgressDialog progressDialog;
//    protected GooglePlayServicesHelper googlePlayServicesHelper;
    protected QBResRequestExecutor requestExecutor;

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

    protected void showErrorSnackbar(@StringRes int resId, Exception e,
                                     View.OnClickListener clickListener) {
        if (getSnackbarAnchorView() != null) {
            Toast.makeText(this, "Retry", Toast.LENGTH_SHORT).show();
        }
    }

    protected abstract View getSnackbarAnchorView();
}