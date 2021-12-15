package com.openschool.Model;

public class PollSchoolOptionModel {

    public boolean isDefault;
    public String isValue;

    public PollSchoolOptionModel(boolean isDefault, String isName)
    {
        this.isDefault = isDefault;
        this.isValue = isName;
    }

    public boolean getDefault() {
        return isDefault;
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public String getValue() {
        return isValue;
    }

    public void setValue(String isName) {
        this.isValue = isName;
    }
}
