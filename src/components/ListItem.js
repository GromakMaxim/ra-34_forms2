import React from "react";
import {format} from 'date-fns'

export default function ListItem(props) {
    let visibleDate = format(props.date, 'dd.MM.yyyy');

    return (

        <tr>
            <td>{visibleDate}</td>
            <td>{props.dist}</td>
            <td className='flex-row'>
                <div id={visibleDate} className='delete' onClick={props.funcDel}>✘</div>
                <div id={visibleDate} className='edit' onClick={props.funcEdit}>✎</div>
            </td>
        </tr>
    )
}
