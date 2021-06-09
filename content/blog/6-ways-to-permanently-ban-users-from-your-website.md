---
templateKey: long-form-content
metadata:
  title: 6 Ways to Permanently Ban Users from Your Website - FingerprintJS
  description: Block specific users from accessing your website content by their
    IP, email address, browser fingerprint and more.
  url: https://fingerprintjs.com/blog/permanently-ban-users/
  image: /img/uploads/ban-from-website.png
  imageAlt: How to ban users from your website
  imageTitle: How to ban users from your website
featured: true
publishDate: 2021-05-17T20:01:48.851Z
title: 6 Ways to Permanently Ban Users from Your Website
tags:
  - web
  - fingerprinting
authors:
  - Linda Ikechukwu
---
![Permanently ban users from your website with FingerprintJS](/img/uploads/ban-from-website.png "Permanently ban users from your website with FingerprintJS")

While having user-generated content is a great way to add interactivity and community to your website, it unfortunately leaves you open to abuse from malicious users. Nudity, harassment, spam, advertising, or even malware and viruses are just some of the unwanted content you may have to deal with. Sometimes, measures like content moderation and warnings can help keep your users in line. But in many cases, these offenders are aggressive and cunning with their approach, and you’ll have to take the extreme step of permanently banning them.

In order to permanently ban a user, you’ll need to make sure they have a unique identifier. In this article, we’ll compare six methods through which you can block specific users from accessing your website content via various unique identifiers — including [FingerprintJS](http://fingerprintjs.com/), an easy solution for comprehensive user identification. 

## 1. IP Address Ban

One way to block users from having the ability to visit your site is to simply ban their IP addresses. Depending on your forum or commenting host, like [WordPress](https://securityboulevard.com/2020/06/how-to-block-ip-addresses-to-protect-your-wordpress-site/) or [Disqus](https://help.disqus.com/en/articles/1717166-using-the-ban-user-and-trust-user-controls), you’ll be able to locate the IP address of a user from the admin dashboard or server logs. For other platforms, simply run a browser search for *how to find IP address on \[your platform]*. 

![How to locate the IP address of a user in WordPress via the comments, via wpbeginner](/img/uploads/xrzswwb.png)

After you’ve tracked down the IP addresses of the malicious users you’d like to block, there are several ways to implement the block. Again, depending on your hosting provider or content management system, you can either block the IP address via their platform, [cPanel](https://www.tutorialspoint.com/cpanel/cpanel_ip_blocker.htm), or even manually [using your `.htaccess` file](https://htaccessbook.com/block-ip-address/).

The main limitation of an IP address ban is that it is only a temporary solution and can easily be circumvented. Persistent spammers can easily change their IP address by switching to a different ISP, using different devices, or using a proxy or VPN to regain access to your site. 

Another shortcoming of the IP ban method is that because IP addresses are temporary and can be reassigned, you might ban IP addresses that can be reassigned to legitimate users of your site.

## 2. Using Cookies

If you run a dynamic user personalized site, you’re most likely already using cookies to preserve states between sessions or to store user preferences for customization. Cookies are lightweight text files that are usually set by the server and stored on the target user’s browser to uniquely identify a particular user and their browser. They contain information like account usernames and emails, alongside a randomly generated unique ID.

To ban specific users from your site using cookies, you can either set a flag identifier cookie or add the unique cookie ID of offending users to a list. Then, on page request, check if the cookie in the request header sent by the browser is flagged or on the banned list. You can then deny access appropriately. 

Suppose you’re dealing with a Node.js-based app. You’d do something like:

```
   app.get('/blog', (req, res)=>{ 
   if(req.cookies.flag === 1){
       res.status(401).send()
   }
   res.status(200).json({data: 'Welcome to the blog'})
});
request.cookies
```

While the cookie method is more effective than the IP ban method, it’s not foolproof either. Tech-savvy malicious users can easily go to their browser settings and delete cookies from your website, use ad blockers to disable cookies by default, or revoke consent to being cookied, thus once again regaining access to your site.

## 3. Ban Specific Usernames or Email Addresses

Another property that can be used to uniquely identify users is their registered email address or username. If you notice that a user has been posting spammy or harmful content, you can simply block the user’s email address or username. This means that they won't be able to log in to your website, and it will also prevent them from creating a new account using the same email address.

Just like with the IP ban method, if you’re using WordPress, Disqus, or any other content management system, there may already be options for this via the admin dashboard.

You can also do this manually by flagging offending usernames and email addresses in the database with a disabled field of 1. Then on the login page or sign-up form, you can check if the target username and email address exists, and if it has been marked as banned. If so, you can show an error message and refuse access to the site. Something like this:

```
function is_user_banned($email_address){
  return mysql_result(
      mysql_query(
        "SELECT COUNT ('user_id') FROM 'users' where 'email_address = $email_address and is_banned = 1"
      )
  )
}

function login($username, $email_address, $password){
  if (is_user_banned(email_address) == true){
      //show error message and deny access
  }
}
```

Again, the major limitation to this method is that a persistent user can simply go ahead and create a new account using a different email address and username. 

## 4. Ban Email Domains

As well as banning specific email addresses (`fred.george@gmail.com`), you can also ban an entire email domain (`gmail.com`). Why would you want to do this? Because spammers often resort to using disposable email address domains to create accounts.

A disposable or temporary email domain is a service that allows users to receive email at a temporary address that self-destructs after a predetermined period of time. Examples include `10minutemail.co.za`, `10minutemail.com`, `10mail.org`, and `tempmail.com`. Banning these disposable domains helps ensure that users have to sign up with a legitimate email address.

If your site is hosted on WordPress, [following this process to block disposable email addresses](https://www.wpbeginner.com/plugins/how-to-block-disposable-email-addresses-in-wordpress/). For others, you can simply include this as an email validation check for your sign-up and login forms. Here’s a [list of disposable email domains](https://gist.github.com/michenriksen/8710649) you can start with.

![How to ban email domains using the Ban Hammer plugin- Image via wpbeginner.com](/img/uploads/qzpuflm.png "How to ban email domains using the Ban Hammer plugin")

The downside of this method is that you may end up blocking access for genuine users who use disposable email addresses to sign up for forums and online communities to protect their primary inbox from spam.

## 5. Put User in Stealth Mode (Shadowban)

Unlike previous methods, this method does not explicitly deny or ban the user from accessing your site. Instead it does something very subtle that the user might not even catch on to for some time. 

Putting a user in stealth mode—sometimes referred to as a shadowban or hellban—means to put them in a state where they’re invisible to other users but not to themselves. They can perform normal user or member actions like viewing posts, creating posts, and posting comments, but since they’re invisible to other users, no one else actually sees any of their content. Eventually, stealth mode users may get frustrated due to the lack of attention and leave, and if they’re a spambot account, they might never notice. It’s like the digital version of the “silent treatment.”

Again, if you use WordPress, you can use plugins like [MarkTroll](https://wordpress.org/plugins/marktroll/#description) and [FreeBan](https://downloadfreewpplugins.com/wordpress/feenban/). With Disqus, you can [mark any user as shadowbanned](https://blog.disqus.com/introducing-shadow-banning-and-timeouts) from the admin dashboard.

![The WordPress MarkTroll plugin](https://i.imgur.com/JU90J5K.png "The WordPress MarkTroll plugin")

The stealth mode method is very effective and stalls problematic users for a long time, even though they may eventually catch on and discover that something is wrong. Also, a problematic user who does eventually discover they are shadowbanned can simply create a new account and continue their activities.

## 6. FingerprintJS

![FingerprintJS](https://i.imgur.com/CiCEyYz.png "FingerprintJS")

[FingerprintJS](https://fingerprintjs.com/) is a browser fingerprinting API as a service platform that can be used to uniquely identify users.

Browser fingerprinting is a tracking method that uses JavaScript scripts to collect information that can identify a user. These scripts run in the background, aggregating unique information about the user’s device and browser, such as:

* Operating system
* Browser
* Installed software
* Timezone
* Preferred language
* Ad blockers
* Screen resolution
* Color depth
* Browser extensions
* Graphics card
* Drivers
* CPU

When you stitch all of these pieces together, you create a unique online “fingerprint” for a user that can trace them across different websites and browsing sessions.

Fingerprinting is by far the most accurate user identification method (FinerprintJS Pro has a [success rate of up to 99.5 percent](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy)). While a user can delete cookies, there’s no way to delete a browser fingerprint, and it works in incognito mode, behind a VPN or proxy server, and across multiple browsers.

Like a number of JavaScript libraries, FingerprintJS is easy to use and has extensive [documentation](https://dev.fingerprintjs.com/docs). To get started, either install via NPM, yarn, or use a CDN:

```
npm i @fingerprintjs/fingerprintjs
# or
yarn add @fingerprintjs/fingerprintjs
```

Then import it and invoke it on page load:

```
import FingerprintJS from '@fingerprintjs/fingerprintjs';

(async () => {
  // We recommend to call `load` at application startup.
  const fp = await FingerprintJS.load();

  // The FingerprintJS agent is ready.
  // Get a visitor identifier when you'd like to.
  const result = await fp.get();

  // This is the visitor identifier:
  const visitorId = result.visitorId;
  console.log(visitorId);
})();
```

The script above should preferably be included in the root folder of all the JS files like `index.js`.

When you add a user’s unique visitor ID to a ban list with FingerprintJS, it’s difficult for them to circumvent it unless they frequently switch devices. FingerprintJS Pro is a free service for up to 1,000 unique visitor identifications per month - you can [sign up](https://dashboard.fingerprintjs.com/signup/) with no credit card required. 

## Conclusion

There will always be problematic users. To be able to create civil and safer online communities for everyone, such users need to be banned. 

There are many common methods for banning users, but ultimately they all have shortcomings and can be circumvented by persistent actors. To truly permanently ban a malicious actor, consider using a robust user identification solution like [FingerprintJS](https://fingerprintjs.com/).