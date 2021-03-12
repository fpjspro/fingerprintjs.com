---
templateKey: long-form-content
metadata:
  title: How to Prevent Card Testing Without Destroying Your Conversions -
    FingerprintJS
  url: https://fingerprintjs.com/blog/stop-card-testing
  image: /img/uploads/ales-nesetril-ex_p4aabxbs-unsplash.jpg
  description: "Credit card testing can be difficult to stop without adding
    additional hurdles to your payment process. Learn what technologies are
    available to protect your site from payment fraud. "
featured: false
publishDate: 2021-03-12T13:35:01.712Z
title: How to Prevent Card Testing Without Destroying Your Payment Conversions
tags:
  - fingerprinting
---
Imagine your online business is suddenly getting tons of new small purchases. As soon as you check each activity, you notice many of these purchases are being declined by the payment processor, and disputes for unauthorized purchases start rolling in. Investigating further, you realize it’s all a sham.


You might try to stay optimistic that these fake purchases will eventually stop, or you may manually block IP addresses associated with the attackers. No matter your next step, you stand to lose money from chargeback and authorization fees and possibly face blacklisting from your payment provider. This nightmare of a scenario isn’t even uncommon, as many unlucky businesses fall prey to these incidents. 


If this has happened to your website, you may have fallen victim to credit card testing fraud.


## What Is Card Testing?


When cybercriminals get their hands on a stolen credit card number, often through purchasing lists of cards on the dark web, the first thing they will do is check if the information they have is valid or not. To do this, they will make small purchases on an unsuspecting merchant’s website. If the transaction goes through, the cybercriminal will know that they can make another large purchase using the same card.


## Card Testing and Microtransactions


Card testing fraud can happen to any website offering online purchases. However, the practice is a primary concern for companies that have small transaction sizes or microtransactions. There are two main reasons why card testing is a problem for these types of businesses:


1. The purchase is less likely to be noticed by the seller or the card owner, and less likely to be flagged by the bank.


Businesses such as online games or mobile games are typical targets since they offer microtransactions that only cost 99 cents to a few dollars, allowing fraudsters to test as many stolen cards they have. Since the purchases are small in value, the real card owner won’t notice a few bucks missing from their account. These trial runs are insignificant enough that even if the transaction gets declined, it won’t raise any major flags. But if they made large noticeable test purchases that keep getting declined, the card would be shut off before they could use it to buy what they wanted.  


2. The purchase has fewer hurdles.


Since microtransactions are small purchases and often intended to be made frequently by customers, the seller often doesn’t ask for additional billing info to verify the cardholder, such as the billing address. Unfortunately, this slight gap is enough for cybercriminals to squeeze through. With fewer hurdles blocking their way, fraudsters won’t usually face any problems making a small purchase to begin card testing.


## What Are the Negative Effects of Card Testing Fraud?


If fraudsters are using stolen cards to purchase on your website, why is it a problem for you? It’s not like you’re the one performing this fraudulent act. Moreover, doesn’t card testing mean you’re earning money from all those test purchases? While this might seem like the case, card testing fraud is dangerous for merchants.


Card testing has several negative aspects that may get worse over time as the cybercriminal carries on with the deceptive practice. Here are some of the adverse effects you can expect if your business suffers from card testing fraud:


Disputes – Card testing, when successful, still spends a person’s hard-earned money, and no cardholder will be happy when they notice their cash going missing. They will report the false purchase to their bank which will lead to disputes that cost you money and time.


Revenue losses – Card testing fraud can lead to chargebacks. For every completed chargeback, your business will lose the revenue for those transactions. It can cause harm and major losses to businesses, especially small companies. Let’s say you’re an indie artist who recently started selling acrylic charms on your website. If it costs you $90 to make 100 charms and you sell each for $3, you’ll get a profit of $210. However, if fraudsters buy all those charms and the real card owners initiate a chargeback, you will lose both the $210 profit and the $90 you spent on making those charms.


* **Additional fees and penalties** – Chargebacks aren’t mere refunds. If a card owner files for a chargeback, the issuing bank will handle the process. Their bank system, employees, and more will be involved in managing the chargeback service. As such, the issuing bank will pass some of the cost to the merchant. You’ll have to pay additional fees and penalties such as an authorization fee. If a cybercriminal purchased $100 worth of goods on your website and a card networked issued $200 for the chargeback, you just lost $100 more than the sale price.


Blacklisted by payment providers – If your website falls prey to card testing, you might become blacklisted from payment providers. Your business will be associated with a large number of declines which could damage your reputation with card networks and issuers.
Disrupt legitimate transactions – This deceptive practice may spike your website traffic which can affect legitimate activity. And even after the card testing fraud stops, card issuers might see all your transactions as risky, leading to a higher decline rate for legitimate payments.  


When companies struggle with card testing, they have a tough decision between keeping their transaction process simpler and facing those adverse effects listed above. You could require additional information for purchases but could end up losing more paying customers due to increased friction in the payment process. Payment fraud prevention is a delicate balance between offering comfort and convenience and keeping customers safe.


## Methods to Reduce Card Testing


If you notice card testers exploiting your business, you need to stop or reduce this fraudulent act as soon as possible. A few modifications to your internal systems and payment processes can go a long way to screen attempts at card testing. Here are some of the methods to follow for payment fraud prevention.


### IP address blocking


Fraudsters usually acquire the stolen card number from the dark web. That means the card testing attempt often happens outside a cardholder’s original country, making it useful to cross-check a credit card’s issuing location and the purchaser’s geolocation via IP. Website owners can also monitor returning IP addresses and block payment attempts if multiple orders from a specific IP happens within a short time frame. However, with VPNs and other IP address spoofing techniques, this one-size-fits-all technique can miss more sophisticated card testers.


### Browser fingerprinting


Browser or device fingerprinting combines dozens of available signals collected from a visitor’s browser to generate a unique ID, or fingerprint. Browser fingerprinting can be a useful tool in addition to IP address tracking in determining if a fraudster is returning to make multiple transactions on different credit cards, or has been previously associated with fraudulent activity. A user’s fingerprint is unique, making fraudulent requests and operations stand out.


### Cookies


Cookies are another way that websites can separate trusted users from fraudsters. New visitors without a cookie can be asked for additional information on payment, while trusted traffic can be given a more streamlined payment process. However, cookies on their own are unlikely to catch repeat behavior from card testers, as cybercriminals usually clear their cookies 90 percent of the time. 

### FingerprintJS Pro API


Using an external service like FingerprintJS is a good strategy for payment fraud prevention. FingerprintJS uses multiple identification techniques including browser fingerprinting, cookies, IP, as well as other server-side techniques. VisitorIDs generated by FingerprintJS are 99.5% percent accurate at identifying users across sessions and spoofing attempts, making it possible to catch fraudsters no matter how they try to hide.


## How to Use FingerprintJS to Prevent Card Testing


FingerprintJS provides a solution to identify fraudsters and prevent them from doing test purchases on your website without destroying your payment conversion. 


Want to try FingerprintJS for payment fraud prevention? Here is how you can get started:


* Sign up for a free trial on our website

* Install our Javascript snippet to start collecting visitorIDs for every guest that comes to your site.
* When a visitor attempts to make multiple purchases in a short time or with different credit cards, you can flag their account. You can also require additional verification to continue or fully block that visitor from making further purchases.

* Anytime a flagged or suspicious visitorID is identified returning to the site, you can require additional verification for future purchases.


Card testing fraud is a stressful and traumatizing experience that no business should undergo. It results in adverse effects that could harm your company. If you’re struggling with fraudsters and card testing, consider using FingerprintJS to mitigate or prevent it from happening. 
