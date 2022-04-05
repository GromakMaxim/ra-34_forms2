import React from "react";

export default function EditWindow(props) {


    return (
        <div className='modal-edit b1'>
            <div className='modal-fields flex-col'>
                <h3>Редактирование записи</h3>
                Дата: <input type='date' defaultValue={props.mDate} onChange={props.editDate}/>
                Дистанция: <input type='' min='0' defaultValue={props.mDist} onChange={props.editDist}/>
            </div>
            <div className='modal-controls flex-row'>
                <div>
                    <button id='ok' onClick={props.submit}>OK</button>
                    <button id='cancel' onClick={props.hideModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
