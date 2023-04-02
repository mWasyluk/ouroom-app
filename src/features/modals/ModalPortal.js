import './style.css'

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
    closeButton,
    onClose,
    onKeyDown,
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
            removeModal(systemCreated, wrapper);
        }
    }, [id])

    const removeModal = (systemCreated, wrapper) => {
        if (systemCreated && wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
        }
    }

    useEffect(() => {
        if (!onKeyDown) return;

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
                        {closeButton
                            ? <label className='close-button'
                                onClick={() => onClose ? onClose() : removeModal(true, document.getElementById(id))}
                            >X</label>
                            : <></>}
                        {children}
                    </div >

                </div >,
                modalRoot)
            : ""
    )
}