import { randomInt } from "node:crypto"

// Unambiguous charset: no 0/O/1/I/l look-alikes.
const CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"

export function generateTempPassword(length = 12) {
  let password = ""
  for (let i = 0; i < length; i++) {
    password += CHARSET[randomInt(CHARSET.length)]
  }
  return password
}
