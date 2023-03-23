import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { observer, useEventListener } from 'modules'

import Button from 'components/Button/Button'

import s from './Observer.module.scss'


type ObserverWrapperProps = {
  className?: string
  children: ReactNode
}

const Observer: React.FC<ObserverWrapperProps> = (props) => {
  const { className, children } = props

  const [ isDesktop, setDesktop ] = useState(true)

  const checkDesktop = useCallback(() => {
    if (typeof window.matchMedia === 'function') {
      const isDesktop = window.matchMedia?.(`(min-width: 569px)`).matches

      setDesktop(isDesktop)
    }
  }, [])

  useEventListener('resize', checkDesktop)

  useEffect(() => {
    checkDesktop()
  }, [])

  const { ref, isVisible: isObserverVisible } = observer.useEntry({
    threshold: 0.9999,
  })

  const isScrolled = Boolean(!isObserverVisible && typeof window !== 'undefined' && window.scrollY)
  const isFixed = isDesktop && isScrolled

  return (
    <div className={cx(s.container, className)}>
      <div
        ref={ref}
        className="w-full"
      />
      <div
        className={cx({
          'fixed top-0 left-0 w-full z-1': isFixed,
        })}
      >
        <div
          className={cx('bg-arrival', {
            'width-container': isFixed,
          })}
        >
          {children}
          {
            !isDesktop && isScrolled && (
              <div className="width-container fixed bottom-0 left-0 mb-48 z-1 w-full">
                <Button
                  className="w-full shadow-rocky"
                  title="Back to Search"
                  style="primary"
                  onClick={() => {
                    window.scrollTo(0, 0)
                  }}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}


export default React.memo(Observer)
