---
templateKey: long-form-content
metadata:
  title: How Does Canvas Fingerprinting Work - FingerprintJS
  url: https://fingerprintjs.com/blog/canvas-fingerprinting
  image: /img/uploads/canvas-fingerprinting.png
  description: Canvas fingerprinting is one of the most popular techniques used in
    browser fingerprinting. We'll show you how it can be used to identify
    anonymous traffic and show you how to implement it yourself.
  imageAlt: Canvas fingerprinting
  imageTitle: Canvas fingerprinting
featured: true
publishDate: 2021-06-11T02:38:04.814Z
title: How Does Canvas Fingerprinting Work?
tags:
  - fingerprinting
authors:
  - James Konik
---
![Canvas fingerprinting](/img/uploads/canvas-fingerprinting.png "Canvas fingerprinting")

Identifying users on your website has many uses. From tracking engagement to preventing fraud, knowing how users interact with your application is a powerful tool for developers and businesses.

But, many users don’t want to be identified. Some are concerned with privacy and the spread of their data online, and others are trying to commit fraud, gain control of other users’ accounts, or steal data from your website. These users might take steps like disabling their cookies, anonymizing their IP addresses, or using browser plugins to prevent tracking measures.

While respecting your users’ privacy is the right thing to do, you cannot turn a blind eye to malicious users. So, web developers have had to get creative when it comes to identification online.

## What is Canvas Fingerprinting?

Browsers have a lot of information that might seem trivial but can be used to create a fingerprint to identify people with a high degree of accuracy. This is called a [browser fingerprint](https://fingerprintjs.com/blog/browser-fingerprinting-techniques/), and statistics show that if you put this information together, your browser fingerprint will only match [1 in 286,777](https://pixelprivacy.com/resources/browser-fingerprinting/) others.

Canvas fingerprinting is a specific kind of browser fingerprinting. In HTML5, drawing operations can render differently depending on your computer’s software and hardware characteristics. So, you can run JavaScript code that can render an image and use it to make a unique fingerprint.

Data [suggests over 5%](https://securehomes.esat.kuleuven.be/~gacar/persistent/index.html) of the web’s most popular sites use canvas fingerprinting, so the technique is not unusual.

## Use Cases for Canvas Fingerprinting

Understanding and tracking your users can be helpful for several reasons:

### Preventing Abuse

A key reason is to prevent abuse. Identifying computers associated with spam or malicious activity makes it harder for them to cause problems. You can block potential bad actors or limit their access to your site.

Abuse could be anything from a user creating multiple accounts on a site where it isn’t allowed, repeatedly trying different passwords, or attempting multiple verification codes for a stolen credit card.

### Secure User Accounts

You can also use fingerprints to identify legitimate users. If a user’s fingerprint is identical, or at least similar from session to session, you can be reasonably confident the user is legitimate. If you detect a change, you can take steps to verify their identity. This could take the form of an email confirmation, a captcha, or contacting them via a device if two-factor authentication is available.

You can also detect people accessing your site repeatedly to make sure paywall and rate limits are respected. Gaming or e-commerce sites can use fingerprints to help confirm users are who they say they are.

### Site Personalization

Like cookies, fingerprints can be used to identify users and give them content that their previous behavior suggests they will like. This could mean showing them ads for products or services they have expressed an interest in before. With the [phase out of third-party cookies](https://blog.hubspot.com/marketing/third-party-cookie-phase-out), fingerprinting is an even more useful tool now.

This article will show you how canvas fingerprinting works and how you can use it to enhance your site’s user identification and security. You’ll see how fingerprints are generated, learn what they look like. Finally, I’ll show you how to create one yourself in JavaScript.

## Deconstructing a Canvas Fingerprint

The HTML5 canvas lets developers perform drawing operations on a rectangular area of the screen. Different systems handle these operations differently, and those [differences between systems](https://www.andreafortuna.org/2017/11/06/what-is-canvas-fingerprinting-and-how-the-companies-use-it-to-track-you-online/) can stack up.

Browser-based differences have long been the bane of web developers, with teams spending hours trying to identify and eliminate them. In this case, however, you can exploit them. Using the variability of operations between systems, you can generate unique images regardless of the user’s IP address, headers, cookie settings, or other potentially identifying information.

For example, one of the key ways that browsers differ is in [font rendering](https://multilogin.com/everything-you-need-to-know-about-canvas-fingerprinting/). Anti-aliasing, hinting, and font availability can all produce different results depending on your operating system, hardware, and settings.

Differences in GPU or [graphics drivers](https://eric-diehl.com/fingerprinting-canvas-of-browser/) can further differentiate image output. Drawing background colors and shapes on top of text can help highlight these differences.

This is why many canvas fingerprints use a string of text that uses all the letters of the alphabet (such as “Cwm fjordbank glyphs vext quiz”) with an image overlaid. If you check [this link](https://browserleaks.com/canvas#how-does-it-work), you can see an animated GIF showing how this canvas output varies across browsers.

The output from a canvas fingerprint is then used to generate a [hash code](https://github.com/artem0/canvas-fingerprinting), which can be stored to identify the user. Though the hash is unique, the same browser should come up with the same one each time.

## How to Generate a Canvas Fingerprint

There are several methods for generating a canvas fingerprint, but the basic idea is to draw a blank rectangle and then apply various operations, such as colored lines, overlays, and anti-aliasing filters.

Drawing shapes in HTML with different fill styles can also produce differences, particularly around the edges or where they intersect.

For further variety, you can use other characters, like those from Asian fonts, or accented European vowels. That way, you’ll differentiate between systems that can and can’t show them and expose differences in font renderers.

Making the code generate a unique hash [is a challenge](https://stackoverflow.com/questions/25508970/canvas-fingerprinting-on-chrome), and it’s not easy to confirm how well your code does this. That’s why using an established library like [FingerprintJS](https://fingerprintjs.com/) can make generating canvas fingerprints much easier.

## Canvas Fingerprinting Examples

If you decide to generate your own canvas fingerprint, you’ll need to write JavaScript as you want the canvas operations to run in your user’s browser.

The following code will generate a canvas fingerprint:

```html
<b>Hash:</b> <span id='hash-code'></span><br>
<canvas id='myCanvas' width='200' height='40' style='border:1px solid #000000;'></canvas>
<script>
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(255,0,255)";
ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.fill();
ctx.stroke();
ctx.closePath();
ctx.beginPath();
ctx.fillStyle = "rgb(0,255,255)";
ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
ctx.fill();
ctx.stroke();   
ctx.closePath();

txt = 'abz190#$%^@£éú';
ctx.textBaseline = "top";
ctx.font = '17px "Arial 17"';
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "rgb(255,5,5)";
ctx.rotate(.03);
ctx.fillText(txt, 4, 17);
ctx.fillStyle = "rgb(155,255,5)";
ctx.shadowBlur=8;
ctx.shadowColor="red";
ctx.fillRect(20,12,100,5);

// hashing function
src = canvas.toDataURL();
hash = 0;

for (i = 0; i < src.length; i++) {
	char = src.charCodeAt(i);
	hash = ((hash<<5)-hash)+char;
	hash = hash & hash;
}

// output this however you want
$('#hash-code').html(hash);

</script>
```

![Output of canvas fingerprint code above, showing text and shapes with various effects and the hash output above it.](https://i.imgur.com/3deuflB.png)

That’s a screenshot generated using the above code. If you run it yourself, you should get a different hash code. You can try testing on similar systems. The closer they are, the tougher the test will be. If you get similar results, try expanding on the code until they differ.

You can vary the above canvas manipulation techniques or repeat them. The more you do, the more variety you’ll introduce and the less likely you’ll get non-unique identifiers.

As you can see in the following examples (from [Codepen](https://codepen.io/jon/pen/rwBbgQ) and [JSFiddle](https://jsfiddle.net/piotrbartnik/dppqhtg3/1/)), canvas fingerprints can produce a wide range of images depending on the method used to generate them:

![Example of a canvas fingerprint](https://i.imgur.com/9VjPNHu.png)

![Example of a canvas fingerprint showing hash number](https://i.imgur.com/v3RIe4y.png)

## Conclusion

Canvas fingerprinting is a useful tool for understanding visitors and keeping your web application secure. It isn’t a perfect solution on its own, but it’s a valuable piece in the ecosystem of tools available.

With the right mix of ingenuity (and JavaScript), you can identify people and monitor their behavior across sessions, flagging suspicious activity to help your team react to threats faster. You can also maintain consistency for returning visitors, serving them content most relevant to them and increasing engagement along the way.

Instead of doing the hard work yourself, [FingerprintJS](https://fingerprintjs.com/) provides an open-source and paid solution for fingerprinting your users. Their service has 99.5% accuracy, and you can try it without usage limits for 30 days.