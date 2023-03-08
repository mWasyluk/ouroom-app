import ModalPortal from "../components/modals/ModalPortal";
import { ModalStringValues } from "../components/modals/_data/data"
import { createRoot } from "react-dom/client";

const ModalUtils = {
    pushSimpleInfoTopModal(child) {
        const id = 'info-modal-root';
        const [root, onClose] = getModalRoot(id);

        root.render(
            <ModalPortal id={id} onBgClick={onClose} onKeyDown={onClose}>
                <p className="modal-header">{ModalStringValues.info_modal_title}</p>
                {child}
            </ModalPortal>
        );
    }
}

const getModalRoot = (id) => {
    let modalRoot = document.getElementById(id);
    if (modalRoot) {
        console.warn("Dismiss the current modal before pushing the next one.")
        return;
    } else {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', id);
        document.body.appendChild(modalRoot);
    }

    const root = createRoot(modalRoot);

    const onClose = () => {
        modalRoot.parentNode.removeChild(modalRoot);
        root.unmount();
    }

    return [root, onClose];
}

export default ModalUtils;