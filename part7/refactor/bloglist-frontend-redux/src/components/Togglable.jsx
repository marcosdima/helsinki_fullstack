import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '../styles'

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
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="toggle-on">
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </>
  )

})

Togglable.displayName = 'Togglable'

export default Togglable