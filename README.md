# Create stateless React component with instance

Create stateless React component with instance, to use `ref`s, even before React 16.3.

If you are using React 16.3+, you can use [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html) instead.

## Example

```js
import React from 'react'
import { findDOMNode } from 'react-dom'
import createInstantiable from 'react-instantiable-stateless'

class Wrapper extends React.PureComponent {
  setRef (node) {
    console.log('Just received inner DOM node!', findDOMNode(node))
  }

  render () {
    const { children } = this.props

    const element = React.Children.only(children)
    const instantiableElement = createInstantiable(element)
    const nextElement = React.cloneElement(
      instantiableElement,
      { ref: node => this.setRef(node) }
    )

    return (
      <div className='some-optional-wrapper'>
        {nextElement}
      </div>
    )
  }
}
```

## Requirements

Everything is written in ES5. To make it working in IE8, you need polyfills for ES5, especially:

- `Object.assign`
- `Object.defineProperty`
- `Object.create`
