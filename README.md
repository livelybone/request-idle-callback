# request-idlecallback
[![NPM Version](http://img.shields.io/npm/v/request-idlecallback.svg?style=flat-square)](https://www.npmjs.com/package/request-idlecallback)
[![Download Month](http://img.shields.io/npm/dm/request-idlecallback.svg?style=flat-square)](https://www.npmjs.com/package/request-idlecallback)
![gzip with dependencies: 0.9kb](https://img.shields.io/badge/gzip--with--dependencies-0.9kb-brightgreen.svg "gzip with dependencies: 0.9kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")

[中文文档](./README-CN.md)

A polyfill for `window.requestIdleCallback`, support NodeJs. It can be used for time slicing.

The behavior of this module is closer to `window.requestIdleCallback`
than [requestidlecallback](https://www.npmjs.com/package/requestidlecallback), see the details in the example below

## repository
https://github.com/livelybone/request-idle-callback.git

## Demo
https://github.com/livelybone/request-idle-callback#readme

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/request-idle-callback.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S request-idlecallback
```

## Global name - The variable the module exported in `umd` bundle
`RIC`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import * as RIC from 'request-idlecallback'

const id = RIC.requestIdleCallback(() => {
  // ... do something
})

RIC.cancelIdleCallback(id)
```

### use as a polyfill:
> in js:
```js
import 'request-idlecallback/lib/umd/polyfill';
```

> in html(CDN):
```html
<script src="https://cdn.jsdelivr.net/npm/request-idlecallback/lib/umd/polyfill.js"></script>
```

Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/request-idlecallback/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/request-idlecallback/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/request-idlecallback/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/request-idlecallback/lib/umd/<--module-->.js"></script>
```
