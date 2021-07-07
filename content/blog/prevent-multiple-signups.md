---
templateKey: long-form-content
metadata:
  title: How to prevent multiple signups with FingerprintJS [Video]
  description: Protect your free trial offer forms from signup abuse. In this
    step-by-step tutorial, catch visitors who have filled out a form previously
    using FingerprintJS Pro.
  url: https://fingerprintjs.com/blog/prevent-multiple-signups-tutorial
  image: /img/uploads/signup-abuse-tutorial.png
  imageAlt: Prevent signup abuse video tutorial
  imageTitle: Prevent signup abuse video tutorial
featured: false
publishDate: 2021-03-16T18:09:51.690Z
title: "How to Prevent Multiple Signups With FingerprintJS Pro "
tags:
  - fingerprinting
authors:
  - Savannah Copland
---
<i>This article is a tutorial where we will build a workflow that prevents signup abuse on a free trial form using the FingerprintJS Pro API. 

For the uninitiated, FingerprintJS Pro is a visitor identification service that uses browser fingerprinting, cookies, server-side techniques and machine learning to generate the most accurate and stable visitorIDs possible. Think of FingerprintJS Pro as a swiss-army knife for developers solving fraud - it makes it easy to identify malicious users so you can build common-sense workflows to manage them.</i>

Imagine that you run an online course platform that offers free 14-day trials. You want to prevent trial users from registering several accounts with multiple emails and extending their trial indefinitely. 

This guide will show you how to do that in a few easy steps with FingerprintJS Pro. 

You can watch the full tutorial on Youtube or read the instructions below. 

<iframe width=100% height=373 src="https://www.youtube.com/embed/jWX9P5_jZn8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Project setup

For this demo we built a small Express.js app with Handlebars templates, but the process is nearly the same for any technology you use in your project.

**To follow along with this tutorial**, you can clone [our Github repository](https://github.com/fingerprintjs/multiple-signup-demo). 

Check out the `initial-project-setup` branch and keep adding to the code as we go. All the instructions for the local environment setup are in the repository’s `README.md` file.

**If you get lost at any point**, you can look at the comparison of two branches [before and after the FingerprintJS Pro integration.](https://github.com/fingerprintjs/multiple-signup-demo/compare/initial-project-setup...fpjs-integration)

## Getting a token

To begin, you’ll need a FingerprintJS Pro subscription. If you don’t have one, you can [start a free trial](https://dashboard.fingerprintjs.com/signup/) with unlimited API requests for the first 30 days.

Once you have an account, open the dashboard and take a look at the Subscription menu on the left side of the window. Click the Tokens label and copy any active browser token. 

![How to get a token in FingerprintJS](/img/uploads/image1.png "How to get a token in FingerprintJS")

## Frontend

You’ll need to install the Javascript agent code to your website in order to identify visitors. You can find the code for the snippet in your dashboard or in our [Quickstart guide](https://dev.fingerprintjs.com/docs/quick-start-guide). 

You can either download the snippet from the CDN or install the NPM package. This tutorial uses the CDN version.

Open the template for your signup page – which is  [views/signup.hbs](https://github.com/fingerprintjs/multiple-signup-demo/compare/initial-project-setup...fpjs-integration#diff-57854b4693d7efc8a7cc138e3429fdb5d5ccd5a8fe927a9c3633ac455f9d7b6f) for this tutorial – and paste the JavaScript snippet to the bottom of the file:

```javascript
<script>
function initFingerprintJS() {
  FingerprintJS.load({
    token: "your-browser-token",
    region: "eu",
  })
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));
}
</script>
<script
  async
  src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

**Note that for `({token:’your-browser-token’})` you will need to enter the alphanumeric token code from your dashboard.** Also, if you look at the main branch, you’ll notice that the token is stored in the `.env` variables and not directly in the code. This is a much more secure way of storing your tokens but if you just want to do some local testing, you can leave it in the code.

Save the page after you’ve installed the snippet, then open your browser’s developer console and load the site. You should see an alphanumeric hash in the console.

![How to find your visitorID in the browser console - part 1](/img/uploads/image2.png "How to find your visitorID in the browser console - part 1")

![How to find your visitorID in the browser console - part 2](/img/uploads/image5.png "How to find your visitorID in the browser console - part 2")

This hash is called a visitorID and it will be identical for the same browser on the same device in private and normal mode every time a user accesses the page.

Now that you’ve received the visitorID you can start sending it to your server along with the signup email.

Open the `signup.hbs` again, go to line 43 and add a line with a hidden form field.

It should look something like this:

```html
<input hidden type="text" id="visitorId" name="visitorId" value="">
```

Then you want to set the visitorID as the value of this field, so go to line 65 of the same file and add this logic to the script:

```javascript
<script>
function initFingerprintJS() {
  FingerprintJS.load({
    token: "your-browser-token",
    region: "eu",
  })
    .then((fp) => fp.get())
    .then((result) => {
      document.getElementById("visitorId").value =
        result.visitorId;
    });
}
</script>
```

And we’re done! That’s it for the frontend.

## Backend

Now you’ll want to process the visitorID on your server. Open [`index.js`](https://github.com/fingerprintjs/multiple-signup-demo/compare/initial-project-setup...fpjs-integration#diff-e727e4bdf3657fd1d798edcd6b099d6e092f8573cba266154583a746bba0f346) on line 41 and add `visitorId` (or whatever you called the name attribute of that hidden form field) to the destructuring of the request body:

```javascript
const {email, visitorId} = req.body
```

Next, you’ll need to store this value in the database in order to be able to check if a user with a visitorID has already signed up. To add a new column to a database table you’ll need to create a migration.

You can call the migration whatever you want, but to be consistent with the initial migration you might want to call it something like `0002_add_visitor_id.sql`.

The database has a table called users, so the migration for adding a column should look like this:

```sql
alter table users add column visitor_id text null;
```

Don’t forget to run the migration after you’ve created it.

Now you can store the visitorID in the database, so you’ll need to add some logic so you can save it. Go back to the insert statement at line 48 in index.js and modify it so that it reads: 

```javascript
const result = await client.query(
  "insert into users(email, visitor_id)values($1, $2) returning *",
  [email, visitorId]
);
```

Finally, you need to check if the visitorID is already in the system, and if so, throw an error. So add this check above the insert statement:

```javascript
const hasVisitorId =
  (
    await client.query(
      "select * from users where visitor_id = $1",
      [visitorId]
    )
  ).rows.length > 0;

if (hasVisitorId) {
  throw new Error(
    "Looks like you already have an account, please sign in"
  );
}
```

That’s it! Now save this and go back to your app.

## Testing

Sign up with an email (you can use any valid email address) and wait for the successful response.

![Screenshot of finished signup project](/img/uploads/image3.png "Screenshot of finished signup project")

Try it again in incognito mode, but this time use a different email. If you’ve done everything correctly, you should see an error message below the email field.

![Screenshot of form validation preventing multiple signups](/img/uploads/image4.png "Screenshot of form validation preventing multiple signups")

And you are all done! 

## Resources

You can find all the code from this tutorial in our [github repository.](https://github.com/fingerprintjs/multiple-signup-demo/blob/fpjs-integration/index.js)
Also there is a video version of this tutorial available [on Youtube.](https://www.youtube.com/watch?v=jWX9P5_jZn8)