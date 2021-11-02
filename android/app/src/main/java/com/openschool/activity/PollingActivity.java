package com.openschool.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.openschool.R;

public class PollingActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String POLLING = "POLLING";
    public static final String POLLING_ANS = "POLLING_ANS";

    private EditText edtQue, edtOp1, edtOp2, edtOp3, edtOp4;
    private TextView tvQue, tvOp1, tvOp2, tvOp3, tvOp4;
    private Button btnSubmit;
    private ImageView ivBack;
    private LinearLayout llTeacher,llPupil;

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
        tvQue = findViewById(R.id.tvQue);
        tvOp1 = findViewById(R.id.tvOp1);
        tvOp2 = findViewById(R.id.tvOp2);
        tvOp3 = findViewById(R.id.tvOp3);
        tvOp4 = findViewById(R.id.tvOp4);
        btnSubmit = findViewById(R.id.btnSubmit);
        llTeacher = findViewById(R.id.llTeacher);
        llPupil = findViewById(R.id.llPupil);
        btnSubmit = findViewById(R.id.btnSubmit);

        ivBack.setOnClickListener(this);
        btnSubmit.setOnClickListener(this);

        init();
    }

    private void init() {
        Intent intent = getIntent();
        if (intent.hasExtra("isForPupil")) {
            llTeacher.setVisibility(View.GONE);
            llPupil.setVisibility(View.VISIBLE);
            btnSubmit.setText("SUBMIT YOUR ANSWER");

            String data = intent.getStringExtra(PollingActivity.POLLING);
            String poll[] = data.split("##@##");
            tvQue.setText(poll[0]);
            tvOp1.setText(poll[1]);
            tvOp2.setText(poll[2]);
            tvOp3.setText(poll[3]);
            tvOp4.setText(poll[4]);

            tvOp1.setOnClickListener(this);
            tvOp2.setOnClickListener(this);
            tvOp3.setOnClickListener(this);
            tvOp4.setOnClickListener(this);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.ivBack:
                finish();
                break;
            case R.id.tvOp1:
                selectedAns = "A. " + tvOp1.getText().toString();
                tvOp1.setBackground(getDrawable(R.drawable.shape_poll_selected));
                tvOp2.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp3.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp4.setBackground(getDrawable(R.drawable.shape_poll));
                break;
            case R.id.tvOp2:
                selectedAns = "B. " + tvOp2.getText().toString();
                tvOp1.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp2.setBackground(getDrawable(R.drawable.shape_poll_selected));
                tvOp3.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp4.setBackground(getDrawable(R.drawable.shape_poll));
                break;
            case R.id.tvOp3:
                selectedAns = "C. " + tvOp3.getText().toString();
                tvOp1.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp2.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp3.setBackground(getDrawable(R.drawable.shape_poll_selected));
                tvOp4.setBackground(getDrawable(R.drawable.shape_poll));
                break;
            case R.id.tvOp4:
                selectedAns = "D. " + tvOp4.getText().toString();
                tvOp1.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp2.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp3.setBackground(getDrawable(R.drawable.shape_poll));
                tvOp4.setBackground(getDrawable(R.drawable.shape_poll_selected));
                break;
            case R.id.btnSubmit:
                if (selectedAns != null) {
                    System.out.println("KDKD: selectedAns " + selectedAns);
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
                    System.out.println("KDKD: data" + data);
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