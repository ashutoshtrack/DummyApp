package com.dummyapp;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;
import android.widget.Toast;
import 	android.util.Log;


public class MyTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();

    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "BackTask",
          Arguments.fromBundle(extras),
          5000, // timeout for the task
          true // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }
    return null;
  }
}