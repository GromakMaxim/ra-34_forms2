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
                let found = this.state.tasks.filter(item => format(item.date, 'dd.MM.yyyy') === this.state.currentDate)[0];

                let resultObj;
                let arr;
                if (found !== null && found !== undefined) {
                    found.dist += parseFloat(this.state.currentDistance); // складываем дистанции

                    resultObj = {
                        date: dateObj,
                        dist: found.dist,
                    };

                    arr = this.state.tasks.filter(item => format(item.date, 'dd.MM.yyyy') !== this.state.currentDate);
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
                        <input type='text' onChange={this.handleChangeDate}/>
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
    let result = await parseDate(rawDate);
    if (result === null || result === undefined) return null;

    let d = result.split(".")[0];
    let m = result.split(".")[1];
    let y = result.split(".")[2];

    return new Date(y, m - 1, d);
}

async function parseDate(str) {
    let regex1 = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/; // dd.mm.yyyy
    let regex2 = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; // dd/mm/yyyy
    let regex3 = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/; // dd-mm-yyyy

    if (regex1.test(str)) return str;
    else if (regex2.test(str)) {
        str = str.replaceAll("/", ".");
        return str
    } else if (regex3.test(str)) {
        str = str.replaceAll("-", ".");
        return str
    }
    return null;
}
