package com.openschool.Model;

public class ChatVO {
    private String _id, _msg, _date, _name, _rowType, _url, _fileName;

    public ChatVO(String id, String name, String msg, String date, String rowType, String _url, String fileName) {
        this._id = id;
        this._name = name;
        this._msg = msg;
        this._date = date;
        this._rowType = rowType;
        this._url = _url;
        this._fileName = fileName;
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

    public String getRowType() {
        return _rowType;
    }

    public void setRowType(String _rowType) {
        this._rowType = _rowType;
    }

    public String getUrl() {
        return _url;
    }

    public void setUrl(String _url) {
        this._url = _url;
    }

    public String getFileName() {
        return _fileName;
    }

    public void setFileName(String _fileName) {
        this._fileName = _fileName;
    }

}
