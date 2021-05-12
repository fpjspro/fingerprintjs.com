---
templateKey: long-form-content
metadata:
  title: Why It’s Not Just Netflix Losing Money From Subscription Sharing
  url: https://fingerprintjs.com/blog/prevent-subscription-sharing-netflix
  description: Many websites are losing significant revenue from account sharing
    and may not even know the extent of the problem. In this article, we go over
    why subscription sharing might be costing your business more than you
    thought, and how to prevent it.
  image: /img/uploads/thibault-penin-awol7qqsffm-unsplash.jpg
featured: false
publishDate: 2021-03-25T20:40:51.828Z
title: Why It’s Not Just Netflix Losing Money From Subscription Sharing
tags:
  - fingerprinting
  - web
authors:
  - Savannah Copland
---


We are all guilty of it. At some point, you have probably borrowed a friend's subscription to access exclusive services like Netflix and Spotify.

But it's not just music or movie subscription businesses hurting from credential sharing - many more websites are losing significant revenue and may not even know the extent of the problem.



## Netflix's account sharing problem



Of the 200 million-plus paid subscribers of Netflix, roughly 46-percent have shared their passwords at least once, [**a study by Magid found**](https://www.wired.com/story/netflix-password-sharing-crackdown/). The popular streaming service also has an estimated 24 million long-term "pirates" who use shared accounts for up to 26 months on average.

According to a [**survey by Cordcutting.com**](https://cordcutting.com/research/subscription-mooching/), Netflix loses an estimated $2.3 billion on shared passwords each year because of these unregulated activities. It's no wonder that Netflix has begun to test blocking users suspected of subscription sharing. [**Netflix recently tested out a new feature**](https://edition.cnn.com/2021/03/11/media/netflix-password-sharing-prevention/index.html) where users need to verify that they are authorized to use the account via a text or email notification for them to continue watching. 

## What Exactly Is Subscription Sharing?



Subscription sharing is when a paying customer shares their login credentials to another person so the latter can also benefit from the service without having to purchase a license. Most digital subscriptions boil down to just a username (email) and a password, making it very easy for users to share their accounts.

Based on a [**Parks Associate report**](https://www.parksassociates.com/blog/article/pr-01152020), there are two main types of credential sharing:

### 1. Casual Sharing

This arrangement happens when there is no intent to profit from the practice. For example, if you lend or share your Netflix account to a family member or friend and don't charge them for it.

### 2. Pirating

Pirating occurs when a malicious actor shares access to a compromised paying account for a fee without the customer's knowledge. While casual sharing is in a bit of a gray area legally, pirating passwords is illegal based on the U.S. [**Computer Fraud and Abuse Act (CFAA)**](https://www.nacdl.org/Landing/ComputerFraudandAbuseAct). 

## Subscription Sharing Affects Many Industries




It's not just Netflix and other Video on Demand (VOD) companies losing money because of subscription sharing. Many Software-as-a-Service (SaaS) companies also lose revenue because of such practices. Some industries commonly affected include:

-   B2C: gated content and communities (online newspapers, eLearning platforms)
-   B2B: tools with per-user subscription models (marketing, sales, design, productivity, team management)

These businesses often don't know the extent of their password sharing problem as it is notoriously hard to measure. While most keep a close eye on the number of registered accounts, they don't know exactly how many individual users are using one login. 

## Security Risks of Subscription Sharing



While affected companies may lose potential revenue to account sharing, others feel the brunt of the problem more dramatically. One of the main risks of sharing passwords is that it can compromise account security. The user's private information is at a much higher risk of falling into the wrong hands the more a login is shared.

-   The account becomes more vulnerable to phishing and other forms of information sniffing. 
-   Once hacked, the malicious actor can assume the original user's identity. They may post inappropriate content, leading to account suspension or getting banned on the platform.
-   The original owner may lose ownership of the account entirely, especially if the malicious actor chooses to change their password. Even worse, if they use the same password on online marketplaces like Amazon, they may make purchases using their credit card information.
-   People who have access to a shared subscription might sell the login information. Hackers can sell logins to users who want the same service at a fraction of a cost or use the logins to take over more valuable accounts.

## What Companies Block Subscription Sharing Today?


In the past, Netflix and other VODs appeared neutral about the issue since they also receive some marketing benefits from subscription sharing between friends. However, some subscriptions like the New York Times do put statements in their policies that subscribers can't share their registration login credentials.

Where companies do have subscription sharing policies, the details can vary significantly. While some companies are pretty strict with the one account to one active user ratio, other companies are more lenient, allowing for 2-4 simultaneous devices.

We recently worked with a global education technology company on instituting subscription sharing using our visitor identification service - you can read about their implementation in our case study.

## How to Combat the Negative Impact of Subscription Sharing


Curbing subscription sharing can be pretty tricky, as companies run the risk of either frustrating paying customers or failing to change behavior at all. If a company's method of catching subscription sharers is too strict, a user's access may be limited when they access their account via a different device. On the other hand, if the rules are too lenient, sharers can easily bypass restrictions and continue sharing their login.

One of the most effective ways of limiting password sharing is to institute a visitor identification process that can detect when multiple visitors (either via separate devices or browsers) use the same account. Companies can then program logic to limit sharing by blocking new devices from accessing the service, requiring email or SMS authentication, or otherwise discouraging users from sharing.

To accurately identify web visitors with today's browser and device security settings requires multiple techniques. The most advanced systems combine browser fingerprinting, cookies, geolocation, and other server-side identification techniques to generate visitorIDs.

## How Browser Fingerprinting Works


A core technology for visitor identification is browser fingerprinting. It accurately identifies users by collecting signals via the browser and combines them into a unique visitorID. Brower fingerprints are difficult to spoof via VPNs, clearing cookies, or incognito browsing, making them a powerful tool to catch even the sneakiest of visitors.

Browser fingerprinting functions the same way a security camera can identify the basic details of a car. Instead of features like make and model, it identifies a user using signals captured by the browser.

Every time we use a browser, be it on our desktop or mobile device, websites have access to details about our browser and device such as:

-   Browser used and the settings of its OS
-   WebGL parameters
-   Hardware details such as device memory and screen resolution
-   Browser plugins 
-   User-agent details
-   IP address and location

Whenever a user uses a webpage to log in to the software or app, the fingerprinting function collects data, which can then be stored in a database. When the same user returns to the website, the system can compare the visitor history and associate past sessions with the user.

## Identification accuracy for preventing account sharing

Browser fingerprinting on its own can be highly accurate (up to 90% in some studies). However, there is always a margin of error, resulting in either false positive or false negative identifications.

A false positive is when the same fingerprint is assigned to multiple unique visitors, and a false negative is when different fingerprints are given to one visitor across multiple visits.

For subscription sharing, while the ideal identification solution would be as accurate as possible, false negatives are of higher concern. They should be avoided at all costs, as businesses don't want to falsely accuse customers of sharing their login credentials.

The best way to ensure a high enough accuracy is to use multiple identification methods that further increase the system's accuracy. 


## Other Methods to Accurately Identify a User



Below are some additional identification techniques that can be used to uniquely identify web visitors:

1.  **Cookies**

Cookies store a unique identifier hash within the browser every time a user first lands on your website. The next time the same user visits the website, it can check the records in your database to ensure the two visitors are not the same.

The problem with relying solely on cookies is that they can be cleared in browser settings. Ad Blockers can also disable them by default, and even the user can refuse to be cookies as part of the CCPA and [**General Data Protection Regulation (GDPR)**](https://gdpr-info.eu/). 

2.  **Device Identification**

Device identification refers to methods that identify a specific computer or mobile device model that the visitor uses. This technique could have been helpful since it narrows down the account usage or access to a few devices. However, it is still pretty inaccurate as there isn't a foolproof system of tying browsing sessions between browsers or web and native applications.

3.  **IP Address**

IP addresses can be used to identify a visitor, but there are some instances where it will not be accurate. For example, university campuses will often have a small handful of IP addresses, making distinctions between students impossible.



## Why Choose FingerprintJS?


The first step in limiting the effects of shared passwords and subscription sharing is to create an accurate visitor identification system. By doing so, you can be sure that the one using the service is, in fact, the person who subscribed to it.

[FingerprintJS Pro](https://fingerprintjs.com/) is the most accurate user identification service on the market. It has a 99.5% visitor identification accuracy that relies on a combination of browser fingerprinting, IP address, cookies, and other server-side identification techniques to identify users correctly. Generated VisitorIDs are accurate even for visitors using incognito browsing, Virtual Private Networks (VPNs), and other spoofing techniques. 


Whatever your identification solution may be, we hope the techniques outlined in this article can help your business prevent subscription sharing.