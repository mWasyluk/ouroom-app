import './_styles/style.css'

import { useEffect, useLayoutEffect, useState } from 'react';

import { createPortal } from 'react-dom';

export const ModalPositions = {
    CENTER: 'center',
    TOP: 'top',
}

const modalRootId = 'modal-root';

const appendAndGetModalRootById = (id) => {
    let modalRoot = document.getElementById(id);
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', id);
        document.body.appendChild(modalRoot);
    }
    return modalRoot;
}

export default function ModalPortal({
    id = modalRootId,
    position = ModalPositions.TOP,
    onBgClick = () => { },
    onFgClick = () => { },
    onKeyDown = () => { },
    style = {},
    children,
}) {
    const [modalRoot, setModalRoot] = useState(null);

    const handleClick = e => {
        if (e.target.id === 'modal-bg') {
            onBgClick();
        } else {
            onFgClick();
        }
    }

    useLayoutEffect(() => {
        let wrapper = document.getElementById(id);
        let systemCreated = false;

        if (!wrapper) {
            systemCreated = true;
            wrapper = appendAndGetModalRootById(id);
        }

        setModalRoot(wrapper);

        return () => {
            console.log(systemCreated, wrapper.parentNode)
            if (systemCreated && wrapper.parentNode) {
                console.log('removing')
                wrapper.parentNode.removeChild(wrapper);
            } else console.log('cannot remove')
        }
    }, [id])

    useEffect(() => {
        const handleKeyDown = e => {
            e.preventDefault();
            onKeyDown(e.key);
        }

        window.addEventListener('keydown', handleKeyDown);
        const lastFocused = document.activeElement;
        lastFocused.blur();
        return function cleanup() {
            lastFocused.focus();
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onKeyDown])

    return (
        modalRoot
            ? createPortal(
                <div className='modal-background' id='modal-bg' onClick={handleClick} >
                    <div className={`modal-container ${position}`} style={style}>
                        {children}
                    </div >
                </div >,
                modalRoot)
            : ""
    )
}