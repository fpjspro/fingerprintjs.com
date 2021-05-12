---
templateKey: long-form-content
metadata:
  title: "What is Browser Fingerprinting: A Beginner's Guide - FingerprintJS  "
  description: Browser fingerprinting is a useful tool for developers to detect
    fraudulent activity on their website. Learn how this identification
    technique works with a real-life example.
  url: https://fingerprintjs.com/blog/what-is-browser-fingerprinting
  image: /img/uploads/3.png
featured: false
publishDate: 2020-12-24T16:11
title: The Beginner’s Guide to Browser Fingerprinting for Fraud Detection
tags:
  - js
  - web
  - fingerprinting
authors:
  - Savannah Copland
---

![Fingerprint icon on map background](/img/uploads/3.png 'Fingerprint Icon')

**Fraud looms on the minds of development teams for any website, but fraud prevention doesn’t have to be all-consuming, or even expensive.** With a highly accurate identifier it becomes much easier for developers to triage suspicious traffic and restrict access to users attempting to hack into accounts, make fraudulent purchases or simply spam your website. The key to identifying those most likely to commit fraud is either by past activity, or by associating specific patterns of use with a higher likelihood of fraudulence.

Browser fingerprinting technologies are a cornerstone technology for developer-led fraud prevention that cuts through spoofing attempts to accurately identify users, and it can do this without requiring additional permissions from the user. Our open source [browser fingerprinting library](https://github.com/fingerprintjs/fingerprintjs) has over 12K stars on Github and is used by 8,000+ websites. Fingerprinting techniques on their own have been found to be over [90% accurate](https://arstechnica.com/information-technology/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/) in correctly identifying a unique user in the browser, and when used in conjunction with usage history, fuzzy matching, and probability engines, this accuracy can be further improved.

## How Fingerprinting Works

#### Identifying a Vehicle

Here’s an analogy: let’s say you’re a detective in a large city trying to find one specific car suspected of being a bank robber’s getaway vehicle, as captured by a security camera. To find this car your plan is to go to a busy intersection and take note of all the details of passing cars until you find one that matches the vehicle on the security camera. Ideally, you would like to be able to uniquely identify the car, such that only one vehicle in the city matches your description, otherwise you’ll have to question multiple drivers.

If the security camera caught some basic details (or signals) about the car, you’ll be able to narrow your search considerably:

- Color (red)
- Manufacturer (Ford)
- Type of car (truck)
- Model name (F-150)
- Brand of tires (stock Goodyears)
- Age/year (2015-2021)

With these signals, you may be able to uniquely identify the vehicle right away, especially if any of the specifics are particularly rare. However, in a city with millions of drivers, there may be hundreds of red Ford F-150 trucks with standard-issue tires. The more standard the combination of signals, the harder it is to get a unique match.

In those cases, you hope that your camera may have gotten lucky and matched on a more unique signal about the vehicle:

- Wood panelling
- Custom decal or logo
- Body damage/rust patterns
- Interior decorations

One of these signals may quickly narrow down your search. A red Ford F-150 truck with a local company’s logo could very well be unique, even in a large city.

There is, of course, the most uniquely identifiable element of a car - the license plate. License plates serve the express purpose of uniquely identifying a car, but they aren’t useful if the vehicle owner removes their plates or swaps them with fakes. It’s important to have a backup for when this method of identification fails.

By assembling a broad and comprehensive set of identifiers you can narrow the list of suspects to make singling out a bad-actor much easier.

#### Identifying a Visitor

Fingerprinting works almost exactly the same as the example above. Now, you are trying to identify a visitor to a web or mobile application (suspect) by capturing signals passed via the visitor’s browser or device (car) captured through a fingerprinting function (security camera).

A lot of signals can be captured by the browser, including:

- User agent details (browsers installed and their versions, operating system)
- Hardware details (screen resolution, battery usage, device memory)
- Browser plugins used
- Browser and OS settings
- WebGL parameters

When a visitor lands on a webpage, the fingerprinting function collects signals and compiles them into a hash that can be stored. Any time this visitor returns to the website, their fingerprint can be compared to past visit history to identify suspicious behavior or past fraudulent activity.

## Accuracy

For a fingerprint to be useful as a method of identifying visitors, it needs to have a high accuracy. Our FingerprintJS Pro tool has a 99.5% accuracy rate, which means for every 1,000 visits, 995 are correctly associated with a unique identifier.

For the 5 out of 1,000 that are not correctly identified, they can be described as either false positives or false negatives:

- False positive: multiple unique visitors are given the same fingerprint
- False negative: one visitor over multiple visits are given different fingerprints

To reduce false positives and false negatives, your fingerprint should combine not only many signals, but the right combination of signals that balance both uniqueness and stability. If a signal is highly unique, it will reduce your chances of a false negative, whereas stable signals will reduce your chances of a false positive.

![Graphic of signals by stability and uniqueness](/img/uploads/capture.png)

This framework can also be used to remove signals from your fingerprinting function altogether. If a signal has both low uniqueness and low stability, it is likely to change or be spoofed frequently, and doesn’t contribute meaningfully to uniqueness. To our car example, this might be whether a car has a dirty windshield - you cannot count on this signal to improve your chances of finding the correct car. In the world of browser fingerprinting, current battery level is a poor signal, and so while it is accessible, we remove it from our fingerprinting function.

## The Case for Cookies

Special consideration should be given to perfectly unique identifiers that are not always available.

Cookies work by storing a unique identifier hash in the browser when a visitor first lands on your website. When a visitor has a cookie that matches a previous visit record in your database, you can be certain that these two visitors are the same. However, cookies are a very easy identifier to conceal:

- Cookies can be cleared in browser settings
- Adblockers can disable cookies by default
- Visitors can revoke consent to being cookied as part of GDPR or CCPA

In these cases, instead of including a cookie as an identifier in your fingerprinting function, it can be more useful to use logic to determine when to use cookies as your identifier:

- If cookie matches a previous record: use cookie
- If no cookie matches previous record: use fingerprint

One of the main advantages of fingerprinting is that it is stateless. A well-implemented fingerprint can remain stable through multiple sessions, incognito browsing, uninstalling or reinstalling apps, or clearing cookies. For that reason, using the two methods in conjunction with one another can give a higher % accuracy than either identification method alone.

_FingerprintJS Pro achieves its high rate of accuracy by using fingerprinting, cookies and additional machine learning techniques that incorporate IP address and geolocation._ One challenge is keeping up with changes in available signals as new browser versions are released. Anytime Chrome or Safari is updated, for example, identification techniques need to be re-evaluated to determine if further tweaks need to be made to keep accuracy high. Our team is constantly looking to improve our accuracy by iterating on the signals, algorithms, and techniques used.

## Fraud Applications For Fingerprinting

An important first principle for dealing with fraud is that only a small percentage of visitors are responsible for the [majority of fraud cases](https://www.f5.com/labs/articles/threat-intelligence/2020-phishing-and-fraud-report#_fig19). A developer team aiming to reduce fraud on their website will need to find ways to isolate these visitors, verify their identity through authentication, and blacklist them as needed. However, you will want to avoid putting up these roadblocks for the rest of your ‘trusted’ traffic, as additional authentication can be detrimental to the user experience, slowing your users’ ability to access their account, make purchases, and engage with your website.

Account takeover is a common form of fraud where malicious users try to log in to other users’ accounts, and is an excellent use-case for fingerprinting technology. Additional security at login can make account takeover much more difficult, though the type of authentication used may depend on the suspicious behavior your website experiences most often:

- _For bot or brute force attacks_ (one user or a network of bots trying many combinations of usernames/passwords):

  - Show a captcha after 1 unsuccessful login attempt on a fingerprint.
  - Lock user out of attempting login after 5 unsuccessful attempts on a fingerprint.

- _For phished accounts_ (a user obtained someone else’s legitimate login information through a scam or social engineering):

  - Require two-factor or email authentication when attempting to login with a new fingerprint.
  - Blacklist specific fingerprinted visitors from your site based on their fingerprint.

In each of these cases, an accurate fingerprint allows your team to pinpoint users that are attempting fraudulent behavior, while keeping your trusted users unhindered. The type of authentication needed can be incorporated into your website by using existing workflows without having to fundamentally change the architecture of your site.

It is also important to note that users intending to commit fraud are much more likely to use techniques to conceal their identity, including using incognito mode, browsing via a VPN, and disabling cookies. That’s also where fingerprinting shines, as it can associate these users without needing easily concealed identifiers like cookies and IP addresses.

## Browser vs. Device Fingerprinting

Our FingerprintJS open source library as well as our Pro API are intended for browser fingerprinting - they can accurately identify visitors to a website using all modern mobile and desktop browsers. However, if you want to identify users of a native mobile app, you will need to use a device fingerprinting function that is made specifically for each mobile operating system. The signals available for mobile app developers are different from signals that can be retrieved in the browser, and vary between iOS, Android, and other mobile operating systems.

Our team recently launched Fingerprint Android, our first open source library for identifying unique Android devices. You can read more about how our Fingerprint Android library works in our article about its launch.
Get Involved
We would love to hear your questions and get feedback from the developer community on our fingerprinting technology.

_Here are a few ways you can get involved_

- Star, follow or fork our Github projects: [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) (browser fingerprinting) and [Fingerprint-Android](https://github.com/fingerprintjs/fingerprint-android)
- Need more accurate browser fingerprinting for your business? Sign up for a free FingerprintJS Pro account for [99.5% fingerprinting accuracy](https://fingerprintjs.com/)
- [Email us](mailto:sales@fingerprintjs.com) your questions
- Sign up for our [newsletter](https://mailchi.mp/708d84efc0c1/updates-signup) for updates

![Graphic of signals by stability and uniqueness](/img/uploads/fp_logo_cmyk_color.jpg)
