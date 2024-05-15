import React from 'react'

const generateProviderObject = (registeredProvider) => {
  let Obj = {}; let pivot = {}
  registeredProvider.map((Provider, i) => {
    if (i === 0) {
      Obj = { Component: Provider, children: null }
      pivot = Obj
    } else {
      pivot.children = { Component: Provider, children: null }
      pivot = pivot.children
    }
  })
  return Obj
}

const serializeProviderComponent = (Provider, lastChildren) => {
  const { Component, children } = Provider
  return (
    <Component>
      {children ? serializeProviderComponent(children, lastChildren) : lastChildren}
    </Component>
  )
}

export const generateComponent = (registeredProvider) => ({ children }) => {
  const providersObj = generateProviderObject(registeredProvider)
  return serializeProviderComponent(providersObj, children)
}
