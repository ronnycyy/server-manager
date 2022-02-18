import React from 'react'

function Select({ children, ...props }) {
    return (
        <select {...props} className="form-input">
            <option label={props.placeholder} value={null}>{props.placeholder}</option>
            {children}
        </select>
    )
}

Select.Option = function (props) {
    return <option {...props} label={props.children}></option>
}

export default Select
