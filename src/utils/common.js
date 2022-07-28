import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '@/constants'

export function formatNumber(value) {
  return new Intl.NumberFormat().format(Number.parseInt(value))
}

export function removeDot(string) {
  return string
    .split('.')
    .filter((x) => x !== '.')
    .join('')
}

export function getThumbnailUrl(product) {
  return product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER
}

export function formatPrice(value) {
  return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(value)
}

export function formatString(name) {
  return `${name.charAt(0).toLocaleUpperCase()}${name.slice(1, name.length)}`
}
