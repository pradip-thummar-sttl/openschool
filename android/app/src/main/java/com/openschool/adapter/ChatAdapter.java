package com.openschool.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.openschool.Model.ChatVO;
import com.openschool.R;
import com.pubnub.api.PubNub;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.files.PNDownloadFileResult;

import java.util.List;

public class ChatAdapter extends RecyclerView.Adapter {

    private List<ChatVO> threadList;
    private PubNub pubnub;
    Onclick onclick;

    public interface Onclick {
        void onDownload( String value);
    }
    public ChatAdapter(List<ChatVO> threadList, Onclick onclick) {
        this.threadList = threadList;
        this.onclick = onclick;
    }

    public class SimpleViewHolder extends RecyclerView.ViewHolder {
        public TextView title, txtMsgTime, txtName;

        public SimpleViewHolder(View view) {
            super(view);
            title = (TextView) view.findViewById(R.id.txtMsg);
            txtName = (TextView) view.findViewById(R.id.txtName);
            txtMsgTime = (TextView) view.findViewById(R.id.txtMsgTime);
        }
    }

    public class DocumentViewHolder extends RecyclerView.ViewHolder {
        public TextView txtMsgTime, txtName, txtFileName;
        public ImageView btnDownload;

        public DocumentViewHolder(View view) {
            super(view);

            txtName = (TextView) view.findViewById(R.id.txtName);
            txtMsgTime = (TextView) view.findViewById(R.id.txtMsgTime);
            btnDownload = (ImageView) view.findViewById(R.id.btnDownload);
            txtFileName = (TextView) view.findViewById(R.id.txtFileName);
        }
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == 0) {
            View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.chat_render_layout, parent, false);
            return new SimpleViewHolder(itemView);
        } else if (viewType == 1) {
            View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.chat_document_render_layout, parent, false);
            return new DocumentViewHolder(itemView);
        }
        return null;
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        ChatVO obj = threadList.get(position);

        if (holder instanceof SimpleViewHolder) {
            ((SimpleViewHolder) holder).title.setText(obj.getMsg());
            ((SimpleViewHolder) holder).txtName.setText(obj.getName());
            ((SimpleViewHolder) holder).txtMsgTime.setText(obj.getDate());
        } else {
            ((DocumentViewHolder) holder).txtName.setText(obj.getName());
            ((DocumentViewHolder) holder).txtFileName.setText(obj.getFileName());
            ((DocumentViewHolder) holder).txtMsgTime.setText(obj.getDate());
            ((DocumentViewHolder) holder).btnDownload.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onclick.onDownload(obj.getUrl());
                }
            });
        }
    }

    @Override
    public int getItemCount() {
        return threadList.size();
    }

    @Override
    public int getItemViewType(int position) {
        String type = threadList.get(position).getRowType();
        if ( type.equals("TEXT")) {
            return 0;
        } else if (type.equals("FILE")) {
            return 1;
        }
        return -1;
    }
}
