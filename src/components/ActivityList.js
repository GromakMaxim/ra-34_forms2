import ListItem from "./ListItem";
import React from "react";

export default function ActivityList(props) {

    function renderTasks() {
        let arr = [];
        props.data.forEach(item => {
            arr.push(<ListItem key={item.id} date={item.date} dist={item.dist}/>)
        })
        return arr;
    }

    return (
        <table align='left'>
            <thead>
                <tr>
                    <th>Дата (ДД.ММ.ГГ)</th>
                    <th>Пройдено км</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {renderTasks()}
            </tbody>
        </table>
    );
}
