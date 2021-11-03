import React from 'react';
import style from '../../styles/loader.module.scss';

function Loading({ smallSize, largeSize }) {
    return (
        <div className={style.loader} style={{width: largeSize, height: largeSize }} >
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
            <div style={{width: smallSize, height: smallSize }}></div>
        </div>
    )
}

export default Loading;