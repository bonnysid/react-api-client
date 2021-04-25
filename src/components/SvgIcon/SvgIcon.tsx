import React from 'react';
import icons from '../../assets/icons/icons.svg';
import s from './SvgIcon.module.css'

interface SvgIconProps {
    width?: string,
    height?: string,
    fillColor?: string,
    urlId: string,
    fullUrl?: string,
    className?: string,
}

const SvgIcon: React.FC<SvgIconProps> = ({width = '25px', height = '25px', fillColor = '#000000', urlId, fullUrl, className}) => {
    const styles = className ? {className} : {
        width,
        height,
        fill:fillColor
    }

    return (
        <svg className={className || ''}>
            <use xlinkHref={fullUrl ? fullUrl : `${icons}#${urlId}`} />
        </svg>
    )
}

export default SvgIcon;