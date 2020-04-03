import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AddTaskForm, Task } from '../../components';

import editSvg from '../../assets/img/edit.svg';
import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, withoutEmpty, onCompleteTask }) => {

    const onEdit = () => {
        let newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Не удалось обновить название списка');
                });
        }
    };

    return (
        <div className="tasks">
            <Link to={`lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={onEdit} src={editSvg} alt="Edit icon" />
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks &&
                    list.tasks.map(task =>
                        <Task key={task.id}
                            {...task}
                            onEdit={onEditTask}
                            onRemove={onRemoveTask}
                            list={list}
                            onComplete={onCompleteTask}
                        />
                    )
                }
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    );
};

export default Tasks;