package com.openschool.adapter;


import android.annotation.SuppressLint;
import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.openschool.Model.PollSchoolOptionModel;
import com.openschool.R;

import java.util.ArrayList;

public class PollSchoolOptionAdepter extends RecyclerView.Adapter<PollSchoolOptionAdepter.RvViewHolder> {
    Context context;
    ArrayList<PollSchoolOptionModel> models;
    Onclick onclick;

    public interface Onclick {
        void onChangeText( String value, int pos);
        void onRemove(int pos);
    }

    public PollSchoolOptionAdepter(Context context, ArrayList<PollSchoolOptionModel> models, Onclick onclick) {
        this.context = context;
        this.models = models;
        this.onclick = onclick;
    }

    View view;

    @Override
    public RvViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.poll_options_render_layout, parent, false);
        RvViewHolder rvViewHolder = new RvViewHolder(v, new MyCustomEditTextListener());
        return rvViewHolder;
    }

    @SuppressLint("RecyclerView")
    @Override
    public void onBindViewHolder(@NonNull RvViewHolder holder, int position) {
        final PollSchoolOptionModel model = models.get(position);

        holder.myCustomEditTextListener.updatePosition(holder.getAdapterPosition());
        holder.edtOption.setText(model.isValue);

        if (!model.getDefault())
            holder.btnRemove.setVisibility(View.VISIBLE);
        else
            holder.btnRemove.setVisibility(View.GONE);

        holder.btnRemove.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onclick.onRemove(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return models.size();
    }

    public class RvViewHolder extends RecyclerView.ViewHolder {

        EditText edtOption;
        ImageView btnRemove;
        MyCustomEditTextListener myCustomEditTextListener;

        public RvViewHolder(View itemView, MyCustomEditTextListener myCustomEditTextListener) { //public ViewHolder(View v, MyCustomEditTextListener myCustomEditTextListener) {
            super(itemView);
            edtOption = itemView.findViewById(R.id.edtOption);
            btnRemove = itemView.findViewById(R.id.btnRemove);

            this.myCustomEditTextListener = myCustomEditTextListener;
            this.edtOption.addTextChangedListener(myCustomEditTextListener);
        }
    }

    public class MyCustomEditTextListener implements TextWatcher {
        private int position;

        public void updatePosition(int position) {
            this.position = position;
        }

        @Override
        public void beforeTextChanged(CharSequence charSequence, int i, int i2, int i3) {
        }

        @Override
        public void onTextChanged(CharSequence s, int i, int i2, int i3) {
            onclick.onChangeText(s.toString(), position);
        }

        @Override
        public void afterTextChanged(Editable editable) {
        }
    }
}
