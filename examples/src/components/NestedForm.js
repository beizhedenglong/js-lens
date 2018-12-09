import React, { useState } from 'react'
import {
  lensPath, lensCompose, view, set,
} from 'js-lens'

// const nestedObj = {
//   user: {
//     name: 'Victor',
//     favoriteColors: ['black', 'white', 'grey'],
//     // contact info doesn't appear here
//     // contact: {
//     //   phone: 123,
//     //   email: "123@example.com"
//     // }
//   },
// }
const contactLens = lensPath(['user', 'contact'])
const nameLens = lensPath(['user', 'name'])
const emailLens = lensPath(['email'])
const addressLens = lensPath(['addressLens'])
const contactAddressLens = lensCompose(contactLens, addressLens)
const contactEmailLens = lensCompose(contactLens, emailLens)

const NestedForm = () => {
  const [data, setData] = useState({})
  const value = (lens, defaultValue = '') => view(lens, data) || defaultValue
  const update = (lens, v) => setData(prev => set(lens, v, prev))
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(data)
      }}
    >
      {JSON.stringify(data)}
      <br />
      <input
        type="text"
        placeholder="name"
        value={value(nameLens)}
        onChange={e => update(nameLens, e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={value(contactEmailLens)}
        onChange={e => update(contactEmailLens, e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={value(contactAddressLens)}
        onChange={e => update(contactAddressLens, e.target.value)}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  )
}

export default NestedForm
