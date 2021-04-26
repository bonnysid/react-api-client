import React, {FC, useRef} from "react";
import s from "../RequestHistoryItem.module.css";
import useOutsideHandler from "../../../../hooks/useOutsideHandler";
import {IDropdownStyles} from "../../../../types/types";

export interface DropdownHistoryItemProps {
    toggleModal: () => void
    invokeQuery: () => void
    copyQuery: (e: React.MouseEvent<HTMLButtonElement>) => void
    deleteQuery: () => void
    style: IDropdownStyles
    btnRef: React.RefObject<HTMLButtonElement>
}

const DropdownHistoryItem: FC<DropdownHistoryItemProps> = ({btnRef,toggleModal, invokeQuery, copyQuery, deleteQuery, style}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useOutsideHandler(modalRef, toggleModal, btnRef)

    return (
        <div ref={modalRef} className={s.modal} style={{...style}}>
            <div className={s.modal__block}>
                <button onClick={invokeQuery} className={`${s.modal__btn} bg-blue-hover`}>Выполнить</button>
                <button onClick={copyQuery} className={`${s.modal__btn} bg-blue-hover`}>Скопировать</button>
            </div>
            <div className={s.modal__block}>
                <button onClick={deleteQuery} className={`${s.modal__btn} bg-red-hover`}>Удалить</button>
            </div>
        </div>
    )
}

export default DropdownHistoryItem