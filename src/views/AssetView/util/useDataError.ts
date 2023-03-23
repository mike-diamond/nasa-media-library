import { useEffect } from 'react'
import { useRouter } from 'next/router'


type Input = {
  error: string | null
  prevPath: string
}

const useDataError = ({ error, prevPath }: Input) => {
  const router = useRouter()

  useEffect(() => {
    if (error && router.isReady) {
      if (error === 'Something went wrong') {
        router.push(prevPath)
      }
      else {
        router.replace(prevPath)
      }
    }
  }, [ error, router, prevPath ])
}


export default useDataError
