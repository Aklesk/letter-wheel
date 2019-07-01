package com.letter-wheel;

import com.facebook.react.ReactActivity;
import com.github.kevinejohn.keyevent.KeyEventModule;
import android.view.KeyEvent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "letter-wheel";
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);
        return super.onKeyUp(keyCode, event);
    }
}
