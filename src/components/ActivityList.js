import ListItem from "./ListItem";
import React from "react";

export default function ActivityList(props) {


    function renderTasks() {
        let arr = [];
        let sortedArr = props.data.slice().sort((a, b) => b.date - a.date);
        sortedArr.forEach(item => {
            arr.push(<ListItem
                key={item.date.getTime()}
                date={item.date}
                dist={item.dist}
                funcDel={props.funcDel}
                funcEdit={props.funcEdit}
            />)
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
