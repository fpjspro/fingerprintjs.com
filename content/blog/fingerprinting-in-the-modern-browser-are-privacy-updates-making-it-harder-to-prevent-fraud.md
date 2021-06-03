---
templateKey: long-form-content
metadata:
  title: Browser Fingerprinting and Privacy  - FingerprintJS
  description: Are privacy updates making it harder to use browser fingerprinting
    for anti-fraud? We go through the major modern browsers and determine what
    is still possible to keep your website safe.
  url: http://fingerprintjs.com/blog/browser-fingerprinting-privacy
  image: /img/uploads/modern-browser.png
featured: false
publishDate: 2021-05-25T20:09:52.736Z
title: "Fingerprinting in the Modern Browser: Are Privacy Updates Making It
  Harder to Prevent Fraud?"
tags:
  - fingerprinting
authors:
  - Savannah Copland
---
![Browser fingerprinting privacy](/img/uploads/modern-browser.png "Browser fingerprinting privacy")

The trend in web browsers over the past few years has generally been in favor of more privacy for users. Almost all mainstream browsers ([Safari](https://www.infoq.com/news/2020/04/safari-third-party-cookies-block/), [Firefox](https://blog.mozilla.org/blog/2021/02/23/latest-firefox-release-includes-multiple-picture-in-picture-and-total-cookie-protection/), [Brave](https://support.brave.com/hc/en-us/articles/360050634931-How-Do-I-Manage-Cookies-In-Brave-), and [Chrome](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)) now block third-party cookies which enabled tracking across multiple sites, and Chrome uses encrypted traffic (via HTTPS) by default.

Similarly, regulations like GDPR and CCPA are adding legal hurdles for companies that want to gather user data online. Cookie consent boxes are now ubiquitous (despite the fact that [they're rarely implemented correctly](https://www.zdnet.com/article/cookie-consent-most-websites-break-law-by-making-it-hard-to-reject-all-tracking/)), and companies in many jurisdictions are now responsible for allowing users the [right to be forgotten](https://en.wikipedia.org/wiki/Right_to_be_forgotten).

More privacy is generally a good thing for legitimate users. It means fewer opportunities for their personal data to be stolen, it can decrease the risk of identity theft, and it gives them more control over how their data can be used.

*But, increased browser privacy also comes with a hidden cost. By preventing cookies and other tracking mechanisms, it's very hard for web application developers to figure out whether a visitor is a real user or a fraudulent bot.* This leads developers to rely heavily on multi-factor authentication methods, which slow down and frustrate users. It also increases the cost of building and maintaining applications - costs likely passed on to users in one form or another.

There is another way to identify users without intrusive cookies. In this article, I'll share a technique called *browser fingerprinting* and discuss how it can be used to prevent fraud in modern browsers. I'll also share an overview of the privacy settings that impact fingerprinting in each of the three major web browsers (Chrome, Safari, and Firefox). Finally, I'll share how fingerprinting must continue to evolve as privacy measures do.

## How Browser Fingerprinting Works

[Browser fingerprinting](https://fingerprintjs.com/blog/what-is-browser-fingerprinting/) can be used to uniquely identify users and their associate sessions regardless of anonymizing tactics like incognito browsing, VPNs, and cookie blockers. Unlike third-party cookies, which can be cleared or blocked by the browser, your browser fingerprint cannot be altered.

Fingerprinting can be used to identify visitors with a pattern of fraudulent behavior and then target only these visitors for additional security checks. This means you won't slow down legitimate users who want to access your site, but you will be able to identify those who are trying to brute force access or circumvent your security measures.

### Understanding Fraudulent Users

Most fraudsters use identity concealing techniques like incognito mode or VPNs (virtual private networks) to hide their identity. This allows them to try multiple passwords, stolen credit cards, or email addresses in your app in an attempt to gain access to restricted data or make an illegitimate purchase.

Fingerprinting takes in data from the browser to help build a unique profile for each user on your site. By capturing the following specifics, fingerprinting software can identify suspicious traffic without an IP address or cookie:

* Computer make and model
* Operating system version
* Browser version
* Browser extensions
* Timezone
* Language settings
* Adblocker used
* Screen size and resolution
* Tech specs (CPU, GPU, hard disk, etc.)

This method is surprisingly accurate when done well. **[FingerprintJS](https://fingerprintjs.com/) is 99.5% accurate** at identifying users and assigning them a unique visitorID. Using this ID, you can associate patterns of fraud with specific visitors and block them as needed.

## Privacy in the Modern Browser

As you might imagine, browser fingerprinting has had to evolve as browsers have evolved. In the past few decades, the laws and standards around online privacy, as well as the tactics available to web developers have changed a lot.

For example, cookies on their own have always been relatively easy to bypass. Because they're stored on the user's browser, they can be easily cleared manually or programmatically, so they don't provide a useful mechanism for identifying malicious users.

Other browser features are much harder to bypass. Since the introduction of [WebGL in the 2010s](https://en.wikipedia.org/wiki/WebGL#Software), web applications can draw a Canvas element onto the DOM. This uses the computer's graphics card to render an image that can be converted to a unique identifier for a user. Of course, browser extensions can block this method, so it's rarely used alone but as part of a comprehensive fingerprinting method.

This continued arms race between companies that rely on tracking to prevent fraud and malicious users has led to a number of new features that affect fingerprinting in modern browsers. With extensions and native features in all of the top three browsers that can block or bypass some part of the fingerprinting process, let's look at some of the privacy settings that impact fingerprinting.

### Browser Fingerprinting in Chrome

Chrome is currently the most popular browser, with a [64.19% market share](https://gs.statcounter.com/browser-market-share#monthly-202103-202103-bar).

![Current market share of modern browsers](https://imgur.com/ryh0z2q.png)

Despite Google’s [spotty record of offering privacy to users](https://www.cnet.com/how-to/google-collects-a-frightening-amount-of-data-about-you-you-can-find-and-delete-it-now/), the Chrome browser does provide options that make tracking harder. First, users can block third-party cookies or all cookies or manually clear their cookies each time they close their browser.

![Google Chrome cookie settings](https://i.imgur.com/lWAYNdD.png)

While cookies may not be critical in most fingerprinting algorithms, Chrome is also currently running a trial of Google’s [Privacy Sandbox](https://www.privacysandbox.com/). This feature attempts to prevent fingerprinting by hiding your hardware and software information from websites. It’s not clear when these features will be on for all Chrome users, but that seems to be the direction Google is heading.

![Chrome Privacy sandbox](https://i.imgur.com/Yonufo3.png)

Chrome also offers users the option to block access to operating system services or make websites ask before accessing them. Many of these services can be used to help fingerprint users if they’re enabled. Users can also turn off JavaScript completely, but this likely isn’t practical for real users as [most websites rely on JavaScript to function](https://w3techs.com/technologies/details/cp-javascript).

![Chrome permissions and content](https://i.imgur.com/xuEMRuA.png)

Chrome users can also use extensions to [block fingerprints](https://chrome.google.com/webstore/search/fingerprint), [obscure their IP addresses](https://chrome.google.com/webstore/search/vpn), and more. Each of these extensions limits tracking in its own way (for example, the [Canvas Fingerprint Detector](https://chrome.google.com/webstore/detail/canvas-fingerprint-defend/lanfdkkpgfjfdikkncbnojekcppdebfp) blocks the HTML Canvas fingerprint method described above).

Of course, no browser's privacy protections are perfect, and researchers are constantly finding new ways to track users in Chrome. For example, according to [a 2020 paper by computer scientist Doug Leith](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/), Chrome sends a "persistent identifier" as a header on each web request (presumably for debugging) that can be used as part of a browser fingerprint. It’s almost impossible for malicious users to completely avoid detection if fingerprinters are willing to stay up-to-date on the latest changes, but keeping up with these changes is a huge undertaking.

### Safari Browser Fingerprinting

As the second most popular web browser, Safari is slightly more private by default than Chrome. Safari uses [Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/) to determine the sites tracking a user and blocks them if a user hasn't visited them for thirty days. [Safari now blocks a number of tracking technologies](https://www.apple.com/safari/docs/Safari_White_Paper_Nov_2019.pdf), including some attempts at fingerprinting, without making any concessions for fraud prevention.

Like Chrome, Safari lets users disable JavaScript and block cookies. It also shows a privacy report right on the welcome page. Users can disable location services and autofill to prevent those features from being used in fingerprinting.

![Safari privacy options](https://i.imgur.com/Zq2AQ7d.png)

Finally, Safari users can make fingerprinting even harder with extensions like [Better](https://better.fyi/) or a [VPN](https://www.comparitech.com/blog/vpn-privacy/best-vpn-safari/) to obscure their IP address, location, and other device-specific data.

Still, there are some weak spots in Safari’s pro-privacy measures. [Researcher Doug Leith](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/) found that the Safari welcome page can actually leak information to third party apps that can then load user identifiers into the browser cache. It’s also possible that Apple’s iCloud processes make connections with identifying user information (likely for debugging purposes). Either of these data points could be part of a browser fingerprint, depending on how the data is distributed.

### Browser Fingerprinting in Firefox

Firefox has been outspoken about user privacy in recent years. Users are presented with the company’s privacy statement upon opening the browser for the first time, and fingerprint controls are turned on by default.

![Firefox standard tracking protection](https://i.imgur.com/NAATIFi.png)

This layer of fingerprinting protection built directly into the browser prevents sites from reading:

* Your timezone
* Your installed fonts
* Window size preference
* Operating system version
* Keyboard layout and language
* Site-specific zoom settings
* [And more](https://support.mozilla.org/en-US/kb/firefox-protection-against-fingerprinting)

As in Chrome, Firefox users can change the permissions given to each website they visit, or they can block system resource requests entirely from the *Permissions* menu.

![Firefox operating system permissions](https://i.imgur.com/pSUB3Dt.png)

Finally, there are thousands of Firefox extensions that give users more fine-grained [control over their privacy](https://addons.mozilla.org/en-US/firefox/search/?q=privacy). Users can also install the [AmIUnique addon](https://addons.mozilla.org/en-US/firefox/addon/amiunique/) to see how unique their browser is among the millions of fingerprints collected by [AmIUnique](https://amiunique.org/). This knowledge can be used by malicious users to tweak their settings further to obscure their identity.

Even with some pretty strict fingerprinting protections in place, Doug Leith [found shortcomings in Firefox’s privacy configuration](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/) too. For example, Firefox transmits identifying information during [telemetry data reporting](https://support.mozilla.org/en-US/kb/telemetry-clientid) which is on by default.

## The Ever-Changing World of Browser Fingerprinting

I’ve covered some of the features that browsers offer to users who want to protect their privacy online, but the specifics are constantly changing.

Browsers need to add new features to enable more complex behavior online, but these new features can often be used to build fingerprints to identify users by their hardware or software. So, the browsers make these features gated or harder to access, but this makes certain websites harder to use.

Despite the resistance to fingerprinting in some circles, it’s a legitimate and useful tool for preventing fraud and improving online security. With an ever-escalating race between malicious users and fingerprinters, it can be really hard for development teams to keep up with all the changes.

For example, Firefox [just released](https://www.makeuseof.com/latest-firefox-88-update-elevates-online-privacy/) an update that prevents sites from reading other open windows' names. If you were maintaining your own fingerprinting software that used open windows as part of your identifying data, you have to decide how to compensate for this change, or your fingerprint will get obsolete quickly.

This is where tools like [FingerprintJS](https://fingerprintjs.com/) come in. As experts in the fingerprinting space, they provide developers with 99.5% accurate browser fingerprinting and offer a free, open-source library as well as paid services. [FingerprintJS](https://fingerprintjs.com/) doesn’t rely on outdated third-party tracking mechanisms, and it helps you prevent account takeovers, password sharing, and fake accounts.

Modern browsers are doing a good job of improving privacy protections, but this trend comes with a cost to web application owners. Fortunately, fingerprinting is still an accurate and low-cost way to prevent fraud even now. Just don't roll out your own.