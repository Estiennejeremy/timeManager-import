FROM wombat7/openjdk-node-docker as build-stage
ARG android_home

ENV ANDROID_SDK_ROOT $android_home
ENV KEYPASS $keypass

# Install utilities
RUN apt-get update && \
    apt-get install -y wget unzip && \
    rm -rf /var/lib/apt/lists/*

# Install sdk
RUN mkdir -p ${ANDROID_SDK_ROOT} && \
    cd ${ANDROID_SDK_ROOT} && \
    wget -q https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O android_tools.zip && \
    unzip android_tools.zip && \
    rm android_tools.zip

RUN echo $android_home
ENV PATH ${PATH}:$android_home/tools:$android_home/tools/bin:$android_home/platform-tools

# Accept licenses
RUN yes | sdkmanager --licenses

# Install android-29 target
RUN sdkmanager "build-tools;29.0.2" "platforms;android-29"

# Install gradle
RUN wget https://services.gradle.org/distributions/gradle-5.0-bin.zip -P /tmp
RUN unzip -d /opt/gradle /tmp/gradle-*.zip
RUN ls /opt/gradle/gradle-5.0
ENV GRADLE_HOME "/opt/gradle/gradle-5.0"
ENV PATH ${PATH}:${GRADLE_HOME}/bin

# Build project
WORKDIR /client_mobile
RUN npm install -g cordova
ENV PATH /client_mobile/node_modules/.bin:$PATH
COPY package*.json /client_mobile/
RUN npm install
COPY . .

WORKDIR /client_mobile/src-cordova
# RUN sdkmanager --list
RUN cordova requirements

WORKDIR /client_mobile
RUN npm run cordova-prepare
RUN npm run cordova-build-android

# Generate keystore
RUN keytool -genkey -noprompt -keyalg RSA -keysize 2048 -validity 10000 \
 -alias timemanager \
 -dname "CN=timemanager.com, OU=DEV, O=TimeManager, L=Strasbourg, S=Alsace, C=FR" \
 -keystore my-release-key.keystore \
 -storepass $keypass \
 -keypass $keypass

# Sign apk
RUN jarsigner -verbose \
  -sigalg SHA1withRSA \
  -digestalg SHA1 \
  -keystore my-release-key.keystore \
  -storepass $keypass \
  -keypass $keypass \
  ./src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk timemanager

RUN chmod +x ./idle.sh
RUN ./idle.sh
