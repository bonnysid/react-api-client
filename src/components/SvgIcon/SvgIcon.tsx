import React from 'react';
import icons from '../../../assets/img/icons.svg';

interface SvgIconProps {
    width?: string,
    height?: string,
    fillColor?: string,
    urlId: string,
    fullUrl?: string,
    className?: string,
}

const SvgIcon: React.FC<SvgIconProps> = ({width = '25px', height = '25px', fillColor = '#000000', urlId, fullUrl, className}) => {
    return (
        <svg className={className} width={width} height={height} fill={fillColor}>
            <use xlinkHref={fullUrl ? fullUrl : `${icons}#${urlId}`} />
        </svg>
    )
}

export default SvgIcon;