import React, { useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import createWrapperAndAppendToBody from "../../utils/createWrapperAndAppendToBody"

type PortalType = {
  children: JSX.Element
  wrapperId: any
}

const Portal: React.FC<PortalType> = ({ children, wrapperId = "wrapper" }) => {
  const [wrapperElement, setWrapperElement] = useState<any>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export default Portal
