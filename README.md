# Create stateless React component with instance

Create stateless React component with instance, to use `ref`s, even before React 16.3.

If you are using React 16.3+, you can use [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html) instead.

## Example

```
import React from 'react'
import { findDOMNode } from 'react-dom'
import createInstantiableElement from 'react-stateless-with-instance'

class Wrapper extends React.PureComponent {
  setRef (node) {
    console.log('Just received inner DOM node!', findDOMNode(node))
  }

  render () {
    const { children } = this.props

    const element = React.Children.only(children)
    const instantiableElement = createInstantiableElement(element)
    const nextElement = React.cloneElement(
      instantiableElement,
      ref => this.setRef(ref)
    )

    return (
      <div className='some-optional-wrapper'>
        {nextElement}
      </div>
  }
}
function Wrapper (props) {
  const { children } = props

  let ref
  const set

  const element = React.Children.only(children)
}
```

## Requirements

Everything is written in ES5. To make it working in IE8, you need polyfills for ES5, especially:

- `Object.assign`
- `Object.defineProperty`
- `Object.create`
