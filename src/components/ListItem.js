import React from "react";

export default function ListItem(props) {

    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.dist}</td>
            <td className='flex-row'>
                <div id={props.date} className='delete' onClick={props.funcDel}>✘</div>
                <div className='edit'>✎</div>
            </td>
        </tr>
    )
}
