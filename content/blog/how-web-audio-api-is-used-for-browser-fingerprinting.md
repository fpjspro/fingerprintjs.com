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

```
const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
const context = new AudioContext(1, 5000, 44100)
```
## AudioBuffer