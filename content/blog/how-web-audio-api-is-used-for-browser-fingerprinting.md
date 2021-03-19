---
templateKey: long-form-content
metadata:
  title: How the Web Audio API is used for browser fingerprinting
  url: https://fingerprintjs.com/blog/audio-fingerprinting
  image: /img/uploads/fpjs_cover2.png
  description: Audio Fingerprinting is used to uniquely identify visitors without
    cookies. A deep dive into this highly stable browser fingerprinting
    technique.
featured: true
publishDate: 2021-03-18T13:12:29.612Z
title: How the Web Audio API is used for browser fingerprinting
tags:
  - fingerprinting
---
Did you know that you can identify web browsers without using cookies or asking for permissions?\
\
This is known as “browser fingerprinting” and it works by reading browser attributes and combining them together into a single identifier. This identifier is stateless and works well in normal and incognito modes.\
\
***browser fingerprinting image***\
\
When generating a browser identifier, we can read browser attributes directly or use attribute processing techniques first. One of the creative techniques that we’ll discuss today is audio fingerprinting.\
\
Audio fingerprinting is a valuable technique because it is relatively unique and stable.
Its uniqueness comes from the internal complexity and sophistication of the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noopener"><span>Web Audio API</span></a>.
The stability is achieved because the audio source that we’ll use is a sequence of numbers, generated mathematically. Those numbers will later be combined into a single audio fingerprint value.\
\
Before we dive into the technical implementation, we need to understand a few ideas from the Web Audio API and its building blocks.

# A brief overview of the Web Audio API

The Web Audio API is a powerful system for handling audio operations. It is designed to work inside an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext" target="_blank" rel="noopener"><tt>AudioContext</tt></a> by linking together audio nodes and building an audio graph. A single AudioContext can handle multiple types of audio sources that plug into other nodes and form chains of audio processing.\
\
***diagram showing source => node1 => node2 => output***\
\
A source can be an <tt><audio/></tt> element, a stream, or an in-memory source generated mathematically with an <tt>Oscillator</tt>. We’ll be using the oscillator for our purposes and then connecting it to other nodes for additional processing.\
\
Before we dive into the audio fingerprint implementation details, it’s helpful to review all of the building blocks of the API that we’ll be using.

## AudioContext

<tt>AudioContext</tt> represents an entire chain built from audio nodes linked together. 
It controls the creation of the nodes and execution of the audio processing. You always start by creating an instance of AudioContext before you do anything else. It’s a good practice to create a single AudioContext instance and reuse it for all future processing.\
\
AudioContext has a destination property that represents the destination of all audio from that context. \
\
There also exist a special type of AudioContext<tt>:OfflineAudioContext</tt>. The main difference is that it does not render the audio to the device hardware. Instead, it generates the audio as fast as possible and saves it into an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer" target="_blank" rel="noopener"><tt>AudioBuffer</tt></a>. Thus, the destination of the OfflineAudioContext will be an in-memory data structure, while with a regular AudioContext, the destination will be an audio-rendering device.\
\
When creating an instance of OfflineAudioContext, we pass 3 arguments: the number of channels, the total number of samples and a sample rate in samples per second.

```javascript
const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
const context = new AudioContext(1, 5000, 44100)
```

## AudioBuffer

An AudioBuffer represents an audio snippet, stored in memory. It’s designed to hold small snippets. The data is represented internally in Linear PCM with each sample represented by a 32-bit float between -1.0 and 1.0.
It can hold multiple channels, but for our purposes we’ll use only one channel.\
\
***diagram of 32bit numbers in the range between -1.0 to 1.0***

## Oscillator

When working with audio, we always need a source. An <tt>oscillator</tt> is a good candidate, because it generates samples mathematically, as opposed to playing an audio file.
In its simplest form, an oscillator generates a periodic waveform with a specified frequency. \
\
The default shape is a sine wave.

<iframe style ="width: calc(100% + 24px); height: 380px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=oscillator-options" frameborder="no"> 
</iframe>

It’s also possible to generate other types of waves, such as square, sawtooth, and triangle.\
\
The default frequency is 440 Hz, which is a standard A4 note.

## Compressor

The Web Audio API provides a <tt>DynamicsCompressorNode</tt>, which lowers the volume of the loudest parts of the signal and helps prevent distortion or clipping. \
\
<tt>DynamicsCompressorNode</tt> has many interesting properties that we’ll use. These properties will help create more variability between browsers.\
\
<tt>Threshold</tt> - value in decibels above which the compressor will start taking effect.\
<tt>Knee</tt> - value in decibels representing the range above the threshold where the curve smoothly transitions to the compressed portion.\
<tt>Ratio</tt> - amount of input change, in dB, needed for a 1 dB change in the output.
Reduction - float representing the amount of gain reduction currently applied by the compressor to the signal.\
<tt>Attack</tt> - the amount of time, in seconds, required to reduce the gain by 10 dB. This value can be a decimal.\
<tt>Release</tt> - the amount of time, in seconds, required to increase the gain by 10 dB.

<iframe style ="width: calc(100% + 24px); height: 580px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=dynamics-compressor-options" frameborder="no"> 
</iframe>

## How the audio fingerprint is calculated

Now that we have all the concepts we need, we can start working on our audio fingerprinting code.\
\
Safari doesn’t support unprefixed OfflineAudioContext, but does support 
webkitOfflineAudioContext, so we’ll use this method to make it work in Chrome and Safari:

```javascript
const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContex
```

Now we create an AudioContext instance. We’ll use one channel, a 44,100 sample rate and 5,000 samples total, which will make it about 113 ms long.

```javascript
const context = new AudioContext(1, 5000, 44100)
```

Next let’s create a sound source - an Oscillator instance. It will generate a triangular-shaped sound wave that will fluctuate 1,000 times per second (1,000 Hz).

```javascript
const oscillator = context.createOscillator()
oscillator.type = "triangle"
oscillator.frequency.value = 1000
```

Now let’s create a compressor to add more variety and transform the original signal.
Note that the values for all these parameters are arbitrary and are only meant to change the source signal in interesting ways. We could use other values and it would still work.

```javascript
const compressor = context.createDynamicsCompressor()
compressor.threshold.value = -50
compressor.knee.value = 40
compressor.ratio.value = 12
compressor.reduction.value = 20
compressor.attack.value = 0
compressor.release.value = 0.2
```

Let’s connect our nodes together: oscillator to compressor, and compressor to the context destination.

```javascript
oscillator.connect(compressor)
compressor.connect(context.destination);
```

It is time to generate the audio snippet. We’ll use the <tt>oncomplete</tt> event to get the result when it’s ready.

```javascript
oscillator.start()
context.oncomplete = event => {
  // We have only one channel, so we get it by index
  const samples = event.renderedBuffer.getChannelData(0)
};
context.startRendering()
```

<tt>Samples</tt> is an array of floating-point values that represents the uncompressed sound. Now we need to calculate a single value from that array.\
\
Let’s do it by simply summing up a slice of the array values:

```javascript
function calculateHash(samples) {
  let hash = 0
  for (let i = 0; i < samples.length; ++i) {
    hash += Math.abs(samples[i])
  }
  return hash
}

console.log(getHash(samples))
```

Now we are ready to generate the audio fingerprint. When I run it on Chrome on MacOS I get the value:

* **<tt>101.45647543197447</tt>**

That’s all there is to it. Our audio fingerprint is this number!\
\
You can check out a production implementation in our open source browser fingerprinting library.\
\
If I try executing the code in Safari, I get a different number:

* **<tt>79.58850509487092</tt>**

And get another unique result in Firefox:

* **<tt>80.95458510611206</tt>**

Every browser we have on our testing laptops generate a different value. This value is very stable and remains the same in incognito mode.\
\
**This value depends on the underlying hardware and OS, and in your case may be different.**

## Why the audio fingerprint varies by browser

Let’s take a closer look at why the values are different in different browsers. We’ll examine a single oscillation wave in both Chrome and Firefox.\
\
First, let’s reduce the duration of our audio snippet to 1/2000th of a second, which corresponds to a single wave and examine the values that make up that wave.\
\
We need to change our context duration to 23 samples, which roughly corresponds to a <tt>1/2000th</tt> of a second. We’ll also skip the compressor for now and only examine the differences of the unmodified oscillator signal.

```javascript
const context = new AudioContext(1, 23, 44100)
```

Here is how a single triangular oscillation looks in both Chrome and Firefox now:

![](/img/uploads/triangular_oscillation.png)

However the underlying values are different between the two browsers (I’m showing only the first 3 values for simplicity):\
\
`Chrome:`    `[0,0.08988945186138153,0.18264609575271606,0.2712443470954895]`
`Firefox:`   `[0,0.09155717492103577,0.18603470921516418,0.2762767672538757]`\
\
Let’s take a look at this demo to visually see those differences.

<iframe style ="width: calc(100% + 24px); height: 500px; margin-left: -12px; margin-right: -12px; margin-bottom: 3rem"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=difference" frameborder="no"> 
</iframe>

Historically, all major browser engines (Blink, WebKit, and Gecko) based their Web Audio API implementations on code that was originally developed by Google in 2011 and 2012 for the WebKit project.\
\
Examples of Google contributions to the Webkit project include:
<a href="https://github.com/WebKit/WebKit/commit/d187ecab7b152962465c23be04ab7ed3ef70f382" target="_blank" rel="noopener"><span>creation of OfflineAudioContext</span></a>, 
<a href="https://github.com/WebKit/WebKit/commit/fad97bfb064446f78c78338104fb3f22be666cbb" target="_blank" rel="noopener"><span>creation of OscillatorNode</span></a>, <a href="https://github.com/WebKit/WebKit/commit/6f2b47e87bc414001affb258048749130bc91083" target="_blank" rel="noopener"><span>creation of DynamicsCompressorNode</span></a>. \
\
Since then browser developers have made a lot of small changes. These changes, compounded by the large number of mathematical operations involved, lead to fingerprinting differences. Audio signal processing uses floating point arithmetic, which also contributes to discrepancies in calculations.\
\
You can see how these things are implemented now in the three major browser engines:

* Blink: <a href="https://github.com/chromium/chromium/blob/9841ee86b710dc649cf41772f560600324cadf45/third_party/blink/renderer/modules/webaudio/periodic_wave.cc#L468" target="_blank" rel="noopener"><span>oscillator</span></a>, <a href="https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/dynamics_compressor_kernel.cc#L202" target="_blank" rel="noopener"><span>dynamics compressor</span></a>
* WebKit: <a href="https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/Modules/webaudio/PeriodicWave.cpp#L250" target="_blank" rel="noopener"><span>oscillator</span></a>, <a href="https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/platform/audio/DynamicsCompressorKernel.cpp#L188" target="_blank" rel="noopener"><span>dynamics compressor</span></a>
* Gecko: <a href="https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/PeriodicWave.cpp#L286" target="_blank" rel="noopener"><span>oscillator</span></a>, <a href="https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/DynamicsCompressorKernel.cpp#L213" target="_blank" rel="noopener"><span>dynamics compressor</span></a>

Additionally, browsers use different implementations for different CPU architectures and OSes to leverage features like <a href="https://en.wikipedia.org/wiki/SIMD" target="_blank" rel="noopener"><span>SIMD</span></a>. For example, Chrome uses <a href="https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/mac/fft_frame_mac.cc" target="_blank" rel="noopener"><span>a separate fast Fourier transform implementation</span></a> on macOS (producing a different oscillator signal) and <a href="https://github.com/chromium/chromium/tree/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/cpu" target="_blank" rel="noopener"><span>different vector operation implementations</span></a> on different CPU architectures (which are used in the DynamicsCompressor implementation). These platform-specific changes also contribute to differences in the final audio fingerprint.\
\
Fingerprint results also depend on the Android version (it’s different in Android 9 and 10 on the same devices for example).\
\
According to browser source code, audio processing doesn’t use dedicated audio hardware or OS features—all calculations are done by the CPU. 

## Pitfalls

When we started to use audio fingerprinting in production, we aimed to achieve good browser compatibility, stability and performance. For high browser compatibility, we also looked at privacy-focused browsers, such as Tor and Brave.

### OfflineAudioContext

As you can see on <a href="https://caniuse.com/mdn-api_offlineaudiocontext" target="_blank" rel="noopener"><span>caniuse.com</span></a>, <tt>OfflineAudioContext</tt> works almost everywhere. But there are some cases that need special handling.\
\
The first case is iOS 11 or older. It does support <tt>OfflineAudioContext</tt>, but the rendering only starts if <a href="https://stackoverflow.com/a/46534088/1118709" target="_blank" rel="noopener"><span>triggered by a user action</span></a>, for example by a button click. If <tt>context.startRendering</tt> is not triggered by a user action, the <tt>context.state</tt> will be suspended and rendering will hang indefinitely unless you add a timeout. There are not many users who still use this iOS version, so we decided to disable audio fingerprinting for them.\
\
The second case are browsers on iOS 12 or newer. They can reject starting audio processing if the page is in the background. Luckily, browsers allow you to resume the processing when the page returns to the foreground.
When the page is activated, we attempt calling <tt>context.startRendering()</tt> several times until the <tt>context.state</tt> becomes running. If the processing doesn’t start after several attempts, the code stops. We also use a regular <tt>setTimeout</tt> on top of our retry strategy in case of an unexpected error or freeze. You can see <a href="https://gist.github.com/Finesse/92959ce907a5ba7ee5c05542e3f8741b" target="_blank" rel="noopener"><span>a code example here</span></a>.

### Tor

**In the case of the Tor browser, everything is simple. Web Audio API is disabled there, so audio fingerprinting is <a href="https://gitlab.torproject.org/legacy/trac/-/issues/21984" target="_blank" rel="noopener"><span>not possible</span></a>.**

### Brave

With Brave, the situation is more nuanced. Brave is a privacy-focused browser based on Blink.
It is known to slightly randomize the audio sample values, which it calls “farbling”.

> Farbling is Brave’s term for slightly randomizing the output of semi-identifying browser features, in a way that’s difficult for websites to detect, but doesn’t break benign, user-serving websites. These “farbled” values are deterministically generated using a per-session, <a href="https://publicsuffix.org/" target="_blank" rel="noopener"><span>per-eTLD</span></a>+1 seed2 so that a site will get the exact same value each time it tries to fingerprint within the same session, but that different sites will get different values, and the same site will get different values on the next session. This technique has its roots in prior privacy research, including the <a href="https://dl.acm.org/doi/abs/10.1145/2736277.2741090" target="_blank" rel="noopener"><span>PriVaricator</span></a> (Nikiforakis et al, WWW 2015) and <a href="https://hal.inria.fr/hal-01527580/document" target="_blank" rel="noopener"><span>FPRandom</span></a> (Laperdrix et al, ESSoS 2017) projects.

Brave offers three levels of farbling (users can choose the level they want in settings):

* Disabled — no fudging is applied. The fingerprint is the same as in other Blink browsers such as Chrome.
* Standard — This is the default value. The audio signal values are multiplied by a fixed number, called the “fudge” factor, that is stable for a given domain within a user session. In practice it means that the audio wave sounds and looks the same, but has tiny variations that make it difficult to use in fingerprinting.
* Strict — the sound wave is replaced with a pseudo-random sequence.

The farbling <a href="https://github.com/brave/brave-core/blob/680b0d872e0a295ef94602fb5dc1907358d6a3ba/chromium_src/third_party/blink/renderer/modules/webaudio/audio_buffer.cc#L16" target="_blank" rel="noopener"><span>modifies</span></a> the original Blink <tt>AudioBuffer</tt> by <a href="https://github.com/brave/brave-core/blob/680b0d872e0a295ef94602fb5dc1907358d6a3ba/chromium_src/third_party/blink/renderer/core/execution_context/execution_context.cc#L133" target="_blank" rel="noopener"><span>transforming</span></a> the original audio values.

### Reverting Brave standard farbling

To revert the farbling, we need to obtain the fudge factor first. Then we can get back the original buffer by dividing the farbled values by the fudge factor:

```javascript
async function getFudgeFactor() {
  const context = new AudioContext(1, 1, 44100)
  const inputBuffer = context.createBuffer(1, 1, 44100)
  inputBuffer.getChannelData(0)[0] = 1

  const inputNode = context.createBufferSource()
  inputNode.buffer = inputBuffer
  inputNode.connect(context.destination)
  inputNode.start()

  // See the renderAudio implementation 
  // at https://git.io/Jmw1j
  const outputBuffer = await renderAudio(context)
  return outputBuffer.getChannelData(0)[0]
}

const [fingerprint, fudgeFactor] = await Promise.all([
  // This function is the fingerprint algorithm described
  // in the “How audio fingerprint is calculated” section
  getFingerprint(),
  getFudgeFactor(),
])
const restoredFingerprint = fingerprint / fudgeFactor
```

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

As you can see, the restored Brave fingerprints are closer to the original fingerprints than to other browsers’ fingerprints. This means that you can use a fuzzy algorithm to match them. For example, if the difference between a pair of audio fingerprint numbers is more than 0.0000022%, you can assume that these are different devices or browsers.

## Performance

### Web Audio API rendering

Let’s take a look at what happens under the hood in Chrome during audio fingerprint generation. In the screenshot below, the horizontal axis is time, the rows are execution threads, and the bars are time slices when the browser is busy. You can learn more about the performance panel in this <a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance" target="_blank" rel="noopener"><span>Chrome article</span></a>. The audio processing starts at 809.6ms and completes at 814.1ms:

![](/img/uploads/performance.jpg)

The main thread, labeled as “Main” on the image, handles user input (mouse movements, clicks, taps, etc) and animation. When the main thread is busy, the page freezes. It’s a good practice to avoid running blocking operations on the main thread for more than several milliseconds. \
\
As you can see on the image above, the browser delegates some work to the <tt>OfflineAudioRender</tt> thread, freeing the main thread. 
**Therefore the page stays responsive during most of the audio fingerprint calculation.**\
\
<info icon> Web Audio API is not available in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" target="_blank" rel="noopener"><span>web workers</span></a>, so we cannot calculate audio fingerprints there.

### Performance summary in different browsers

The table below shows the time it takes to get a fingerprint on different browsers and devices. The time is measured immediately after the cold page load.

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

## Audio fingerprinting is only a small part of the larger identification process.

Audio fingerprinting is one of the many signals our <a href="https://github.com/fingerprintjs/fingerprintjs" target="_blank" rel="noopener"><span>open source library</span></a> uses to generate a browser fingerprint. However, we do not blindly incorporate every signal available in the browser. Instead we analyze the stability and uniqueness of each signal separately to determine their impact on fingerprint accuracy.\
\
For audio fingerprinting, we found that the signal contributes only slightly to uniqueness but is highly stable, resulting in a small net increase to fingerprint accuracy.\
\
You can learn more about stability, uniqueness and accuracy in our <a href="https://fingerprintjs.com/blog/what-is-browser-fingerprinting/" target="_blank" rel="noopener"><span>beginner’s guide to browser fingerprinting</span></a>.

### Try Browser Fingerprinting for Yourself

Browser fingerprinting is a useful method of visitor identification for a variety of anti-fraud applications. It is particularly useful to identify malicious visitors attempting to circumvent tracking by clearing cookies, browsing in incognito mode or using a VPN. \
\
You can try implementing browser fingerprinting yourself with our <a href="https://github.com/fingerprintjs/fingerprintjs" target="_blank" rel="noopener"><span>open source library</span></a>. FingerprintJS is the most popular browser fingerprinting library available, with over 12K GitHub stars.\
\
For higher identification accuracy, we also developed the <a href="https://fingerprintjs.com/" target="_blank" rel="noopener"><span>FingerprintJS Pro API</span></a>, which uses machine learning to combine browser fingerprinting with additional identification techniques. You can try FingerprintJS Pro free for 10 days with no usage limits.

### Get in touch

* Star, follow or fork our <a href="https://github.com/fingerprintjs/fingerprintjs" target="_blank" rel="noopener"><span>GitHub project</span></a>
* Email us your questions at oss@fingerprintJS.com
* Sign up to our <a href="https://mailchi.mp/708d84efc0c1/updates-signup" target="_blank" rel="noopener"><span>newsletter</span></a> for updates