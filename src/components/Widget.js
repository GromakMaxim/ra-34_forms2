import React, {Component} from "react";
import ActivityList from "./ActivityList";
import {format} from "date-fns";
import EditWindow from "./EditWindow";
import '../css/defaults.css';

export default class Widget extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false,
            modalDistance: '',
            modalDate: '',
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
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.modalSubmit = this.modalSubmit.bind(this);
        this.modalEditDate = this.modalEditDate.bind(this);
        this.modalEditDist = this.modalEditDist.bind(this);

    }

    async deleteListItem(e) {
        let idTarget = e.target.id;
        let newArr = this.state.tasks.filter(item => format(item.date, 'dd.MM.yyyy') !== idTarget);

        this.setState({
            tasks: newArr
        })
    }

    async showModal(e) {
        let idTarget = e.target.id;
        let found = this.state.tasks.filter(item => format(item.date, 'dd.MM.yyyy') === idTarget);

        this.setState({
            modal: true,
            modalDistance: parseFloat(found[0].dist),
            modalDate: format(found[0].date, 'yyyy-MM-dd')
        })
    }

    async hideModal(e) {
        this.setState({
            modal: false
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
        this.setState({
            currentDate: event.target.value,
        })
    }

    handleChangeDist(event) {
        this.setState({
            currentDistance: event.target.value,
        })
    }


    async modalSubmit() {

        let dateObj = await rawInputToDataObject(this.state.modalDate);
        console.log(dateObj)
        if (dateObj !== null && dateObj !== undefined) {
            let newObj = {
                date: dateObj,
                dist: parseFloat(this.state.modalDistance),
            }

            let arr = this.state.tasks.filter(item => format(item.date, 'yyyy-MM-dd') !== this.state.modalDate);
            arr.push(newObj);

            let sortedArr = arr.slice().sort((a, b) => b.date - a.date);

            this.setState({
                tasks: sortedArr,
            })

            this.setState({
                modal: false
            })
        }


    }

    modalEditDist(event) {
        this.setState({
            modalDistance: event.target.value,
        })
    }

    modalEditDate(event) {
        this.setState({
            modalDate: event.target.value,
        })
    }


    render() {
        let modal = null;
        if (this.state.modal) modal = <EditWindow
            mDist={this.state.modalDistance}
            mDate={this.state.modalDate}
            hideModal={this.hideModal}
            submit={this.modalSubmit}
            editDate={this.modalEditDate}
            editDist={this.modalEditDist}

        />;
        return (
            <div>
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

                    <ActivityList
                        data={this.state.tasks}
                        funcDel={this.deleteListItem}
                        funcEdit={this.showModal}
                        modalEditDist={this.handleChangeDist}
                        modalEditDate={this.handleChangeDate}
                    />
                </form>
                {modal}
            </div>
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
