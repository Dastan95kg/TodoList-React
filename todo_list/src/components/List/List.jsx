import React from 'react';
import Badge from '../Badge/Badge';
import classNames from 'classnames';
import axios from 'axios';

import closeSvg from '../../assets/img/close.svg';
import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (list) => {
        if (window.confirm(`Вы действительно хотите удалить "${list.name}"?`)) {
            axios.delete('http://localhost:3001/lists/' + list.id)
                .then(() => {
                    onRemove(list.id);
                });
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, { active: activeItem && activeItem.id === item.id })}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon
                            ? <img src={item.icon} alt="List icon" />
                            : <Badge color={item.color.name} />
                        }
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable &&
                        <img
                            className="list__remove-icon"
                            onClick={() => removeList(item)}
                            src={closeSvg} alt="Close icon"
                        />
                    }
                </li>
            ))
            }
        </ul >
    );
};

export default List;