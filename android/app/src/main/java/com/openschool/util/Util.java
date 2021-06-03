package com.openschool.util;

import android.content.Context;
import android.widget.EditText;
import android.widget.Toast;

import com.openschool.R;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {
    public static boolean isEnteredTextValid(Context context, EditText editText, int maxLength, boolean checkName) {

        boolean isCorrect;
        Pattern p;
        if (checkName) {
            p = Pattern.compile("^[a-zA-Z][a-zA-Z 0-9]{2," + (maxLength - 1) + "}+$");
        } else {
            p = Pattern.compile("^[a-zA-Z][a-zA-Z0-9]{2," + (maxLength - 1) + "}+$");
        }

        Matcher m = p.matcher(editText.getText().toString().trim());
        isCorrect = m.matches();

        if (!isCorrect) {
            Toast.makeText(context, context.getString(R.string.error_room), Toast.LENGTH_SHORT).show();
            return false;
        } else {
            return true;
        }
    }
}
