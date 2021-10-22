package com.openschool.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.openschool.R;

public class PollingActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String POLLING = "POLLING";
    public static final String POLLING_ANS = "POLLING_ANS";

    private EditText edtQue, edtOp1, edtOp2, edtOp3, edtOp4;
    private Button btnSubmit;
    private ImageView ivBack;

    String selectedAns;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_polling);

        ivBack = findViewById(R.id.ivBack);
        edtQue = findViewById(R.id.edtQue);
        edtOp1 = findViewById(R.id.edtOp1);
        edtOp2 = findViewById(R.id.edtOp3);
        edtOp3 = findViewById(R.id.edtOp2);
        edtOp4 = findViewById(R.id.edtOp4);
        btnSubmit = findViewById(R.id.btnSubmit);

        ivBack.setOnClickListener(this);
        btnSubmit.setOnClickListener(this);
    }

    private void init() {
        Intent intent = getIntent();
        if (intent.hasExtra("isForPupil")) {
            edtQue.setEnabled(false);
            edtOp1.setEnabled(false);
            edtOp2.setEnabled(false);
            edtOp3.setEnabled(false);
            edtOp4.setEnabled(false);
            btnSubmit.setText("SUBMIT YOUR ANSWER");

            String data = intent.getStringExtra(PollingActivity.POLLING);
            String poll[] = data.split("##@##");
            edtQue.setText(poll[0]);
            edtOp1.setText(poll[1]);
            edtOp2.setText(poll[2]);
            edtOp3.setText(poll[3]);
            edtOp4.setText(poll[4]);

            edtOp1.setOnClickListener(this);
            edtOp2.setOnClickListener(this);
            edtOp3.setOnClickListener(this);
            edtOp4.setOnClickListener(this);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.ivBack:
                finish();
                break;
            case R.id.edtOp1:
                selectedAns = "A. " + edtOp1.getText().toString();
                edtOp1.setBackgroundColor(R.color.colorAccent);
                edtOp2.setBackgroundColor(R.color.white);
                edtOp3.setBackgroundColor(R.color.white);
                edtOp4.setBackgroundColor(R.color.white);
                break;
            case R.id.edtOp2:
                selectedAns = "B. " + edtOp1.getText().toString();
                edtOp1.setBackgroundColor(R.color.white);
                edtOp2.setBackgroundColor(R.color.colorAccent);
                edtOp3.setBackgroundColor(R.color.white);
                edtOp4.setBackgroundColor(R.color.white);
                break;
            case R.id.edtOp3:
                selectedAns = "C. " + edtOp1.getText().toString();
                edtOp1.setBackgroundColor(R.color.white);
                edtOp2.setBackgroundColor(R.color.white);
                edtOp3.setBackgroundColor(R.color.colorAccent);
                edtOp4.setBackgroundColor(R.color.white);
                break;
            case R.id.edtOp4:
                selectedAns = "D. " + edtOp1.getText().toString();
                edtOp1.setBackgroundColor(R.color.white);
                edtOp2.setBackgroundColor(R.color.white);
                edtOp3.setBackgroundColor(R.color.white);
                edtOp4.setBackgroundColor(R.color.colorAccent);
                break;
            case R.id.btnSubmit:
                if (selectedAns != null) {
                    Intent intent = new Intent();
                    intent.putExtra(POLLING_ANS, selectedAns);
                    setResult(CallActivity.POLLING_ANS_REQUEST_CODE, intent);
                    finish();
                } else if (edtQue.getText().toString() != null &&
                        edtOp1.getText().toString() != null &&
                        edtOp2.getText().toString() != null) {

                    Intent intent = new Intent();
                    String data = edtQue.getText().toString() + "##@##" +
                            edtOp1.getText().toString() + "##@##" +
                            edtOp2.getText().toString() + "##@##" +
                            edtOp3.getText().toString() + "##@##" +
                            edtOp4.getText().toString();
                    intent.putExtra(POLLING, data);

                    setResult(CallActivity.POLLING_REQUEST_CODE, intent);
                    finish();
                } else {
                    Toast.makeText(this, "Please add at least two options along with question", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
}