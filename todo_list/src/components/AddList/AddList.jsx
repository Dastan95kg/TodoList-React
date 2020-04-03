import React, { useState, useEffect } from 'react';
import plusSvg from '../../assets/img/more.svg';
import closeSvg from '../../assets/img/close.svg';
import { List, Badge } from '../../components';
import axios from 'axios';

import './AddList.scss';

const AddList = ({ colors, onAdd }) => {
    let [visiblePopup, setVisiblePopup] = useState(false);
    let [selectedColor, selectColor] = useState(1);
    let [inputValue, setInputValue] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor })
            .then(({ data }) => {
                let color = colors.find(c => c.id === selectedColor);
                const listObj = { ...data, color: { hex: color.hex, name: color.name }, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .catch(() => {
                alert('Ошибка при добавлении списка');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[{ icon: plusSvg, name: "Добавить список" }]}
            />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img
                        src={closeSvg} alt="Close button"
                        className="add-list__popup-close-btn"
                        onClick={onClose}
                    />
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Название списка"
                        className="field"
                    />
                    <div className="add-list__popup-colors">
                        {colors.map(color => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />))}
                    </div>
                    <button onClick={addList} className="button">
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddList;