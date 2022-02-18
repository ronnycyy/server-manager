import React from 'react'

import './style.css'

function Index({ children, label, required }) {
    return (
        <div className="form-item">
            <div className="form-item-name">
                {required ? <span style={{ color: 'red' }} >*</span> : null}
                {label}
            </div>
            {children}
        </div>
    )
}

export default Index