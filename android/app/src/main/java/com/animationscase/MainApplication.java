package com.app.lcar;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.ijzerenhein.sharedelement.RNSharedElementPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import eu.sigrlami.rnsimdata.RNSimDataReactPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.zyu.ReactNativeWheelPickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
// import com.reactnative.ivpusic.imagepicker.PickerPackage;
// import com.reactlibrarynotificationsounds.NotificationSoundsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
// import com.reactnativecommunity.geolocation.GeolocationPackage;
// import com.ashideas.rnrangeslider.RangeSliderPackage;

import com.wix.interactable.Interactable;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      // new RNCardViewPackage();
      new LinearGradientPackage();
      new FBSDKPackage();

      
      // new GeolocationPackage();
      packages.add(new Interactable());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
  }
}
