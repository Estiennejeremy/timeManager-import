FROM macadamian/cordova-android-builder

RUN mkdir -p /client-cordova /build-android-apk

RUN rm -rf /build-android-apk/*

WORKDIR /client-cordova

cordova create client_mobile
WORKDIR /client-cordova/cordova

CMD cordova build android --verbose -- stacktrace — info && cp /client-cordova/cordova/platforms/android/build/outputs/apk/*.apk /android-build-output
