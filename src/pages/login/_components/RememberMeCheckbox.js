import React from 'react'

function RememberMeCheckbox({ checked, onChange }) {
    return (
        <label className='our-selectable-text' id='remember-me'> <input type="checkbox" checked={checked} onChange={onChange} /> Zapamiętaj mnie </label>
    )
}

export default RememberMeCheckbox;