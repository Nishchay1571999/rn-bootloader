/**
 * Component that triggers post phase when app is ready
 */

import { useEffect, type ReactNode } from 'react'
import { emitAppReady } from '../core/events'

interface AppReadyGateProps {
  children?: ReactNode | any
}

export function AppReadyGate({ children }: AppReadyGateProps) {
  useEffect(() => {
    emitAppReady()
  }, [])
  if(children!== undefined || children !== null){
    return <>{children}</>
  }else {
    return null
  }
}
