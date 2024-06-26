import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const marginLeft = 10
  const hideWhenVisible = { display: visible ? 'none' : '', marginLeft }
  const showWhenVisible = { display: visible ? '' : 'none', marginLeft }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (props.onClick) props.onClick()
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible} className="toggle-off">
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggle-on">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )

})

Togglable.displayName = 'Togglable'

export default Togglable