import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { CSSProperties } from "react";
import '../Loading/Loading.css';



function Loading(props) {
    const w = 6;
    const h = 100;
    const r= 2;
    const c = '#DD3704';
    const m = 8;

    return (
        <div className='div-loader'>
            <ScaleLoader
                loading={props.loading}
                width={w}
                height={h}
                radius={r}
                margin={m}
                color={c}
                
            />
            <ScaleLoader
                loading={props.loading}
                width={w}
                height={h}
                radius={r}
                margin={m}
                color={c}
            />
            <ScaleLoader
                loading={props.loading}
                width={w}
                height={h}
                radius={r}
                margin={m}
                color={c}
            />
        </div>
    )
}
export default Loading;