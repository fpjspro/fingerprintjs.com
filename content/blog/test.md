---
templateKey: long-form-content
metadata:
  title: Test
  description: Test Mini Apps
  url: https://fingerprintjs.com/blog/test-mini-apps
  image: /img/uploads/fpjs_cover2.png
featured: false
publishDate: 2021-03-10T14:48:54.789Z
title: Mini Apps Test Blog
tags:
  - fingerprinting
---
## Link:

<a href="https://www.google.com" target="_blank" rel="noopener"><span>google using anchor tag</span> </a>

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

<tt>AudioContext</tt> / `AudioContext` represents an entire chain, built from audio nodes linked together. 
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

Unfortunately, floating point operations lack the required precision to get the original samples exactly. The table below shows restored audio fingerprint in different cases and shows how close they are to the original values:

| OS, browser                                  | Fingerprint                                                                                                                                                  | Absolute difference between the target fingerprint |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| macOS 11, Chrome 89 (the target fingerprint) | 1.240.434.806.260.740                                                                                                                                        | n/a                                                |
| macOS 11, Brave 1.21 (same device and OS)    | Various fingerprints after browser restarts:<br />12.404.347.912.294.400<br />1.240.434.832.855.700<br />12.404.347.889.351.200<br />12.404.348.024.313.600  | 0.00000014% – 0.00000214%                          |
| Windows 10, Chrome 89                        | 12.404.347.527.516.000                                                                                                                                       | 0.00000431%                                        |
| Windows 10, Brave 1.21                       | Various fingerprints after browser restarts:<br />12.404.347.610.535.500<br />12.404.347.187.270.700<br />12.404.347.220.244.100<br />12.404.347.384.813.700 | 0.00000364% – 0.00000679%                          |
| Android 11, Chrome 89                        | 12.408.075.528.279.000                                                                                                                                       | 0.03%                                              |
| Android 9, Chrome 89                         | 12.408.074.500.028.300                                                                                                                                       | 0.03%                                              |
| ChromeOS 89                                  | 12.404.347.721.464                                                                                                                                           | 0.00000275%                                        |
| macOS 11, Safari 14                          | 3.510.893.232.002.850                                                                                                                                        | 71.7%                                              |
| macOS 11, Firefox 86                         | 357.383.295.930.922                                                                                                                                          | 71.2%                                              |