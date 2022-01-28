package com.openschool.Model;

public class ChatVO {
    private String _id, _msg, _date, _name;


    public ChatVO(String id, String name, String msg, String date) {
        this._id = id;
        this._name = name;
        this._msg = msg;
        this._date = date;
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        this._name = name;
    }

    public String getMsg() {
        return _msg;
    }

    public void setMsg(String msg) {
        this._msg = msg;
    }

    public String getDate() {
        return _date;
    }

    public void setDate(String date) {
        this._date = date;
    }
}
