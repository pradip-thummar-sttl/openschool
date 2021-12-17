package com.openschool.module;

import android.os.Bundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.openschool.MainApplication;
import com.openschool.util.QBResRequestExecutor;
import com.quickblox.core.QBEntityCallback;
import com.quickblox.core.exception.QBResponseException;
import com.quickblox.core.helper.StringifyArrayList;
import com.quickblox.core.helper.Utils;
import com.quickblox.users.model.QBUser;

import java.util.ArrayList;
import java.util.List;

public class LoginModule extends ReactContextBaseJavaModule {
    private String USERNAME = null;
    private String PASSWORD = null;
    private StringifyArrayList<String> USERTAGS = new StringifyArrayList<>();

    private QBResRequestExecutor requestExecutor;
    private QBUser userForSave;

    public LoginModule(ReactApplicationContext context) {
        super(context);

        init();
    }

    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void qbLogin(String uName, String pass, ReadableArray tags, Callback callBack) {
        StringifyArrayList<String> userTags = new StringifyArrayList<>();
        for (int i = 0; i < tags.size(); i++) {
            userTags.add(tags.getString(i));
        }

        this.USERNAME = uName;
        this.PASSWORD = pass;
        this.USERTAGS = userTags;
        System.out.println("KDKD: Welcome to the LoginModule! " + uName + " " + pass + " " + tags + " " + userTags);

        startSignUpNewUser(createQBUserWithCurrentData(), callBack);
    }

    private void init() {
        requestExecutor = getQbResRequestExecutor();
    }

    private void startSignUpNewUser(final QBUser newUser, Callback callBack) {

        requestExecutor.signUpNewUser(newUser, new QBEntityCallback<QBUser>() {
                    @Override
                    public void onSuccess(QBUser result, Bundle params) {
                        QBUser tempUser = result;
                        tempUser.setPassword(PASSWORD);
                        signInCreatedUser(tempUser, callBack);
                    }

                    @Override
                    public void onError(QBResponseException e) {
                        if (e.getHttpStatusCode() == 422 || e.getHttpStatusCode() == 401) {
//                            signInCreatedUser(newUser, true);
                            System.out.println("KDKD: Result Error");
                            signInCreatedUser(createQBUserWithCurrentData(), callBack);
                        } else {
                            System.out.println("KDKD: err1");
                            callBack.invoke(e.getHttpStatusCode(), null);
                        }
                    }
                }
        );
    }

    private void signInCreatedUser(final QBUser user, Callback callBack) {
        System.out.println("KDKD: STARTED");
        requestExecutor.signInUser(user, new QBEntityCallback<QBUser>() {
            @Override
            public void onSuccess(QBUser result, Bundle params) {
                System.out.println("KDKD: END");
                callBack.invoke(null, user.getId());
                System.out.println("KDKD: Succefull Logged In");
            }

            @Override
            public void onError(QBResponseException responseException) {
                System.out.println("KDKD: err2");
                callBack.invoke(responseException.getHttpStatusCode(), null);
            }
        });
    }

    private QBUser createQBUserWithCurrentData() {
        QBUser qbUser = new QBUser();
        qbUser.setFullName(USERNAME);
        qbUser.setLogin(USERNAME);
        qbUser.setPassword(PASSWORD);
        qbUser.setTags(USERTAGS);

        System.out.println("KDKD: qbUser " + qbUser.getPassword());
        return qbUser;
    }

    public synchronized QBResRequestExecutor getQbResRequestExecutor() {
        return requestExecutor == null
                ? requestExecutor = new QBResRequestExecutor()
                : requestExecutor;
    }
}