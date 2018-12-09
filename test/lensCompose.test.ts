import lensPath from "../src/lensPath"
import set from "../src/set"
import view from "../src/view"
import over from "../src/over"
import lensCompose from '../src/lensCompose'

const nestedObj = {
  user: {
    name: 'Victor',
    favoriteColors: ['black', 'white', 'grey'],
    // contact info doesn't appear here
    // contact: {
    //   phone: 123,
    //   email: "123@example.com"
    // }
  },
}

const colorLens = lensPath(['user', 'favoriteColors'])
const contactLens = lensPath(['user', 'contact'])
const emailLens = lensPath(['email'])
const addressLens = lensPath(['addressLens'])

const contactAddressLens = lensCompose(contactLens, addressLens)
const contactEmailLens = lensCompose(contactLens, emailLens)

test("lensCompose:set", () => {
  expect(set(contactEmailLens, "123@example.com", nestedObj)).toEqual({
    user: {
      name: 'Victor',
      favoriteColors: ['black', 'white', 'grey'],
      contact: {
        email: "123@example.com"
      }
    },
  })
  expect(set(lensCompose(colorLens, lensPath([1])), "green", nestedObj)).toEqual({
    user: {
      name: 'Victor',
      favoriteColors: ['black', 'green', 'grey'],
    },
  })
})

test("lensCompose: view", () => {
  expect(view(lensCompose(colorLens, lensPath([0])), nestedObj)).toEqual("black")
  expect(view(lensCompose(lensPath(["user"]), lensPath(['contact']), lensPath(["email"])), nestedObj)).toEqual(undefined)
  const newObject = set(contactEmailLens, "123@example.com", nestedObj)
  expect(view(lensCompose(lensPath(["user"]), lensPath(['contact']), lensPath(["email"])), newObject)).toEqual("123@example.com")
})

test("lensCompose:over", () => {
  const newObject = set(contactEmailLens, "123@", nestedObj)
  expect(over(contactEmailLens, (x:string) => x + 'example.com', newObject))
    .toEqual({
      user: {
        name: 'Victor',
        favoriteColors: ['black', 'white', 'grey'],
        contact: {
          email: "123@example.com"
        }
      },
    })
  expect(over(lensCompose(colorLens, lensPath([1])), () => "green", nestedObj)).toEqual({
    user: {
      name: 'Victor',
      favoriteColors: ['black', 'green', 'grey'],
    },
  })
})