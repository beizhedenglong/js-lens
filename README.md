# Js Lens

[![Build Status](https://travis-ci.org/beizhedenglong/js-lens.svg?branch=master)](https://travis-ci.org/beizhedenglong/js-lens)
[![Coverage Status](https://coveralls.io/repos/github/beizhedenglong/js-lens/badge.svg?branch=master)](https://coveralls.io/github/beizhedenglong/js-lens?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/beizhedenglong/js-lens.svg)](https://greenkeeper.io/)
[![Dev Dependencies](https://david-dm.org/beizhedenglong/js-lens/dev-status.svg)](https://david-dm.org/beizhedenglong/js-lens?type=dev)

Js Lens is a tiny library that help you accessing and updating deep nested object safely with functional features(immutability and composition). 

Accessing and updating nested object directly in JavaScript maybe dangerous. Like this:
```js
let nestedObj = {
  user: {
    name: 'Victor',
    favoriteColors: ["black", "white", "grey"],
    // contact info doesn't appear here
    // contact: {
    //   phone: 123,
    //   email: "123@example.com"
    // }
  }
}

// if we want to get the user's phone number, we will get an TypeError: Cannot read property 'phone' of undefined
const phoneNumber = nestedObj.user.contact.phone

// How about set the phone number? 
nestedObj.user.contact.phone = 123 // we also got an TypeError: Cannot set property 'phone' of undefined

```
With Js Lens, we can get rid of this risk.

## Installation
`npm install js-lens --save`

## Accessing And Updating
```js
import { lensPath, view, set, over } from "js-lens"

const contactPhoneLens = lensPath(["user", "contact", "phone"])
const colorsLens = lensPath(["user", "favoriteColors"])

// get phone number
view(contactPhoneLens, nestedObj) // undefined

// set phone number 
let newNestedObj = set(contactPhoneLens, 123, nestedObj) // return a new object, leaving original object untouched.
view(contactPhoneLens, newNestedObj) // 123

// update value base on previous value by using over
newNestedObj = over(colorsLens, colors => [...colors, "brown"], nestedObj)
view(colorsLens, newNestedObj) // [ 'black', 'white', 'grey', 'brown' ]

```

## Lens Can Compose

```js
import  { lensPath, view, set, lensCompose } from  "js-lens"

const contactLens = lensPath(["user", "contact"])
const emailLens = lensPath(["email"])
const addressLens = lensPath(["addressLens"])

const contactAddressLens = lensCompose(contactLens, addressLens)
const contactEmailLens = lensCompose(contactLens, emailLens)

// get address
view(contactAddressLens, newNestedObj) // undefined

// set address
newNestedObj = set(contactAddressLens, "Mars", newNestedObj)
view(contactAddressLens, newNestedObj) // Mars

// set email
newNestedObj = set(contactEmailLens, "hello@example.com", newNestedObj)
view(contactEmailLens, newNestedObj) // hello@example.com
  
```

TODO API DOC