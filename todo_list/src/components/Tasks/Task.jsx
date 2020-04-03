import React from 'react';

import editSvg from '../../assets/img/edit.svg';
import deleteSvg from '../../assets/img/delete.svg';

const Task = ({ list, id, text, completed, onRemove, onEdit, onComplete }) => {

    const onChangeCheckbox = (e) => {
        onComplete(id, list.id, e.target.checked);
    };

    return (
        <div key={id} className='tasks__items-row'>
            <div className="checkbox">
                <input onChange={onChangeCheckbox}
                    id={`task-${id}`}
                    type="checkbox"
                    checked={completed}
                />
                <label htmlFor={`task-${id}`}>
                    <svg id="Capa_1" enableBackground="new 0 0 515.556 515.556"
                        height="512" viewBox="0 0 515.556 515.556" width="512"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z" />
                    </svg>
                </label>
            </div>
            <p className={completed && 'done'}>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={() => onEdit(list.id, { id, text })} className="tasks__items-row-actions-edit">
                    <img src={editSvg} alt="Edit icon" />
                </div>
                <div onClick={() => onRemove(list.id, id)} className="tasks__items-row-actions-delete">
                    <img src={deleteSvg} alt="Delete icon" />
                </div>
            </div>
        </div >
    );
};

export default Task;