---
templateKey: long-form-content
metadata:
  title: How to minimize CAPTCHA API calls with user identification - FingerprintJS
  image: /img/uploads/crosswalks.png
  url: https://fingerprintjs.com/blog/reduce-captcha
  description: Looking for CAPTCHA alternatives? With user identification, you can
    reduce your need for CAPTCHA technology to catch bots and spam filling out
    forms on your website.
featured: false
publishDate: 2021-03-15T16:23:06.733Z
title: How to minimize CAPTCHA API calls to streamline UX and improve conversions
tags:
  - fingerprinting
  - bot attacks
authors:
  - Savannah Copland
---
CAPTCHAs make it more difficult for bots to submit fraudulent information via online forms, but they can also get in the way of humans interacting with your website.

It can be frustrating for users to be served CAPTCHAs as they can be deceptively difficult to solve, and end up wasting a lot of your customer’s time.

Differences in how people interpret CAPTCAs can create unintended challenges for visitors. For example, a user may be prompted to click all the squares in the below image that contain a fire hydrant:

![](/img/uploads/hydrants.png)

People in Mountain View, California will click the three bottom squares on the left without hesitation because they see a familiar red hydrant. A few will click all four squares on the left because the little antenna on the top is technically part of the fire hydrant. Somebody from Tokyo, Japan might hit the “SKIP” button, because their fire hydrants don’t look like the one in the picture. Billions of non-native English speakers might not know what a fire hydrant is and it may not translate correctly. 

## How CAPTCHAs impact conversion rates

Indiscriminate use of CAPTCHAs invariably makes your website harder to use. A [large-scale study from Stanford ](https://web.stanford.edu/~jurafsky/burszstein_2010_captcha.pdf)on how easy it is for humans to solve CAPTCHAs confirms this, showing that, on average:

* Visual CAPTCHA takes 9.8 seconds to complete
* Audio CAPTCHA takes much longer (28.4 seconds) to hear and solve
* Audio CAPTCHA has a 50% give-up rate
* Only 71% of the time will 3 users agree on the translation of a CAPTCHA
* Only 31.2% of the time will 3 users agree on the translation of an audio CAPTCHA

The research indicates that when you add CAPTCHA to your site, it reduces conversions. [MOZ.com](https://moz.com/blog/captchas-affect-on-conversion-rates) performed a side-by-side comparison of sites with CAPTCHA on and off, and found that: 

> ...with CAPTCHA on, there was an 88% reduction in SPAM but there were 159 failed conversions. Those failed conversions could be SPAM, but they could also be people who couldn’t figure out the CAPTCHA and finally just gave up. With CAPTCHA on, SPAM and failed conversions accounted for 7.3% of all the conversions for the 3 month period. With CAPTCHA’s off, SPAM conversions accounted for 4.1% of all the conversions for the 3 month period. That possibly means when CAPTCHA is on, the company could lose out on 3.2% of all their conversions!

The consequences for sending web traffic through difficult processes are real. If a user gets frustrated and leaves your site there’s a strong chance they won’t come back. That’s why it’s important to find ways to make the user experience easier.

## How can I minimize the impact of CAPTCHAs on my user experience?

If you are worried about the impact of CAPTCHAs on your conversion rates but still need to contend with bot attacks and spam, there are a few options:

### Use a CAPTCHA with Better Design

There are many options on the market today for lower-friction CAPTCHAs that have a more friendly design for users.

* MTCaptcha: a “noCAPTCHA” competitor to Google that claims to be GDPR compliant as well as more user-friendly
* Slider Captchas: a lot of bloggers online have touted slider CAPTCHAs as a highly user-friendly design and capable of catching 99% of bots. While there is no clear front-runner, there are both popular Github projects and Wordpress plugins using this form factor.

### Use Google’s reCAPTCHA

Google’s reCAPTCHA includes a ‘frictionless fraud detection service’ that attempts to identify automated attacks, while allowing trusted users to bypass verification. This means that less of your trusted traffic has to interact with the CAPTCHA at all, and only more suspicious visitors will be put to the test.

However, there are a few reasons you may want to avoid using Google’s reCAPTCHA technology despite its benefits:

* *Privacy:* Google collects user data from sites with reCAPTCHA integration, and can track users across sites that use reCAPTCHA. It also takes a screenshot of the user’s browser when they complete a test.
* *UX:* critics of reCAPTCHA find Google’s image recognition test to be particularly cumbersome when not bypassed. 
* *Google bias:* users with cookies from Google and users signed in to Google accounts are far less likely to trigger reCAPTCHA because Google considers those users verified by internal means. Users from China, where Google is banned, and users on browsers other than Chrome are more likely to be tested.
* *Lack of transparency:* Google does not provide insight to webmasters about who gets through their verification and who doesn’t.

### Use Alternative Authentication Methods

* Form honeypots: particularly useful for contact forms, you can set up a honeypot by creating a form field that is hidden to human visitors, but will be filled out by bots. Anytime you see a lead with a honeypot field filled out, you can disregard that lead or otherwise block that visitor from interacting with your site.
* Use SMS, email or two-factor authentication: while two-factor authentication introduces considerable friction for login or sign-up forms, it is pretty effective against bot traffic. If you already use a method of 2FA authentication you may not need CAPTCHAs to protect your forms from bots.

## How FingerprintJS can help reduce CAPTCHA use

FingerprintJS Pro is a 99.5% accurate user identification service that uses browser fingerprinting and other technologies to identify users, even when they take steps to obscure their identity.

FingerprintJS Pro can be used in conjunction with CAPTCHA technologies to ensure a more seamless experience for trusted users, and require additional authentication from suspected bot traffic.

* *For trusted returning traffic:* Allow visitors to bypass CAPTCHA verification if they have passed a CAPTCHA in the past, or their visitorID is otherwise associated with a trusted customer
* *For bot or suspicious traffic:* Show a CAPTCHA on subsequent attempts to log in if a visitorID has attempted to submit a form multiple times or has otherwise been flagged as suspicious.

![](/img/uploads/copy-of-the_power_of_fingerprinting_infographic_2.png)

FingerprintJS provides fraud protection that helps to reduce friction for legitimate users, improving conversions and facilitating more streamlined user interactions. Want to try for yourself? Create your [free FingerprintJS account](https://dashboard.fingerprintjs.com/signup) today.