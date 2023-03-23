import { useEffect, useState } from 'react'
import { localStorage } from 'modules'


const usePrevPath = () => {
  const [ prevPath, setPrevPath ] = useState('/')

  useEffect(() => {
    const searchPath = localStorage.getItem<string>('searchPath') || '/'
    const isValidPath = /^\/\??/.test(searchPath)

    if (isValidPath) {
      setPrevPath(searchPath)
    }
  }, [])

  return prevPath
}


export default usePrevPath
