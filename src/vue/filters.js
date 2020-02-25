export function dollar (cents) {
  if (cents === undefined || cents === '') { return '' }
  let str = (Math.abs(cents) / 100).toFixed(2)
  if (cents < 0) {
    return `- $ ${str}`
  } else {
    return `$ ${str}`
  }
}

export function noSpace (str) {
  return str.replace(/\s/g, '');
}

export function cdnURL(url, options) {
  return `//images.accentuate.io?c_options=${options}&shop=xpandlaces.myshopify.com&image=${url}`
}
