
package com.dummyapp;
 
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import android.os.Bundle;
import android.content.Intent;
import androidx.annotation.NonNull;
import android.widget.Toast;


public class CustomModule extends ReactContextBaseJavaModule {
  public static final String REACT_CLASS = "Custom";
  private static ReactApplicationContext reactContext;

  public CustomModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }
  
  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }
  
  @ReactMethod
   public void startService() {
   // Starting the heartbeat service
    

    Bundle bundle = new Bundle();

    Intent service = new Intent(this.reactContext, MyTaskMainService.class);
      

    bundle.putString("foo", "bar");
    service.putExtras(bundle);

    this.reactContext.startService(service);
   }

     @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, MyTaskMainService.class));
    }
}