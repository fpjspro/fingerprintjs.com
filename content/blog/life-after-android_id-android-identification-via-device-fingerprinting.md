---
templateKey: long-form-content
metadata:
  title: Device Fingerprinting For Android Developers
  description: Device fingerprinting is a powerful tool for Android developers to
    accurately identify their users. Learn how you can use the Fingerprint
    Android library to future-proof your application security.
  url: https://fingerprintjs.com/blog/device-fingerprinting-android
  image: /img/uploads/4.png
featured: false
publishDate: 12.08.2020 4:18 PM
title: 'Life after ANDROID_ID: Android Identification via Device Fingerprinting'
tags:
  - java
  - fingerprinting
---
![Device Fingerprinting For Android](/img/uploads/4.png 'Fingerprint Android')

**Last week, our team launched Fingerprint Android, an open-source library for accurately identifying Android devices using all available signals.**

In this article, we explain some of the current challenges of Android device identification, and how device fingerprinting can be a stable and reliable alternative to system-generated identifiers like ANDROID_ID that are likely to be discontinued in the future.

## Why Device Identification Matters

Device identification is an essential part of a mobile developer’s toolkit for detecting and preventing fraud.

An accurate and persistent device ID can flag users that are most likely to commit fraud, and mitigate fraudulent attempts by incorporating authentication flows or blocking users based on their usage history. From download to login to payment, the number of ways a malicious actor can commit fraud is ever increasing, and depending on your application, the most lucrative forms of fraud will vary.

Android developers had it easy in the past, with access to several system-provided identifiers including hardware signals and the system-generated Android ID (or SSAID). However, many of these signals are now unavailable to app developers, with more expected to be removed, restricted, or require opt-in permissions from users in coming updates. Additionally, remaining methods of identification including SSAID are easy for dedicated fraudsters to spoof, providing little protection against sophisticated fraud attacks.

## At-Risk Android Device Identification Methods

There have historically been three main ways to identify a device in Android without the use of device fingerprinting.

All of these methods share a common theme: they are ineffective for some use cases today, or are likely to be discontinued in the near future. Android developers need to find alternative ways to uniquely identify users before these options are no longer available.

#### 1. Use hardware identifiers (MAC address, IMEI, IMSI, etc.)

Android used to provide access to hardware identifiers such as MAC address, IMEI, and others. But due to privacy changes for Android 10, access has been restricted. Now every app that needs to use these identifiers must go through an onerous review process for the Play Market.

**Pros and Cons:**

* Most stable option. It survives both app-reinstallation and factory-reset.
* Unavailable for most applications on the latest versions of Android.

#### 2. Generate a file with UUID on the first launch of an app

This method works like cookies in a browser, in that a unique ID is generated and stored on the Android device. But, as with cookies, this file can be cleared by the user, in this case by uninstalling the app.

**Pros and Cons:**

* Simple, stable.
* Will likely not be restricted in the future - this is the recommended method of identification for most non-fraud use cases.
* Does not survive after application reinstallation.

#### 3. The system provided identifiers, such as ANDROID_ID or Google Service Framework ID

Android provides a few IDs for advertisement or fraud prevention cases.

* The most popular identifier is ANDROID_ID, but it is likely that Google intends to replace it with AdvertisingId.
* Another unique identifier is the Google Service Framework ID (GSF ID). At the moment there is no official documentation about its use for device identification, so it is also at risk of becoming unavailable in future updates

**Pros and Cons:**

* Stable: both survive app reinstallation, but not factory reset.
* Access can be restricted in the future.
* Easy to spoof:the Xposed framework allows you to spoof these identifiers right out of the box by installing it on a rooted device.

## Device Fingerprinting

Fingerprinting techniques have already become an essential tool for identifying devices. Our open source browser fingerprinting library has over 12K stars on Github and is used by 8,000+ websites. Fingerprinting techniques on their own have been found to be over 90% accurate in correctly identifying a unique user in the browser, and when combined with usage history, fuzzy matching, and probability engines, this accuracy can be further improved.

One of the main advantages of device fingerprinting is that it is stateless. A well-implemented fingerprint can remain stable through multiple sessions, incognito browsing, uninstalling or reinstalling apps, or clearing cookies.

While browser fingerprinting has approached ubiquity in recent years, the best kept secret in fingerprinting technology is its potential for applications beyond the browser. Mobile device fingerprinting allows app developers to identify users applying more sources of entropy than is available inside the browser. Some of the sources that can be used are:

* Hardware (device details, model, CPU, memory, sensors etc.)
* OS properties (version, build name, build number etc.)
* Device settings (the information about some settings of the device)
* Installed applications

A combination of these signals is unique for the vast majority of devices, and can be used for device identification. Most importantly, it is much harder to circumvent, as it is difficult to spoof all of the available signals. Because of this, fingerprinting is a good option for fraud detection applications.

**Pros and Cons:**

* Good uniqueness and stability.
* Much harder to spoof.
* Can change over time due to device updates.

## How the library works

The Fingerprint Android library combines all the techniques mentioned above to provide two stable and unique identifiers.

The first identifier provided is the DeviceID, which relies on GSF ID and ANDROID ID. They are stable but it is possible to spoof them with the Xposed framework (as mentioned above).

For instances where you want to mitigate the risk of users spoofing their DeviceID, the library also generates a Device Fingerprint. Our fingerprinting process collects over 50 platform signals and calculates a unique hash for each user. You can easily see all the signals that are collected and the resulting Device Fingerprint in our playground app.

The library aims to generate a Device Fingerprint with the best balance of stability and uniqueness. As such, the default Device Fingerprint hash omits installed application signals. Application signals are not stable because users can install or uninstall applications. But these signals are useful when you need a highly unique fingerprint, as users rarely have the same set of installed applications.

Hardware signals, on the other hand, remain the same even after a factory reset and so are highly stable and contribute to an incremental increase in uniqueness. As such, we include hardware signals in our recommended Device Fingerprint configuration.

The advantage of using our Android Fingerprint library is that the stability and uniqueness of the recommended DeviceID will be further improved over time by our team and the open-source community. However, the library is built to be flexible, and allows developers to change the platform signals manually if there is a need.

## Why You Should Use Our Android Fingerprint Library

The process of device identification is already complicated, and will likely become much more complicated in the future, as happened with iOS and IFDA, Apple’s advertising identifier.

To apply IFDA as an identifier, the user now has to provide explicit opt-in permissions to be tracked for advertising purposes. This is a common trend for increasing user’s privacy across many platforms, but it makes fraud prevention with these identifiers unreliable. Our library does not require any additional permissions, and will be kept up-to-date with Android’s policies to guarantee that users can be identified with a high degree of accuracy as rules change.

Our Android Fingerprint library provides a stable Device Fingerprint that is generated using all available platform signals. Using the library is a way for developers to consistently get a reliable device ID regardless of accessibility and stability changes over time.

The library is fully written in Kotlin – a modern and safe language that helps to make sure the library does not crash. It also does not require any transitive dependencies (except kotlin-stdlib for Java-only projects). The integration needs only a few lines to add the dependency. It provides convenient forward and backward compatibility without unexpected fingerprint changes during updates.

## Get Involved

We are excited to see what the open source community will build with our Android Fingerprint library.

* Star, follow, or fork our [Github project](https://github.com/fingerprintjs/fingerprint-android)
* [Email us](mailto:sales@fingerprintjs.com) your questions
* Sign up to our [newsletter](https://mailchi.mp/708d84efc0c1/updates-signup) for updates on our fingerprinting libraries
* Is your company interested in further device fingerprint accuracy and stability? We would love to hear from you - reach out to [sales@fingerprintjs.com](sales@fingerprintjs.com)
* Need browser fingerprinting as well? Check out our open source library, or try our [Browser Fingerprinting API](https://fingerprintjs.com/) FingerprintJS Pro for 99.5% fingerprinting accuracy