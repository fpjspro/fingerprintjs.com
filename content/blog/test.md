---
templateKey: long-form-content
metadata:
  title: Test
  description: Test Mini Apps
  url: https://fingerprintjs.com/blog/test-mini-apps
  image: /img/uploads/cat.jpg
featured: false
publishDate: 2021-03-10T14:48:54.789Z
title: Mini Apps Test Blog
tags:
  - fingerprinting
---
## Images:

![](/img/uploads/sinewave.jpg)

It’s also possible to generate other types of waves, such as square, sawtooth, and triangle.

![](/img/uploads/square.jpg)

![](/img/uploads/triangle.jpg)

## Demo:

iframe height="500px" width= "100%" scrolling="no"

<iframe height="500px" width= "110%" scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=difference" frameborder="no"> 
</iframe>

## Quotes:

> Farbling is Brave’s term for slightly randomizing the output of semi-identifying browser features, in a way that’s difficult for websites to detect, but doesn’t break benign, user-serving websites. These “farbled” values are deterministically generated using a per-session, per-eTLD+1 seed2 so that a site will get the exact same value each time it tries to fingerprint within the same session, but that different sites will get different values, and the same site will get different values on the next session. This technique has its roots in prior privacy research, including the PriVaricator (Nikiforakis et al, WWW 2015) and FPRandom (Laperdrix et al, ESSoS 2017) projects.

## Code:

Here is how the implementation can look like:

```javascript
async function getFudgeFactor() {
  const context = new AudioContext(1, 1, 44100)
  const inputBuffer = context.createBuffer(1, 1, 44100)
  inputBuffer.getChannelData(0)[0] = 1

  const inputNode = context.createBufferSource()
  inputNode.buffer = inputBuffer
  inputNode.connect(context.destination)
  inputNode.start()

  // See renderAudio the implementation at 
  // https://gist.github.com/Finesse/92959ce907a5ba7ee5c05542e3f8741b
  const outputBuffer = await renderAudio(context)
  return outputBuffer.getChannelData(0)[0]
}

const [fingerprint, fudgeFactor] = await Promise.all([
  // This function is the fingerprint algorithm
  // described in the “How audio fingerprint is calculated” section
  getFingerprint(),
  getFudgeFactor(),
])
const restoredFingerprint = fingerprint / fudgeFactor
```

## Bullet list:

If I try Safari, I get a different number:

* 79.58850509487092

And also different on Firefox:

* 80.95458510611206

## Monospace:

`AudioContext` represents an entire chain, built from audio nodes linked together. 
It controls the creation of the nodes and execution of the audio processing. You always start by creating an instance of AudioContext before you do anything else. It’s a good practice to create a single AudioContext instance and reuse it for all future processing.

## Tables:

| Device, OS, browser                              | Time to fingerprint |
| ------------------------------------------------ | ------------------- |
| MacBook Pro 2015 (Core i7), macOS 11, Safari 14  | 5 ms                |
| MacBook Pro 2015 (Core i7), macOS 11, Chrome 89  | 7 ms                |
| Acer Chromebook 314, Chrome OS 89                | 7 ms                |
| Pixel 5, Android 11, Chrome 89                   | 7 ms                |
| iPhone SE1, iOS 13, Safari 13                    | 12 ms               |
| Pixel 1, Android 7.1, Chrome 88                  | 17 ms               |
| Galaxy S4, Android 4.4, Chrome 80                | 40 ms               |
| MacBook Pro 2015 (Core i7), macOS 11, Firefox 86 | 50 ms               |