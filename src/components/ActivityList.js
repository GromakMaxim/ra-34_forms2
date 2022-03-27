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
        <div>
            <div className='list-headers flex-row'>
                <div className='list-headers-date'>Дата (ДД.ММ.ГГ)</div>
                <div className='list-headers-dist'>Пройдено км</div>
                <div className='list-headers-controls'>Действия</div>
            </div>
            <div className='list flex-col'>
                {renderTasks()}
            </div>
        </div>
    );
}
