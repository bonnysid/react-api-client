import {FC, useEffect} from "react";
import ReactDOM from "react-dom";

export interface ModalPortalProps {
    el?: string
    className?: string
}

const ModalPortal: FC<ModalPortalProps> = ({
                                               children,
                                               el = 'div',
                                               className = 'root-modal',
                                           }) => {
    const root = document.createElement(el)
    root.classList.add(className)

    useEffect(() => {
        document.body.appendChild(root)
        return () => {
            document.body.removeChild(root)
        }
    }, [])

    return ReactDOM.createPortal(children, root)
}

export default ModalPortal