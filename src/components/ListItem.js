import React from "react";

export default function ListItem(props) {
    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.dist}</td>
            <td className='flex-row'>
                <div className='delete'>✘</div>
                <div className='edit'>✎</div>
            </td>
        </tr>
    )
}
