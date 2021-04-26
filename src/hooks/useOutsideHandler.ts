import React, {useEffect} from "react";

const useOutsideHandler = (ref: React.MutableRefObject<any>, onClick: () => void) => {

    useEffect(() => {
        const handleOutsideClick: EventListener = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target)) onClick()
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [ref])
}

export default useOutsideHandler