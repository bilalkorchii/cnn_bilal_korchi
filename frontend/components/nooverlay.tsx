'use client'

import { Component, ReactNode } from 'react'

export class NoDevOverlay extends Component<{ children: ReactNode }> {
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Hydration error caught:', error)
  }

  render() {
    return this.props.children
  }
}
