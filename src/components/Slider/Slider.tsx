import React, {FC, useRef} from "react";
import s from './Slider.module.css'


const Slider: FC = ({children}) => {
    const slider = useRef<HTMLDivElement | null>(null)
    const startX = useRef(0)
    const isDown = useRef(false)
    const translate = useRef(0)
    const offsetLeft = useRef(0)

    const onSliderMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = true
        startX.current = e.pageX - slider.current!.offsetLeft
    }

    const isRightSliderEnd = () => {
        if (translate.current < Math.round(-slider.current!.offsetWidth / 2 - 20)) {
            translate.current = Math.round(-slider.current!.offsetWidth / 2 - 20)
            slider.current!.style.transform = `translate(${translate.current}px)`
            return true
        }
        return false
    }

    const isLeftSliderEnd = () => {
        if (translate.current < 0) {
            translate.current = 0
            slider.current!.style.transform = `translate(${translate.current}px)`
            return true
        }
        return false
    }

    const onSliderMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDown.current) return
        e.preventDefault()
        const x = e.pageX - offsetLeft.current
        const walk = x - startX.current
        translate.current = Math.sign(walk) === -1 ? translate.current - 5 : translate.current + 5

        if (isRightSliderEnd()) return
        else if(isLeftSliderEnd()) return

        slider.current!.style.transform = `translate(${translate.current}px)`
    }

    const onSliderMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = false
    }

    const onSliderMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isDown.current = false
    }

    const onSliderScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const walk = e.deltaY
        translate.current = Math.sign(walk) === -1 ? translate.current - 20 : translate.current + 20

        if (isRightSliderEnd()) return
        else if(isLeftSliderEnd()) return

        slider.current!.style.transform = `translate(${translate.current}px)`
    }

    return (
            <div
                ref={slider}
                onMouseDown={onSliderMouseDown}
                onMouseLeave={onSliderMouseLeave}
                onMouseMove={onSliderMouseMove}
                onMouseUp={onSliderMouseUp}
                onWheel={onSliderScroll}
                className={s.items}>
                {children}
            </div>
    )
}

export default Slider