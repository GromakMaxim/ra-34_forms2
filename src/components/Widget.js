import React, {Component} from "react";
import ActivityList from "./ActivityList";

export default class Widget extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentDate: '',
            currentDistance: 0,
            tasks: [
                {
                    date: '01.02.2012',
                    dist: 5.7,
                },
                {
                    date: '02.02.2012',
                    dist: 5.3,
                },

            ]
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDist = this.handleChangeDist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteListItem = this.deleteListItem.bind(this);
    }

    deleteListItem(e) {
        let idTarget = e.target.id;
        let newArr = this.state.tasks.filter(item => item.date !== idTarget);

        this.setState({
            tasks: newArr
        })
        console.log((idTarget))
    }

    handleSubmit(event) {
        event.preventDefault();

        // ищем пред. значение
        let found = this.state.tasks.filter(item => item.date === this.state.currentDate)[0];

        let resultObj;
        let arr;
        if (found !== null && found !== undefined) {
            found.dist += parseInt(this.state.currentDistance); // складываем дистанции

            resultObj = {
                date: this.state.currentDate,
                dist: found.dist,
            };

            arr = this.state.tasks.filter(item => item.date !== this.state.currentDate);
            arr.push(resultObj);
        } else {
            resultObj = {
                date: this.state.currentDate,
                dist: parseInt(this.state.currentDistance),
            };
            arr = this.state.tasks;
            arr.push(resultObj);
        }

        this.setState({
            tasks: arr,
        })
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
