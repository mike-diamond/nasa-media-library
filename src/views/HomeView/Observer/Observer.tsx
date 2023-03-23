import React, { useEffect } from 'react'
import { observer } from 'modules'
import cx from 'classnames'

import s from './Observer.module.scss'


type ObserverProps = {
  onObserve: () => void
}

const Observer: React.FC<ObserverProps> = (props) => {
  const { onObserve } = props

  const { ref, isVisible } = observer.useEntry()

  useEffect(() => {
    if (isVisible) {
      onObserve()
    }
  }, [ isVisible, onObserve ])

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cx(s.observerPixel, 'absolute left-0 bottom-0')}
      />
    </div>
  )
}


export default Observer
