package com.openschool.Model;

public class PollPupilOptionsModel {

    public boolean isSelected;
    public String isValue;

    public PollPupilOptionsModel(boolean isSelected, String isValue)
    {
        this.isSelected = isSelected;
        this.isValue = isValue;
    }

    public boolean getSelected() {
        return isSelected;
    }

    public void setSelected(boolean isDefault) {
        this.isSelected = isDefault;
    }

    public String getValue() {
        return isValue;
    }

    public void setValue(String isValue) {
        this.isValue = isValue;
    }

}
