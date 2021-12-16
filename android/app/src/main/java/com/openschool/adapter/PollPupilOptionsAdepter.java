package com.openschool.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.openschool.Model.PollPupilOptionsModel;
import com.openschool.R;

import java.util.ArrayList;

public class PollPupilOptionsAdepter extends RecyclerView.Adapter<PollPupilOptionsAdepter.MyViewHolder> {

    Context applicationContext;
    private ArrayList<PollPupilOptionsModel> _pollPupilAnswerList;
    private Onclick onclick;

    public interface Onclick {
        void onSelect(int pos, String value);
    }

    public PollPupilOptionsAdepter(Context applicationContext, ArrayList<PollPupilOptionsModel> pollPupilAnswerList, Onclick onclick) {
        this.applicationContext = applicationContext;
        this._pollPupilAnswerList = pollPupilAnswerList;
        this.onclick = onclick;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.pupil_options_render, parent, false);
        return new MyViewHolder(itemView);
    }

    @SuppressLint("RecyclerView")
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        PollPupilOptionsModel pollPupilModel = _pollPupilAnswerList.get(position);
        holder.txtOptions.setText(pollPupilModel.getValue());

        if(pollPupilModel.isSelected)
            holder.txtOptions.setBackground(applicationContext.getDrawable(R.drawable.shape_poll_selected));
        else
            holder.txtOptions.setBackground(applicationContext.getDrawable(R.drawable.shape_poll));

        holder.txtOptions.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onclick.onSelect(position, pollPupilModel.getValue());
            }
        });
    }



    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView txtOptions;
        public LinearLayout ll_item;

        public MyViewHolder(View view) {
            super(view);
            txtOptions = itemView.findViewById(R.id.txtOptions);
            ll_item = itemView.findViewById(R.id.ll_item);
        }
    }

    @Override
    public int getItemCount() {
        return _pollPupilAnswerList.size();
    }


}

//public class PollSchoolOptionsAdepter extends RecyclerView.Adapter<PollSchoolOptionsAdepter.RvViewHolder> {
//    Context context;
//    ArrayList<String> models;
//    Onclick onclick;
//
//    public interface Onclick {
//        void onSelect(int pos);
//    }
//
//    public PollSchoolOptionsAdepter(Context context, ArrayList<String> models, Onclick onclick) {
//        this.context = context;
//        this.models = models;
//        this.onclick = onclick;
//    }
//
//    View view;
//
//    @Override
//    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
//        View itemView = LayoutInflater.from(parent.getContext())
//                .inflate(R.layout.movie_list_row, parent, false);
//
//        return new MyViewHolder(itemView);
//    }
//
//    @Override
//    public void onBindViewHolder(@NonNull RvViewHolder holder, int position) {
//        final PollOptionModel model = models[position];
//
//        holder.txtOptions.setText(model.isValue);
//
//        holder.txtOptions.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                onclick.onSelect(position);
//            }
//        });
//    }
//
//    @Override
//    public int getItemCount() {
//        return models.size();
//    }
//
//    public class RvViewHolder extends RecyclerView.ViewHolder {
//
//        TextView txtOptions;
//
//        public RvViewHolder(View itemView, com.example.pollingdemo.PollOptionAdepter.MyCustomEditTextListener myCustomEditTextListener) { //public ViewHolder(View v, MyCustomEditTextListener myCustomEditTextListener) {
//            super(itemView);
//            txtOptions = itemView.findViewById(R.id.edtOption);
//        }
//    }
//
//}
