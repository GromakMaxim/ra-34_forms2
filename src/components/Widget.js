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
                    dist: '5.7',
                },
                {
                    date: '02.02.2012',
                    dist: '5.3',
                },

            ]
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDist = this.handleChangeDist.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteListItem = this.deleteListItem.bind(this);
    }

    deleteListItem(e){
        let idTarget = e.target.id;
        let newArr = this.state.tasks.filter(item => item.date !== idTarget);

        this.setState({
            tasks: newArr
        })
        console.log((idTarget))
    }

    handleSubmit(event) {
        event.preventDefault();
        let obj = {
            date: this.state.currentDate,
            dist: this.state.currentDistance,
        };

        let arr = this.state.tasks;
        arr.push(obj);


        this.setState({
            currentDate: '',
            currentDistance: 0,
            tasks: arr,
        })
    }

    handleChangeDate(event) {
        console.log('date: ' + event.target.value)
        this.setState({
            currentDate: event.target.value,
        })
    }

    handleChangeDist(event) {
        console.log('dist: ' + event.target.value)
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
