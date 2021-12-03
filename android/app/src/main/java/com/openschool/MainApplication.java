package com.openschool;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.openschool.manager.ChatHelper;
import com.openschool.manager.DialogsManager;
import com.openschool.packages.CallPackage;
import com.openschool.packages.DialogPackage;
import com.openschool.packages.LoginPackage;
import com.openschool.utils.SharedPrefsHelper;
import com.openschool.utils.qb.QBDialogsHolder;
import com.openschool.utils.qb.QBDialogsHolderImpl;
import com.openschool.utils.qb.QBUsersHolder;
import com.openschool.utils.qb.QBUsersHolderImpl;
import com.quickblox.auth.session.QBSettings;
import com.quickblox.conference.ConferenceConfig;
import com.quickblox.core.LogLevel;
import com.quickblox.videochat.webrtc.QBRTCConfig;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    //Chat settings
    public static final int CHAT_PORT = 5223;
    public static final int SOCKET_TIMEOUT = 300;
    public static final boolean KEEP_ALIVE = true;
    public static final boolean USE_TLS = true;
    public static final boolean AUTO_JOIN = false;
    public static final boolean AUTO_MARK_DELIVERED = true;
    public static final boolean RECONNECTION_ALLOWED = true;
    public static final boolean ALLOW_LISTEN_NETWORK = true;

    //Chat settings range
    private static final int MAX_PORT_VALUE = 65535;
    private static final int MIN_PORT_VALUE = 1000;
    private static final int MIN_SOCKET_TIMEOUT = 300;
    private static final int MAX_SOCKET_TIMEOUT = 60000;

    static final String APPLICATION_ID = "90905";
    static final String AUTH_KEY = "h-ykAkyXnJkRNWD";
    static final String AUTH_SECRET = "n-BAzvbxcR5ggrj";
    static final String ACCOUNT_KEY = "2xYap5od8h1GCfgxCJ6B";
    //    static final String JANUS_URL = "wss://janus.quickblox.com:8989/";
    static final String JANUS_URL = "wss://groupcallsdemo.quickblox.com/";

    public static final String USER_DEFAULT_PASSWORD = "quickblox";

    private SharedPrefsHelper sharedPrefsHelper;
    private QBUsersHolder qbUsersHolder;
    private QBDialogsHolder qbDialogsHolder;
    private ChatHelper chatHelper;
    private DialogsManager dialogsManager;

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    packages.add(new LoginPackage());
                    packages.add(new DialogPackage());
                    packages.add(new CallPackage());

                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

        QBSettings.getInstance().init(getApplicationContext(), APPLICATION_ID, AUTH_KEY, AUTH_SECRET);
        QBSettings.getInstance().setAccountKey(ACCOUNT_KEY);
        QBSettings.getInstance().setLogLevel(LogLevel.DEBUG);
        QBRTCConfig.setDebugEnabled(true);
        ConferenceConfig.setUrl(JANUS_URL);

        initSharedPreferences();
        initUsersHolder();
        initDialogsHolder();
        initChatHelper();
        initDialogsManager();
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.openschool.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    private void initSharedPreferences() {
        sharedPrefsHelper = new SharedPrefsHelper(getApplicationContext());
    }

    public SharedPrefsHelper getSharedPrefsHelper() {
        return sharedPrefsHelper;
    }

    private void initUsersHolder() {
        qbUsersHolder = new QBUsersHolderImpl();
    }

    public QBUsersHolder getQBUsersHolder() {
        return qbUsersHolder;
    }

    private void initDialogsHolder() {
        qbDialogsHolder = new QBDialogsHolderImpl();
    }

    public QBDialogsHolder getQBDialogsHolder() {
        return qbDialogsHolder;
    }

    private void initChatHelper() {
        chatHelper = new ChatHelper(getApplicationContext());
    }

    public ChatHelper getChatHelper() {
        return chatHelper;
    }

    private void initDialogsManager() {
        dialogsManager = new DialogsManager(getApplicationContext());
    }

    public DialogsManager getDialogsManager() {
        return dialogsManager;
    }

    private void checkAppCredentials() {
        if (APPLICATION_ID.isEmpty() || AUTH_KEY.isEmpty() || AUTH_SECRET.isEmpty() || ACCOUNT_KEY.isEmpty()) {
            throw new AssertionError(getString(R.string.error_qb_credentials_empty));
        }
    }

    private void checkChatSettings() {
        if (USER_DEFAULT_PASSWORD.isEmpty() || (CHAT_PORT < MIN_PORT_VALUE || CHAT_PORT > MAX_PORT_VALUE)
                || (SOCKET_TIMEOUT < MIN_SOCKET_TIMEOUT || SOCKET_TIMEOUT > MAX_SOCKET_TIMEOUT)) {
            throw new AssertionError(getString(R.string.error_chat_credentails_empty));
        }
    }
}
