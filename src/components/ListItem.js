import React from "react";

export default function ListItem(props) {
    return (
        <div className='listItem flex-row'>
            <div className='date'>{props.date}</div>
            <div className='distance'>{props.dist}</div>
            <div className='controls flex-row'>
                <div className='controls-edit'>✘</div>
                <div className='controls-delete'>✎</div>
            </div>
        </div>
    )
}
