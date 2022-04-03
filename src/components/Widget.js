import React, {Component} from "react";
import ActivityList from "./ActivityList";
import {format} from "date-fns";

export default class Widget extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentDate: '',
            currentDistance: 0,
            tasks: [
                {
                    date: new Date(2022, 1, 3),
                    dist: 5.7,
                },
                {
                    date: new Date(2022, 2, 2),
                    dist: 5.3,
                },

            ]
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDist = this.handleChangeDist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteListItem = this.deleteListItem.bind(this);
    }

    async deleteListItem(e) {
        let idTarget = e.target.id;
        let newArr = this.state.tasks.filter(item => format(item.date, 'dd.MM.yyyy') !== idTarget);

        this.setState({
            tasks: newArr
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        let dateObj = await rawInputToDataObject(this.state.currentDate);
        if (dateObj !== null) {
            let possibleDistance = parseFloat(this.state.currentDistance);

            if (!isNaN(possibleDistance) && possibleDistance >= 0) {
                // ищем пред. значение
                let found = this.state.tasks.filter(item => format(item.date, 'yyyy-MM-dd') === this.state.currentDate)[0];

                let resultObj;
                let arr;
                if (found !== null && found !== undefined) {
                    found.dist += parseFloat(this.state.currentDistance); // складываем дистанции

                    resultObj = {
                        date: dateObj,
                        dist: found.dist,
                    };

                    arr = this.state.tasks.filter(item => format(item.date, 'yyyy-MM-dd') !== this.state.currentDate);
                    arr.push(resultObj);
                } else {
                    resultObj = {
                        date: dateObj,
                        dist: parseFloat(this.state.currentDistance),
                    };
                    arr = this.state.tasks;
                    arr.push(resultObj);
                }

                let sortedArr = arr.slice().sort((a, b) => b.date - a.date);

                this.setState({
                    tasks: sortedArr,
                })
            }
        }


    }

    handleChangeDate(event) {
        console.log(event.target.value);
        this.setState({
            currentDate: event.target.value,
        })
    }

    handleChangeDist(event) {
        this.setState({
            currentDistance: event.target.value,
        })
    }

    render() {
        return (
            <form className='myForm flex-col' onSubmit={this.handleSubmit}>
                <div className='form-controls flex-row'>
                    <div className='form-controls-col flex-col'>
                        <div>Дата (ДД.ММ.ГГ)</div>
                        <input type='date' onChange={this.handleChangeDate}/>
                    </div>

                    <div className='form-controls-col flex-col'>
                        <div>Пройдено км</div>
                        <input type='text' onChange={this.handleChangeDist}/>
                    </div>

                    <div className='form-controls-col flex-col'>
                        <input className='ok-btn' type='submit' value='OK'/>
                    </div>

                </div>

                <ActivityList data={this.state.tasks} funcDel={this.deleteListItem}/>
            </form>
        );
    }
}

async function rawInputToDataObject(rawDate) {
    if (rawDate.length !== 10) return null;
    let d = rawDate.split("-")[2];
    let m = rawDate.split("-")[1];
    let y = rawDate.split("-")[0];

    return new Date(y, m - 1, d)
}
