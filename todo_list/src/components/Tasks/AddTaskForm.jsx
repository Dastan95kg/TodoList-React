import React, { useState } from 'react';

import moreSvg from '../../assets/img/more.svg';
import axios from 'axios';

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        if (!inputValue.trim()) {
            return;
        }

        const newTask = {
            listId: list.id,
            text: inputValue.trim(),
            completed: false
        };
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', newTask)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="tasks__form">
            {!visibleForm
                ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={moreSvg} alt="Plus icon" />
                    <span>Новая задача</span>
                </div>
                : <div className="tasks__form-block">
                    <input
                        type="text"
                        placeholder="Текст задачи"
                        className="field"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
                </div>
            }
        </div>
    );
};

export default AddTaskForm;