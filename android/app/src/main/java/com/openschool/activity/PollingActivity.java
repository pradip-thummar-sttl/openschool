package com.openschool.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.openschool.Model.PollPupilOptionsModel;
import com.openschool.Model.PollSchoolOptionModel;
import com.openschool.R;
import com.openschool.adapter.PollPupilOptionsAdepter;
import com.openschool.adapter.PollSchoolOptionAdepter;

import java.util.ArrayList;

public class PollingActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String POLLING = "POLLING";
    public static final String POLLING_ANS = "POLLING_ANS";

    private ArrayList<PollSchoolOptionModel> _pollSchoolOptionsData = new ArrayList<PollSchoolOptionModel>();
    private ArrayList<PollPupilOptionsModel> _pollPupilOptionData = new ArrayList<PollPupilOptionsModel>();

    private LinearLayout _llSchool, _llPupil;
    private RecyclerView _SchoolRecyclerView,_pupiRecyclerView;

    private PollSchoolOptionAdepter _pollOptionAdepter;
    private PollPupilOptionsAdepter _pollPupilOptionsAdepter;

    private Button _btnAddOption, _btnSubmit;
    private EditText _edtQuestion;
    private TextView _txtPupilQutions;

    private ImageView _ivBack;

    private String _selectedAns = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_polling);

        addVerb();
        initData();
        addEvent();

    }

    private void addVerb() {

        _ivBack = findViewById(R.id.ivBack);

        _llSchool = findViewById(R.id.llSchool);
        _llPupil = findViewById(R.id.llPupil);

        _edtQuestion = findViewById(R.id.edtQuestion);
        _txtPupilQutions = findViewById(R.id.txtPupilQutions);
        _btnSubmit = findViewById(R.id.btnSubmit);
        _btnAddOption = findViewById(R.id.btnAddOption);

        _SchoolRecyclerView = findViewById(R.id.schollList);
        _SchoolRecyclerView.setHasFixedSize(true);

        _pupiRecyclerView = findViewById(R.id.pupilList);
        _pupiRecyclerView.setHasFixedSize(true);

        PollSchoolOptionModel model = new PollSchoolOptionModel(true,"");
        _pollSchoolOptionsData.add(model);
        _pollSchoolOptionsData.add(model);

    }

    private void addEvent() {
        _ivBack.setOnClickListener(this);
        _btnAddOption.setOnClickListener(this);
        _btnSubmit.setOnClickListener(this);
    }

    private void initData() {

        Intent intent = getIntent();
        if (intent.hasExtra("isForPupil"))
            onPupil();
        else
            onSchool();

    }

    private void onPupil() {
        _llSchool.setVisibility(View.GONE);
        _btnAddOption.setVisibility(View.GONE);
        _llPupil.setVisibility(View.VISIBLE);
        _btnSubmit.setText("SUBMIT YOUR ANSWER");

        Intent intent = getIntent();
        String data = intent.getStringExtra(PollingActivity.POLLING);
//        String data = "how it possible?##@##no idea##@##have idea";
        String poll[] = data.split("##@##");
        _txtPupilQutions.setText(poll[0]);

        LinearLayoutManager layoutManager = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        _pupiRecyclerView.setLayoutManager(layoutManager);

        for(int i = 1; i < poll.length; i++) {
            PollPupilOptionsModel model = new PollPupilOptionsModel(false, poll[i]);
            _pollPupilOptionData.add(model);
        }

        _pollPupilOptionsAdepter = new PollPupilOptionsAdepter(getApplicationContext(), _pollPupilOptionData, new PollPupilOptionsAdepter.Onclick() {
            @Override
            public void onSelect(int pos, String value) {

                for (PollPupilOptionsModel model : _pollPupilOptionData) {
                    model.setSelected(false);
                }

                PollPupilOptionsModel model = new PollPupilOptionsModel(true, value);
                _selectedAns= pos +". " + value;
                _pollPupilOptionData.set(pos, model);
                _pupiRecyclerView.setAdapter(_pollPupilOptionsAdepter);
            }
        });
        _pupiRecyclerView.setAdapter(_pollPupilOptionsAdepter);
    }

    private void onSchool() {
        _llPupil.setVisibility(View.GONE);
        _llSchool.setVisibility(View.VISIBLE);
        _btnAddOption.setVisibility(View.VISIBLE);

        LinearLayoutManager layoutManager = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        _SchoolRecyclerView.setLayoutManager(layoutManager);

        _pollOptionAdepter = new PollSchoolOptionAdepter(getApplicationContext(), _pollSchoolOptionsData, new PollSchoolOptionAdepter.Onclick() {
            @Override
            public void onChangeText(String value, int pos) {
                if(pos < _pollSchoolOptionsData.size()) {
                    PollSchoolOptionModel model = new PollSchoolOptionModel(pos == 0 || pos == 1, value);
                    _pollSchoolOptionsData.set(pos, model);
                }
            }

            @Override
            public void onRemove(int pos) {
                _pollSchoolOptionsData.remove(pos);
                _pollOptionAdepter.notifyDataSetChanged();
            }
        });

        _SchoolRecyclerView.setAdapter(_pollOptionAdepter);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.ivBack:
                finish();
                break;
            case R.id.btnAddOption:
                insertMethod("");
                break;

            case R.id.btnSubmit:
                if (_pollPupilOptionData.size() > 0 && !_selectedAns.isEmpty()) {
                    System.out.println("KDKD: selectedAns " + _selectedAns);
                    Intent intent = new Intent();
                    intent.putExtra(POLLING_ANS, _selectedAns);
                    setResult(CallActivity.POLLING_ANS_REQUEST_CODE, intent);
                    finish();
                }
                else if (_edtQuestion.getText().toString().length() > 0 && onCheckOptions()) {

                    Intent intent = new Intent();
                    String data = _edtQuestion.getText().toString() + onGetAns();

                    System.out.println("KDKD: data" + data);
                    intent.putExtra(POLLING, data);

                    setResult(CallActivity.POLLING_REQUEST_CODE, intent);
                    finish();

//                    Intent intent = new Intent();
//                    _data = _edtQuestion.getText().toString() + onGetAns();
//                    _isPupil = "isForPupil";
//                    initData();

//                    intent.putExtra(POLLING, data);
//                    setResult(CallActivity.POLLING_REQUEST_CODE, intent);
//                    finish();

                } else {
                    Toast.makeText(this, "Please add at least two options along with question", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }

    private void insertMethod(String name) {
        PollSchoolOptionModel model = new PollSchoolOptionModel(false,"");
        _pollSchoolOptionsData.add(model);
        _pollOptionAdepter.notifyDataSetChanged();
    }

    private boolean onCheckOptions() {
        int andCounter = 0;
        for (PollSchoolOptionModel pollSchoolOptionModel : _pollSchoolOptionsData) {
            String ans = pollSchoolOptionModel.isValue;
            if( !ans.isEmpty() && ans.length() != 0)
                andCounter++;
        }
        return andCounter > 1;
    }

    private String onGetAns() {
        StringBuffer sb = new StringBuffer();
        for (PollSchoolOptionModel pollSchoolOptionModel : _pollSchoolOptionsData) {
            if(!pollSchoolOptionModel.getValue().isEmpty())
                sb.append("##@##"+ pollSchoolOptionModel.isValue);
        }
        return sb.toString();
    }

}