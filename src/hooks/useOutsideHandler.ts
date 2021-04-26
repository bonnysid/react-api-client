import React, {useEffect} from "react";

const useOutsideHandler = (ref: React.MutableRefObject<any>, onClick: () => void,  btnRef?: React.MutableRefObject<any>) => {

    useEffect(() => {
        const handleOutsideClick: EventListener = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target) &&
            btnRef && btnRef.current && !btnRef.current.contains(e.target)) onClick()
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [ref, btnRef])
}

export default useOutsideHandler