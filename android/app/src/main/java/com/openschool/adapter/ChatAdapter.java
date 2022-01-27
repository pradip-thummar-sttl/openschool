package com.openschool.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.openschool.Model.ChatVO;
import com.openschool.R;

import java.util.List;

public class ChatAdapter extends RecyclerView.Adapter<ChatAdapter.MyViewHolder> {

    private List<ChatVO> moviesList;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView title, txtMsgTime, txtName;

        public MyViewHolder(View view) {
            super(view);
            title = (TextView) view.findViewById(R.id.txtMsg);
            txtName = (TextView) view.findViewById(R.id.txtName);
            txtMsgTime = (TextView) view.findViewById(R.id.txtMsgTime);
        }
    }


    public ChatAdapter(List<ChatVO> moviesList) {
        this.moviesList = moviesList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.chat_render_layout, parent, false);
        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        ChatVO obj = moviesList.get(position);
        holder.title.setText(obj.getMsg());
        holder.txtName.setText(obj.getName());
        holder.txtMsgTime.setText(obj.getDate());
    }

    @Override
    public int getItemCount() {
        return moviesList.size();
    }
}
