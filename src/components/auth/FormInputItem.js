import React, { useEffect, useState } from 'react'

export default function FormInputItem({ addClassName, name, type, placeholder, errorMessage, clearError }) {
    const [displayError, setDisplayError] = useState();

    useEffect(() => {
        setDisplayError(errorMessage ? true : false)
    }, [errorMessage])

    return (
        <div className='our-form-item'>
            <input
                className={`our-input${addClassName ? ' ' + addClassName : ''}${displayError ? ' error' : ''}`}
                type={type ? type : "text"}
                name={name}
                placeholder={placeholder}
                onChange={(e) => {
                    setDisplayError(false);
                    setTimeout(clearError, 200);
                }} />
            <span className={displayError ? 'error' : ''}>{errorMessage}</span>
        </div>
    )
}