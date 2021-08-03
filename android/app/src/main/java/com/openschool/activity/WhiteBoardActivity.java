package com.openschool.activity;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import com.openschool.R;

public class WhiteBoardActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_white_board);

        ImageView ivBack = findViewById(R.id.ivBack);
        ivBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        WebView wvBoard = findViewById(R.id.wvBoard);
        wvBoard.getSettings().setJavaScriptEnabled(true);
        wvBoard.setWebViewClient(new WebViewClient());
        wvBoard.setWebChromeClient(new WebChromeClient());
        wvBoard.getSettings().setAllowContentAccess(true);
        wvBoard.getSettings().setDomStorageEnabled(true);
        wvBoard.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36");
//        wvBoard.loadUrl("http://14.143.90.234:10082/web/CoDoodler/CoDoodler.html");
        wvBoard.loadUrl("https://www.divinetreeindia.com/codoodler/CoDoodler.html");
    }
}