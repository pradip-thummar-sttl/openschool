package com.openschool.util;

import androidx.fragment.app.Fragment;

import com.pubnub.api.PubNub;

// tag::INIT-2[]
public interface ParentActivityImpl {

    PubNub getPubNub();
}
// end::INIT-2[]
