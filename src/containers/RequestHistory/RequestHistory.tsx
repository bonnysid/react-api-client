import React, {FC, useRef} from "react";
import s from './RequestHistory.module.css'
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistoryItem from "./RequestHistoryItem/RequestHistoryItem";
import {useActions} from "../../hooks/useActions";
import {QuerySendsay} from "../../types/types";
import ScrollMenu from "react-horizontal-scrolling-menu";

export interface RequestHistoryProps {
    execQuery: (value: QuerySendsay) => void
}

const RequestHistory: FC<RequestHistoryProps> = ({execQuery}) => {
    const {history, loading, response} = useTypedSelector(state => state.console)
    const {clearAllQueries} = useActions()
    const slider = useRef<HTMLDivElement | null>(null)
    const startX = useRef(0)
    const isDown = useRef(false)
    const translate = useRef(0)
    const offsetLeft = useRef(0)

    const historyElements = [...history.items].reverse().map(item => <RequestHistoryItem execQuery={execQuery} key={item.id} item={item}/>)

    const onSliderMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = true
        startX.current = e.pageX - slider.current!.offsetLeft
    }

    const onSliderMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!isDown.current) return
        e.preventDefault()
        const x = e.pageX - offsetLeft.current
        const walk = x - startX.current
        console.log(`${translate.current} + ${walk} = ${translate.current + walk}`)
        translate.current = Math.sign(walk) === -1 ? translate.current - 5 : translate.current + 5
        if(translate.current < Math.round(-slider.current!.offsetWidth / 2)) {
            translate.current = Math.round(-slider.current!.offsetWidth / 2)
            slider.current!.style.transform = `translate(${translate.current}px)`
            return
        }
        else if (translate.current > 0) {
            translate.current = 0
            slider.current!.style.transform = `translate(${translate.current}px)`
            return
        }
        slider.current!.style.transform = `translate(${translate.current}px)`
    }

    const onSliderMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = false
    }

    const onSliderMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = false
    }

    const onSliderScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    }

    return (
        <div className={s.container}>
            {/*<ScrollMenu*/}
            {/*    data={historyElements}*/}
            {/*    dragging={true}*/}
            {/*/>*/}
            <div
                ref={slider}
                onMouseDown={onSliderMouseDown}
                onMouseLeave={onSliderMouseLeave}
                onMouseMove={onSliderMouseMove}
                onMouseUp={onSliderMouseUp}
                onWheel={onSliderScroll}
                className={s.items}>
                {historyElements}
            </div>
            <button onClick={clearAllQueries} className={s.deleteBtn}><SvgIcon className={s.icon} urlId={'cross'}/></button>
        </div>
    )
}

export default RequestHistory