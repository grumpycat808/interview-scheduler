import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames/bind';

export default function DayListItem(props) {
    let listItemClass = classnames({
        'day-list__item': true,
        'day-list__item--selected': props.selected,
        'day-list__item--full': props.full
     })  
    return (
        <li className={listItemClass}>
            <h2>{props.name}</h2> 
            <h3>{props.spots} spots remaining</h3>
        </li>
    );
}