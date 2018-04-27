var React = require('react')

// Build a key to store instance
var nonStateless = typeof Symbol !== 'function' ? '$__nonStateless' : Symbol()

/**
 * Create React.PureComponent class with specified rendering function.
 *
 * @param {function} render
 * @returns {function}
 */
function createReactClass (render) {
  // Build constructor
  function Component () {
    React.PureComponent.apply(this, arguments)
  }

  // Inherit React.PureComponent
  Component.prototype = Object.create(React.PureComponent.prototype)
  Component.prototype.constructor = Component

  // Attach render function
  Component.prototype.render = function () {
    render(this.props)
  }

  return Component
}

/**
 * Create instantiable React element which can use 'ref's.
 *
 * @param {React.Element} element
 * @returns {React.Element}
 */
function createInstantiableElement (element) {
  // Ignore element when it doesn't exist
  if (!element) {
    return element
  }

  // Find component used for this element
  var render = element.type

  // Ignore element when it's already stateful or it's HTML tag, i.e. <div>
  if (typeof render !== 'function' || render.prototype.render) {
    return element
  }

  // When non-stateless version hasn't been prepared yet, do it.
  if (!render[nonStateless]) {
    // Build PureComponent out of stateless one
    var Cls = createReactClass(render)

    // Define displayName getter to properly pass component name
    Object.defineProperty(Cls, 'displayName', {
      get: function () {
        return render.displayName || render.name
      }
    })

    // Cache non-stateless version of component
    Object.defineProperty(Cls, nonStateless, {
      enumerable: false,
      value: Cls
    })
  }

  // Build new props
  var props = Object.assign({}, element.props)

  // Attach 'ref' to them if exists
  if (element.ref) {
    props.ref = element.ref
  }

  // Clone element
  return React.createElement(Cls[nonStateless], props)
}

module.exports = createInstantiableElement
