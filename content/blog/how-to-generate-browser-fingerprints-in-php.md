---
templateKey: long-form-content
metadata:
  title: Browser Fingerprinting in PHP - FingerprintJS
  description: Learn how to generate browser fingerprints for your PHP application
    using a free browser fingerprinting service.
  url: https://fingerprintjs.com/blog/browser-fingerprint-php
  image: /img/uploads/browser-fingerprints-in-php-1-.png
  imageAlt: browser fingerprinting using PHP
  imageTitle: browser fingerprinting using PHP
featured: true
publishDate: 2021-06-25T02:30:08.525Z
title: How to Generate Browser Fingerprints in PHP
tags:
  - fingerprinting
authors:
  - Aniket Bhattacharyea
---
![](/img/uploads/browser-fingerprints-in-php-1-.png)

Almost every web developer has to combat fraud at some point. Attacks might include malicious users trying to brute force passwords, place fraudulent orders, initiate bot attacks, or bypass your site’s paywall.

Traditional methods of tracking users in PHP often fall short when trying to prevent fraud. This is where [browser fingerprinting comes in](https://fingerprintjs.com/blog/what-is-browser-fingerprinting/). Fingerprinting is a technique that generates a highly accurate identifier that can uniquely identify someone based on their browser and device settings.

## Why Browser Fingerprinting?

Browser fingerprinting has a number of useful applications — from helping block malicious users to fighting bank fraud:

* **Combating Malicious Users** - Browser fingerprints can be used to identify when a user trying to register is a bot rather than a real person. Fingerprints can also help detect when a legitimate account is being used by a malicious user.
* **Preventing Financial Fraud** - You can use fingerprints to detect and stop malicious users from testing stolen credit cards by making many small purchases on your site from different credit cards.
* **Enforcing paywalls** - Sometimes, tech-savvy readers use incognito mode or delete their cookies to bypass paywalls and access restricted content. Using browser fingerprints, you can catch users bypassing your paywall to make sure your business isn’t losing revenue.

## Browser Fingerprinting in PHP

Suppose you are running a streaming site that offers a 14-day free trial to new users. This might be a nice way to let people try your service before they buy, but a malicious user can repeatedly register with different email addresses to take advantage of your trial offer.

Unfortunately, PHP is exclusively a server-side programming language, so you can’t implement browser fingerprinting in PHP alone. But, by implementing FingerprintJS on your frontend, you can easily add fingerprinting to prevent the same user from registering in your application with multiple email addresses.

In this tutorial, I’ll show you how to use [FingerprintJS](https://fingerprintjs.com/) to generate browser fingerprints for your PHP application. I’ll contrast fingerprinting with several traditional PHP-only ways to track users (session tracking, HTTP cookies, and IP address tracking) so you understand why fingerprinting is a more reliable solution in most use cases.

### Project Setup

To follow along with this tutorial, you will need to have [PHP](https://www.php.net/manual/en/install.php) and [SQLite3](https://www.sqlite.org/download.html) installed on your system. You can find the finished code for this tutorial on [Github](https://github.com/heraldofsolace/FingerprintJS-PHP) with the files for the initial project setup in the `./original` directory.

Once you have the dependencies ready, create a file called `register.php`:

```php
<?php
$db = new SQLite3("data.db");

if($_SERVER["REQUEST_METHOD"] == "POST"){

    if(empty($_POST['email'])) {
        die("Email is required");
    } else if(empty($_POST['password'])) {
        die("Password is required");
    } else {
       $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
       $stmt -> bindValue(1, $_POST["email"], SQLITE3_TEXT);
       $res = $stmt->execute();

       if(($res->fetchArray())[0]) {
           die("Email already exists");
       } else {
           $insert_stmt = $db->prepare("INSERT INTO users(email, password, visitorId) VALUES(?, ?, ?)");
           $insert_stmt -> bindValue(1, $_POST["email"], SQLITE3_TEXT);
           $insert_stmt -> bindValue(2, password_hash($_POST["password"], PASSWORD_BCRYPT), SQLITE3_TEXT);
           $insert_stmt -> bindValue(3, $_POST["visitorId"], SQLITE3_TEXT);
           $res = $insert_stmt->execute();

           if($res) {
               header('Location: dashboard.html');
           } else {
               die("An error occurred");
           }
       }


    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div class="flex h-screen bg-blue-700">
        <div class="max-w-lg m-auto bg-blue-100 rounded p-5">   
            <h2 class="text-xl">Sign Up</h2>
            <p class="text-sm">Please fill this form to create an account.</p>
            <form class="p-3" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                <div class="form-group">
                    <label class="block mb-2 text-blue-500">Email</label>
                    <input 
                    class="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300" 
                    type="text" name="email">

                </div>    
                <div class="form-group">
                    <label class="block mb-2 text-blue-500">Password</label>
                    <input class="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300" type="password" name="password">
                </div>
              
                <div class="form-group">
                    <input class="w-full bg-blue-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Submit">
            
                </div>
                
            </form>
            <footer>
                <a class="text-blue-700 hover:text-pink-700 text-sm float-left" href="#">Log In</a>
            </footer> 
        </div>
        
    </div>    
</body>
</html>
```

This simple registration form uses SQLite as its database and TailWind CSS so that it looks presentable.

Next, create a file called `dashboard.html` in the same folder:

```html
<!DOCTYPE html>
<html>
 <head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div class="flex h-screen items-center justify-center bg-blue-700">
        <h1 class="text-6xl text-white">Welcome, user</h1>
    </div>
</body>
</html>
```

This is a simple HTML page that will be shown after a successful registration.

Finally, create the database using SQLite:

```bash
sqlite3 data.db
```

This will create a file called `data.db` and provide you with a `sqlite` prompt. Run the following query in the prompt to create a `users` table with an id, email, and password field:

```sql
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
);
```

Finally, press `CTRL-D` to exit the `sqlite` prompt.

You are now ready to test user registration. Start the PHP server on port 8000.

```bash
php -S localhost:8000
```

Now, open your browser and navigate to `http://localhost:8000/register.php`. You should see a screen like this:

![Screenshot showing the register screen](https://i.imgur.com/YiLYs9K.jpg)

Try registering a user with some email and password. Once successfully registered, you should be redirected to the dashboard.

![Screenshot showing the dashboard page](https://i.imgur.com/kMBHZ9V.jpg)

Come back to the `register.php` page again and try registering again *with a different email*. You will see that the app allows you to re-register.

In the next section, I’ll show you how to prevent re-registration using browser fingerprinting integrated with your PHP application. Before you continue, be sure to wipe your database clean to prevent any conflicts.

### Using FingerprintJS

[FingerprintJS](https://fingerprintjs.com) is a fingerprinting service that uses a combination of fingerprinting, cookies, server-side techniques, and machine learning to generate a browser fingerprint that is up to [99.5% accurate](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy). 

To get started with FingerprintJS, you will need a [FingerprintJS pro account](https://dashboard.fingerprintjs.com/signup). If you do not have an account, you can start a trial without usage limits for 30 days.

Once you have an account, visit your [dashboard](https://dashboard.fingerprintjs.com/) and select the subscription that you created while registering. Head to the `Tokens` section from the left sidebar and copy the active **browser** token.

![List of active tokens in the dashboard](https://i.imgur.com/O3KXMrf.png)

After you have the token, install the JavaScript agent. This JavaScript agent will run in the browser, so you do not need a backend PHP component to generate the fingerprint. The required snippet can either be downloaded from a CDN (content delivery network) or installed through NPM. In this example, I’ll use a CDN.

Inside your PHP application’s HTML, add the following to your `<head>` tag:

```html
<script
  async
  src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

This snippet downloads the required JavaScript file and runs the `initFingerprintJS()` function. Let's create the function (before the previous `<script>` tag):

```html
<script>
  function initFingerprintJS() {
    FingerprintJS.load({token: '<YOUR_TOKEN_HERE>'})
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId));
  }
</script>
```

**Note that you need to replace `<YOUR_TOKEN_HERE>` with the actual token you copied from your dashboard.**

This function calls the FingerprintJS service to create a `visitorID` and prints it to the console. You can reload the registration page to see an alphanumeric hash in your JavaScript console.

![Screenshot showing the visitorID printed to the console](https://i.imgur.com/i2Aup0o.jpg)

Now that you have a unique visitor ID, you can send this with every request and store it in your database after registration.

First, create a new column called `visitorId` on the `users` table:

```sql
ALTER TABLE users ADD COLUMN visitorId TEXT;
```

Add the generated `visitorId` to the form as a `hidden` field:

```html
<input name="visitorId" id="visitorId" value="" hidden>
```

And change the `initFingerprintJS()` function to set the value of the field:

```html
<script>
  function initFingerprintJS() {
    FingerprintJS.load({token: '<YOUR_TOKEN_HERE>'})
      .then(fp => fp.get())
      .then(result => {
          document.getElementById('visitorId').value = result.visitorId
      });
          
  }
</script>
```

Now the `visitorId` needs to be saved in the database. Just like you did in the IP tracking part, modify the code so that the `visitorId` is saved:

```php
$insert_stmt = $db->prepare("INSERT INTO users(email, password, visitorId) VALUES(?, ?, ?)");
$insert_stmt -> bindValue(1, $_POST["email"], SQLITE3_TEXT);
$insert_stmt -> bindValue(2, password_hash($_POST["password"], PASSWORD_BCRYPT), SQLITE3_TEXT);
$insert_stmt -> bindValue(3, $_POST['visitorId'], SQLITE3_TEXT);
```

Finally, you need to check if a user with the same `visitorId` already exists and show an error message accordingly:

```php
...
if($_SERVER["REQUEST_METHOD"] == "POST"){

    $ip_stmt = $db->prepare("SELECT * FROM users WHERE visitorId = ?");
    $ip_stmt->bindValue(1, $_POST['visitorId'], SQLITE3_TEXT);
    $res = $ip_stmt->execute();

    if(($res->fetchArray())[0]) {
        die("Looks like you are already registered. Please log in");
    }
    ...
}
```

You can test FingerprintJS by registering a user and trying to register another user. Using your FingerprintJS fingerprint, you will see the error message even if you use incognito mode, restart your browser, or disable cookies.

*You can find all the above code for using FingerprintJS inside the `fingerprintjs` directory in [this GitHub repository](https://github.com/heraldofsolace/FingerprintJS-PHP).*

## Advantages of FingerprintJS

There are quite a few advantages of using FingerprintJS over rolling out your own fingerprinting solution. First, FingerprintJS is easy to use - you just need to include a JavaScript snippet, and the rest is handled by FingerprintJS. This is much faster than writing your own fingerprinting function in PHP.

FingerprintJS is also kept up-to-date with browser updates and modern fingerprinting best practices. This means you do not need to worry about your fingerprinting technique breaking when browsers are updated.

FingerprintJS is also much more accurate than any of the traditional methods of user tracking in PHP.

### Fingerprinting vs. Session Tracking

One common tracking method in PHP is called [session tracking](https://docstore.mik.ua/orelly/webprog/pcook/ch08_06.htm). A session allows the server to store information about the current user and make it available across multiple pages in order to maintain state.

The problem with session tracking is that it’s tied to a session ID stored in the user’s browser (usually in a cookie). If you open an incognito window and try to register, you will not be stopped, even if you have a session in your other browser window. Users can open as many incognito windows as they want, and each of them will have a separate session in your application.

Additionally, sessions are not permanent. Once the browser is closed, the session data is deleted. This means that users can just restart their browser and register again.

*If you’d like to demonstrate this behavior and compare it to the fingerprint example above, see the code inside the `session` directory in [this GitHub repository](https://github.com/heraldofsolace/FingerprintJS-PHP).*

### Fingerprinting vs. HTTP Cookies

An [HTTP Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) is a small piece of data that the server sends to the user's browsers. Cookies are stored on the client and are sent back when making requests to the same server later.

Thus, a server can store information about the user in cookies - much like sessions - but the important advantage of cookies over sessions is that **they're not cleared when the browser is closed.**

Just like in session tracking, cookies will not work as intended in incognito mode, since in incognito mode, cookies are not saved. This means that a user can register as many times as they want simply by opening new incognito windows.

Also, cookies are not permanent and can be cleared by the user or by the browser. For example, most major browsers provide an option to clear cookies automatically when the browser is closed. Finally, cookies can be [blocked by the browser entirely](https://proprivacy.com/ruinmysearchhistory/how-to-block-cookies).

*You can find a code sample using HTTP cookies inside the `cookie` directory in this [GitHub](https://github.com/heraldofsolace/FingerprintJS-PHP) repo.*

### Fingerprinting vs. IP Tracking

An [IP or Internet Protocol address](https://en.wikipedia.org/wiki/IP_address) is similar to a street address for your computer: it is a numerical label that is assigned to a device whenever it connects to a network. By storing the IP address of a user when they register, you can tell when the same device tries to make another registration. This means that you can use IP tracking to block the same user accessing your site from incognito mode or different browsers.

Unfortunately, an IP address can be easily spoofed. Users can set them manually when browsing, even if they're not using a proxy server. IP address tracking can also be inaccurate because different devices can have the same IP address when they share the same router. For example, in a university or organization network, multiple devices often share the same IP address.

*You can find a code sample using IP tracking inside the directory `ip` in the [GitHub repository here](https://github.com/heraldofsolace/FingerprintJS-PHP).*

## Conclusion

In this tutorial, you learned the utility of browser fingerprinting in PHP and how it can be used to prevent duplicate registrations. While you can increase the accuracy of your tracking in PHP by combining sessions, cookies, and IP tracking, it’s still relatively easy for users to bypass these fraud detection measures.

Using [FingerprintJS](https://fingerprintjs.com/) to quickly and accurately generate a browser fingerprint in PHP will help you combat fraud and save time. With an accuracy of 99.5% and a team keeping up with the latest changes, FingerprintJS is a great solution for saving time and achieving greater accuracy. This allows you to focus on building a great web application and not learning every browser update that changes how you must implement fingerprinting.