package com.nuland02.takePicture;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import java.io.ByteArrayOutputStream;


public class TakePictureModule extends ReactContextBaseJavaModule {
    private static final int IMAGE_CAPTURE_REQUEST = 1;
    private static final String ERR_NO_IMAGE_DATA_FOUND = "ERR_NO_IMAGE_DATA_FOUND";
    private static final String ERR_ACTIVITY_DOES_NOT_EXIST = "ERR_ACTIVITY_DOES_NOT_EXIST";
    private static final String ERR_FAILED_TO_TAKE_PICTURE = "ERR_FAILED_TO_TAKE_PICTURE";

    private Promise mPicturePromise;
    private int mQuality;   // quality of output image (value range: [1, 100])

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == IMAGE_CAPTURE_REQUEST) {
                if (mPicturePromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        WritableMap res = Arguments.createMap();
                        res.putBoolean("cancel", true);
                        res.putString("base64", "");

                        mPicturePromise.resolve(res);
                    } else if (resultCode == Activity.RESULT_OK) {
                        Bundle extras = intent.getExtras();
                        if (extras == null) {
                            mPicturePromise.reject(ERR_NO_IMAGE_DATA_FOUND, "No image data found");
                        } else {
                            final Bitmap imageBitmap = (Bitmap) extras.get("data");
                            String encodedImage = encodeImage(imageBitmap);

                            WritableMap res = Arguments.createMap();
                            res.putBoolean("cancel", false);
                            res.putString("base64", encodedImage);
                            res.putInt("height", imageBitmap.getHeight());
                            res.putInt("width", imageBitmap.getWidth());

                            mPicturePromise.resolve(res);
                        }
                    }
                    mPicturePromise = null;
                }
            }
        }
    };

    // Convert Bitmap into Base64 string
    private String encodeImage(Bitmap bitMap)
    {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitMap.compress(Bitmap.CompressFormat.JPEG, mQuality, baos);
        byte[] bytes = baos.toByteArray();
        return Base64.encodeToString(bytes, Base64.DEFAULT & Base64.NO_WRAP); 
    }

    public TakePictureModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // Add the listener for `onActivityResult`
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "TakePictureModule";
    }

    @ReactMethod
    public void takePicture(final int quality, final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(ERR_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when takePicture intent returns data
        mPicturePromise = promise;
        mQuality = quality;

        try {
            final Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            currentActivity.startActivityForResult(takePictureIntent, IMAGE_CAPTURE_REQUEST);
        } catch (Exception e) {
            mPicturePromise.reject(ERR_FAILED_TO_TAKE_PICTURE, e);
            mPicturePromise = null;
        }
    }

    @ReactMethod
    public void takePicture(final Promise promise) {
        takePicture(100, promise);
    }
}
