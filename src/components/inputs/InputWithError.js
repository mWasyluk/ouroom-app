import React, { useEffect, useState } from 'react'

export default function InputWithError(props) {
    const {
        addClassName,
        errorMessage,
        clearError = () => { },
        ...restOfProps
    } = props;

    const [displayError, setDisplayError] = useState();

    useEffect(() => {
        setDisplayError(errorMessage ? true : false)
    }, [errorMessage])

    return (
        <div className='our-form-item'>
            <input
                className={`our-input${addClassName ? ' ' + addClassName : ''}${displayError ? ' error' : ''}`}
                onChange={(e) => {
                    setDisplayError(false);
                    setTimeout(clearError, 200);
                }}
                {...restOfProps}
            />
            <span className={displayError ? 'error' : ''}>{errorMessage}</span>
        </div>
    )
}