---
templateKey: long-form-content
metadata:
  title: How Web Audio API is used for browser fingerprinting
  url: https://fingerprintjs.com/blog/audio-fingerprinting
  image: /img/uploads/fpjs_cover2.png
  description: description
featured: true
publishDate: 2021-03-18T13:12:29.612Z
title: How Web Audio API is used for browser fingerprinting
tags:
  - fingerprinting
---
![]()

Did you know that you can identify web browsers without using cookies or asking for permissions?

This is known as “browser fingerprinting” and it works by reading browser attributes and combining them together into a single identifier. This identifier is stateless and works well in normal and incognito modes.

***browser fingerprinting image***

When generating a browser identifier, we can read browser attributes directly or use attribute processing techniques first. One of the creative techniques that we’ll discuss today is audio fingerprinting.

Audio fingerprinting is a valuable technique because it is relatively unique and stable.
Its uniqueness comes from the internal complexity and sophistication of the Web Audio API.
The stability is achieved because the audio source that we’ll use is a sequence of numbers, generated mathematically. Those numbers will later combine into a single audio fingerprint value.

Before we dive into the technical implementation, we need to understand a few ideas from the Web Audio API and its building blocks.

# A brief overview of Web Audio API

The Web Audio API is a powerful system for handling audio operations. It is designed to perform inside an <tt>AudioContext</tt> by linking together audio nodes and building an audio graph. A single AudioContext can handle multiple types of audio sources, that plug into other nodes and form chains of audio processing.

***diagram showing source => node1 => node2 => output***

A source can be an <tt><audio/></tt> element, a stream, or generated mathematically with an <tt>Oscillator</tt>. We’ll be using the oscillator for our purposes and then connect it to other nodes for additional processing.

Before we dive into the audio fingerprint implementation details, it’s helpful to make an overview of all the building blocks of the API that we’ll be using.

## AudioContext

<tt>AudioContext</tt> represents an entire chain, built from audio nodes linked together. 
It controls the creation of the nodes and execution of the audio processing. You always start by creating an instance of AudioContext before you do anything else. It’s a good practice to create a single AudioContext instance and reuse it for all future processing.

AudioContext has a destination property that represents the destination of all audio from that context. 

There is a special type of AudioContext, <tt>-- OfflineAudioContext</tt>. The main difference is that it does not render the audio to the device hardware. Instead, it generates the audio as fast as possible and saves it into an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer" target="_blank" rel="noopener"><tt>AudioBuffer</tt> </a>. So the destination of the OfflineAudioContext will be an in-memory data structure, while with a regular AudioContext, the destination will be an audio-rendering device.

When creating an instance of OfflineAudioContext, we pass 3 arguments: number of channels, total number of samples and a sample rate (samples per second).

```javascript
const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
const context = new AudioContext(1, 5000, 44100)
```

## AudioBuffer

It represents an audio snippet, stored in memory. It’s designed to hold small snippets, because the data is represented internally as linear PCM with each sample being a 32-bit float value in the range between -1.0 and 1.0.
It can hold multiple channels, but for our purposes we’ll only use one.

***diagram of 32bit numbers in the range between -1.0 to 1.0***

## Oscillator

When working with audio, we always need a source. <tt>Oscillator</tt> is a good candidate, because it generates samples mathematically, as opposed to playing an audio file.
In its simplest form, an oscillator generates a periodic waveform with a specified frequency. 
The default shape is a sine wave.

![](/img/uploads/sinewave.jpg)

It’s also possible to generate other types of waves, such as square, sawtooth, and triangle.

![](/img/uploads/square.jpg)

![](/img/uploads/sawtooth.jpg)

![](/img/uploads/triangle.jpg)

The default frequency is 440 Hz, which is a standard A4 note.

<iframe style ="width: calc(100% + 24px); height: 380px; margin-left: -12px; margin-right: -12px;"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=oscillator-options" frameborder="no"> 
</iframe>

## Compressor

Web Audio API provides a DynamicsCompressorNode, which lowers the volume of the loudest parts of the signal and helps prevent distortion or clipping. 

<tt>DynamicsCompressorNode</tt> has many interesting properties that we’ll use. These properties will help create more variability between browsers.

<tt>Threshold</tt> - value in decibels above which the compressor will start taking effect.
Knee - value in decibels representing the range above the threshold where the curve smoothly transitions to the compressed portion.

<tt>Ratio</tt> - amount of input change, in dB, needed for a 1 dB change in the output.
Reduction - float representing the amount of gain reduction currently applied by the compressor to the signal.

<tt>Attack</tt> - the amount of time, in seconds, required to reduce the gain by 10 dB. This value can be a decimal.

<tt>Release</tt> - the amount of time, in seconds, required to increase the gain by 10 dB.

<iframe style ="width: calc(100% + 24px); height: 580px; margin-left: -12px; margin-right: -12px;"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=dynamics-compressor-options" frameborder="no"> 
</iframe>

## How audio fingerprint is calculated

Now we have all the concepts we need to start working on our audio fingerprinting code.

Safari doesn’t support unprefixed OfflineAudioContext, but supports 
webkitOfflineAudioContext, so we’ll use this trick to make it work in Chrome and Safari:

```javascript
const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContex
```

Now we create an AudioContext instance. We’ll use one channel, a 44,100 sample rate and 5,000 samples total, which will make it about 113 ms long.

```javascript
const context = new AudioContext(1, 5000, 44100)
```

Next let’s create our sound source - an Oscillator instance. It will generate a triangular-shaped sound wave that will fluctuate 1,000 times per second (1,000 Hz).

```javascript
const oscillator = context.createOscillator()
oscillator.type = "triangle"
oscillator.frequency.value = 1000
```

Now let’s create our compressor to add more variety and transform the original signal.
Note that the values for all these parameters are arbitrary and are only meant to change the source signal in interesting ways. We could use any other values and it would work equally well.

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

It is time to generate the audio snippet. We’ll use the oncomplete event to get the result when it’s ready.

```javascript
oscillator.start()
context.oncomplete = event => {
  // We have only one channel, so we get it by index
  const samples = event.renderedBuffer.getChannelData(0)
};
context.startRendering()
```

Samples is an array of floating-point values that represent the uncompressed sound. Now we need to calculate a single value from that array.

Let’s do it by simply summing up a slice of the array values:

```javascript
function calculateHash(samples) {
  let hash = 0
  for (let i = 0; i < samples.length; ++i) {
    hash += Math.abs(samples\[i])
  }
  return hash
}

console.log(getHash(samples))
```

Now we are ready to generate the audio fingerprint. When I run it on Chrome on MacOS I get the value:

* 101.45647543197447

That’s all there is to it, our audio fingerprint is this number!

You can check out a production implementation in our open source browser fingerprinting library.

If I try executing the code in Safari, I get a different number:

* 79.58850509487092

And get another unique result in Firefox:

* 80.95458510611206

Every browser I have on my laptop generates a different value. This value is very stable and remains the same in incognito mode. 

**This value depends on the underlying hardware and OS, and in your case may be different.**

## Why audio fingerprint varies in different browsers

Let’s take a closer look at why the values are different in different browsers. We’ll examine a single oscillation wave under a microscope in both Chrome and Firefox.

First, let’s reduce the duration of our audio snippet to 1/2000th of a second, which corresponds to a single wave and examine the values that make up that wave.

We need to change our context duration to 23 samples, which roughly corresponds to a <tt>1/2000th</tt> of a second. We’ll also skip the compressor for now and only examine the differences of the unmodified oscillator signal.

```javascript
const context = new AudioContext(1, 23, 44100)
```

Here is how a single triangular oscillation looks in both Chrome and Firefox now: 

![](/img/uploads/triangular_oscillation.png)

However the underlying values are different between the two browsers (I’m showing only the first 3 values  for simplicity):

<tt>Chrome:    **\[0,0.08988945186138153,0.18264609575271606,0.2712443470954895]**</tt>
<tt>Firefox:   **\[0,0.09155717492103577,0.18603470921516418,0.2762767672538757]**</tt>

Let’s take a look at this demo to visually see those differences.

<iframe style ="width: calc(100% + 24px); height: 500px; margin-left: -12px; margin-right: -12px;"scrolling="no"src="https://fingerprintjs.github.io/audio-fingerprint-article-demos/?demo=difference" frameborder="no"> 
</iframe>

Historically, all major browser engines (Blink, WebKit, and Gecko) based their Web Audio API implementations on code that was originally developed by Google in 2011 and 2012 for the WebKit project.

Examples of Google contributions to the Webkit project include:
<a href="https://github.com/WebKit/WebKit/commit/d187ecab7b152962465c23be04ab7ed3ef70f382" target="_blank" rel="noopener"><span>creation of OfflineAudioContext</span> </a>, 
<a href="https://github.com/WebKit/WebKit/commit/fad97bfb064446f78c78338104fb3f22be666cbb" target="_blank" rel="noopener"><span>creation of OscillatorNode</span> </a>
, <a href="https://github.com/WebKit/WebKit/commit/6f2b47e87bc414001affb258048749130bc91083" target="_blank" rel="noopener"><span>creation of DynamicsCompressorNode</span> </a>. 

Since then browser developers have made a lot of small changes. These changes, combined with a huge amount of mathematical operations involved, lead to fingerprinting differences. Audio signal processing uses floating point arithmetic, which also contributes to discrepancies in calculations.

You can see how these things are implemented now in the three major browser engines:

* Blink: <a href="https://github.com/chromium/chromium/blob/9841ee86b710dc649cf41772f560600324cadf45/third_party/blink/renderer/modules/webaudio/periodic_wave.cc#L468" target="_blank" rel="noopener"><span>oscillator</span> </a> , <a href="https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/dynamics_compressor_kernel.cc#L202" target="_blank" rel="noopener"><span>dynamics compressor</span> </a>
* WebKit: <a href="https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/Modules/webaudio/PeriodicWave.cpp#L250" target="_blank" rel="noopener"><span>oscillator</span> </a> , <a href="https://github.com/WebKit/WebKit/blob/010d252ab89d2c867efcba547e879c11968eebe7/Source/WebCore/platform/audio/DynamicsCompressorKernel.cpp#L188" target="_blank" rel="noopener"><span>dynamics compressor</span> </a>
* Gecko: <a href="https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/PeriodicWave.cpp#L286" target="_blank" rel="noopener"><span>oscillator</span> </a> , <a href="https://github.com/mozilla/gecko-dev/blob/9ae77e4ce3378bd683ac9a86b729ea6b6bd22cb8/dom/media/webaudio/blink/DynamicsCompressorKernel.cpp#L213" target="_blank" rel="noopener"><span>dynamics compressor</span> </a>

Additionally, browsers use different implementations for different CPU architectures and OSes to leverage features like <a href="https://en.wikipedia.org/wiki/SIMD" target="_blank" rel="noopener"><span>SIMD</span> </a>. For example, Chrome uses <a href="https://github.com/chromium/chromium/blob/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/mac/fft_frame_mac.cc" target="_blank" rel="noopener"><span>a separate fast Fourier transform implementation</span> </a> on macOS (producing a different oscillator signal) and <a href="https://github.com/chromium/chromium/tree/3e914531a360b766bfd8468f59259b3ab29118d7/third_party/blink/renderer/platform/audio/cpu" target="_blank" rel="noopener"><span>different vector operation implementations</span> </a> on different CPU architectures (which are used in the DynamicsCompressor implementation). These platform-specific changes also contribute to differences in the final audio fingerprint.

Fingerprint results also depend on the Android version (it’s different in Android 9 and 10 on the same devices on Browserstack).

According to the browsers’ source code, audio processing doesn’t use dedicated audio hardware or OS features, all calculations are done by the CPU. 

## Pitfalls

When we started to use audio fingerprinting in production, we aimed to achieve good browser compatibility, stability and performance. For browser compatibility, we also looked at privacy-focused browsers, such as Tor and Brave.

### OfflineAudioContext



As you can see on <a href="https://caniuse.com/mdn-api_offlineaudiocontext" target="_blank" rel="noopener"><span>caniuse.com</span> </a>, <tt>OfflineAudioContext</tt> works almost everywhere. But there are some cases that need special handling.

The first case is iOS 11 or older. It does support <tt>OfflineAudioContext</tt>, but the rendering only starts if <a href="https://stackoverflow.com/a/46534088/1118709" target="_blank" rel="noopener"><span>triggered by a user action</span> </a>, for example by a button click. If <tt>context.startRendering</tt> is not triggered by a user action, the <tt>context.state</tt> will be suspended and rendering will hang indefinitely unless you add a timeout. There were not many users who still used this iOS version, so we decided to disable audio fingerprinting for them.

The second case are browsers on iOS 12 or newer. They can reject starting audio processing if the page is in the background. Luckily, browsers allow you to resume the processing when the page returns to the foreground.
When the page is activated, we attempt calling <tt>context.startRendering()</tt> several times until the <tt>context.state</tt> becomes running. If the processing doesn’t start after several attempts, the code stops. We also use a regular <tt>setTimeout</tt> on top of our retry strategy in case of an unexpected error or freeze. You can see <a href="https://gist.github.com/Finesse/92959ce907a5ba7ee5c05542e3f8741b" target="_blank" rel="noopener"><span>a code example here</span> </a>.