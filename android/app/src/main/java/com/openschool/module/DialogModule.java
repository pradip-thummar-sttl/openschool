package com.openschool.module;

import android.os.Bundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.openschool.util.QBResRequestExecutor;
import com.quickblox.chat.model.QBChatDialog;
import com.quickblox.core.QBEntityCallback;
import com.quickblox.core.exception.QBResponseException;
import com.quickblox.core.helper.StringifyArrayList;
import com.quickblox.users.model.QBUser;

import java.util.ArrayList;

public class DialogModule extends ReactContextBaseJavaModule {

    private QBResRequestExecutor requestExecutor;

    public DialogModule(ReactApplicationContext context) {
        super(context);

        init();
    }

    @Override
    public String getName() {
        return "DialogModule";
    }

    private void init() {
        requestExecutor = getQbResRequestExecutor();
    }

    @ReactMethod
    public void qbCreateDialog(ReadableArray tags, ReadableArray userNames, ReadableArray names, Callback callBack) {
        ArrayList<QBUser> selectedUsers = new ArrayList<>();
        for (int i = 0; i < tags.size(); i++) {
            QBUser qbUser = new QBUser();
            StringifyArrayList<String> userTags = new StringifyArrayList<>();
            userTags.add(tags.getString(i));

            qbUser.setFullName(names.getString(i));
            qbUser.setEmail(userNames.getString(i));
            qbUser.setLogin(userNames.getString(i));
            qbUser.setTags(userTags);

            selectedUsers.add(qbUser);
        }

        System.out.println("KDKD: Welcome to the DialogModule! " + tags + " " + userNames + " " + names + " " + selectedUsers.size());
        createDialog(selectedUsers, callBack);
    }

    private void createDialog(final ArrayList<QBUser> selectedUsers, Callback callBack) {
        requestExecutor.createDialogWithSelectedUsers(selectedUsers, null,
                new QBEntityCallback<QBChatDialog>() {
                    @Override
                    public void onSuccess(QBChatDialog dialog, Bundle args) {
                        System.out.println("KDKD: DialogID " + dialog.getDialogId());
                        callBack.invoke(null, dialog.getDialogId());
                    }

                    @Override
                    public void onError(QBResponseException e) {
                        System.out.println("KDKD: err3");
                        callBack.invoke(e.getHttpStatusCode(), null);
                    }
                }
        );
    }

    public synchronized QBResRequestExecutor getQbResRequestExecutor() {
        return requestExecutor == null
                ? requestExecutor = new QBResRequestExecutor()
                : requestExecutor;
    }
}
