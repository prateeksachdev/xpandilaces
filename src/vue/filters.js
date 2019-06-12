export function dollar (cents) {
  if (cents === undefined || cents === '') { return '' }
  let str = (Math.abs(cents) / 100).toFixed(2)
  if (cents < 0) {
    return `- $ ${str}`
  } else {
    return `$ ${str}`
  }
}
