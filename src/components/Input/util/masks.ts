export const createMask = (formula: string) => {
  const patternArray = formula.split('')

  return (value: string) => {
    if (!value) {
      return ''
    }

    let result = '', index = 0

    for (let i = 0; i < patternArray.length; i++) {
      if (!value[index]) {
        break
      }

      const symbol = patternArray[i]

      result += symbol === 'X'
        ? value[index++]
        : symbol
    }

    return result
  }
}

type CreateMaskWithModifiers = (params: {
  mask: string
  preModify?: (value: string) => string
  postModify?: (value: string) => string
}) => (value: string) => string

const createMaskWithModifiers: CreateMaskWithModifiers = ({ mask, preModify, postModify }) => {
  const applyMask = mask && createMask(mask)

  return (value) => {
    let newValue = value

    if (typeof preModify === 'function') {
      newValue = preModify(newValue)
    }

    if (typeof applyMask === 'function') {
      newValue = applyMask(newValue)
    }

    if (typeof postModify === 'function') {
      newValue = postModify(newValue)
    }

    return newValue
  }
}

// Mask result - yyyy
const initYearMask = ({ min, max }: { min: number, max: number }): ReturnType<CreateMaskWithModifiers> => {
  const preModify = (value: string) => value.replace(/\D/g, '')

  const postModify = (value: string) => {
    if (value) {
      const firstChar = value[0] || '0'
      const secondChar = value[1] || '0'
      const thirdChar = value[2] || '0'
      const fourthChar = value[3] || '0'

      const year = [ firstChar, secondChar, thirdChar, fourthChar ].join('')
      const yearNumber = Number(year)

      let result = ''

      if (min > yearNumber) {
        result = String(min)
      }
      if (max < yearNumber) {
        result = String(max)
      }

      if (result) {
        value = result.slice(0, value.length)
      }
    }

    return value
  }

  return createMaskWithModifiers({
    mask: 'XXXX',
    preModify,
    postModify,
  })
}


export default {
  year: initYearMask({ min: 1920, max: new Date().getFullYear() }),
}
