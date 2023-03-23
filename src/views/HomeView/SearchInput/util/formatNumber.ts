const formatNumber = (number: number) => {
  const numberString = String(number)
  const result = Array.from(numberString).reverse()
    .map((char, index) => (
      index % 3 === 2 ? ` ${char}` : char
    ))
    .reverse()
    .join('')

  return result.replace(/^ /, '')
}


export default formatNumber