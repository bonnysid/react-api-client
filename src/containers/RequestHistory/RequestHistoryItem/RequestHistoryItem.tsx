import React, {FC, useRef, useState} from 'react'
import {IDropdownStyles, IHistoryItem, QuerySendsay} from "../../../types/types";
import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import s from './RequestHistoryItem.module.css';
import {useActions} from "../../../hooks/useActions";
import useOutsideHandler from "../../../hooks/useOutsideHandler";
import ModalPortal from "../../ModalPortal/ModalPortal";
import DropdownHistoryItem from "./HistoryItemDropdown/DropdownHistoryItem";
import dots from '../../../assets/icons/dots.svg'
export interface RequestHistoryItemProps {
    item: IHistoryItem,
    execQuery: (value: QuerySendsay) => void
}

const RequestHistoryItem: FC<RequestHistoryItemProps> = ({item, execQuery}) => {
    const dropdownStylesRef = useRef<IDropdownStyles>()
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownBtnRef = useRef<HTMLButtonElement>(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const {removeQueryFromHistory} = useActions()


    const deleteQuery = () => removeQueryFromHistory({id: item.id})

    const openDropdownMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.closest("div")!.getBoundingClientRect();
        const left = rect.x + rect.width - 110
        dropdownStylesRef.current ={
            left: left < 0 ? rect.x : left,
            top: rect.y + window.scrollY + rect.height,
            width: rect.width
        }
        toggleModal()
    }

    const toggleModal = () => setIsOpenModal(prevState => !prevState)

    const copyQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
        const copyied = document.createElement('div')
        copyied.classList.add(s.copied)
        copyied.innerText = 'Скопировано'
        containerRef.current!.prepend(copyied)
        setTimeout(() => containerRef.current!.removeChild(copyied), 1500)
        navigator.clipboard.writeText(JSON.stringify(item.content, null, 2))
        toggleModal()
    }

    const invokeQuery = () => {
        toggleModal()
        execQuery(item.content)
    }

    return (

        <div ref={containerRef} className={s.container}>
            <div className={`${s.status} ${item.isSuccess ? 'bg-green' : 'bg-red'}`}/>
            <span className={s.action}>{item.action}</span>
            <button className={s.toggleBtn} ref={dropdownBtnRef} onClick={openDropdownMenu}>
                <img className={s.icon} src={dots} alt=""/>
            </button>
            {isOpenModal &&
            <ModalPortal>
                <DropdownHistoryItem
                    toggleModal={toggleModal}
                    invokeQuery={invokeQuery}
                    copyQuery={copyQuery}
                    deleteQuery={deleteQuery}
                    style={dropdownStylesRef.current!}
                    btnRef={dropdownBtnRef}
                />
            </ModalPortal>}
        </div>


    )
}

export default RequestHistoryItem