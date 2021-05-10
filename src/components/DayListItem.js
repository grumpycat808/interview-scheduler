import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames/bind';

const formatSpots = (spots) => {
    if(spots === 0) {
        return 'no spots remaining'
    } else if (spots === 1) {
        return '1 spot remaining';
    } else {
        return `${spots} spots remaining`
    }
}
export default function DayListItem(props) {
    let listItemClass = classnames({
        'day-list__item': true,
        'day-list__item--selected': props.selected === true,
        'day-list__item--full': props.spots === 0
     })  
    return (
        <li className={listItemClass} onClick={() => props.setDay(props.name)} data-testid="day">
            <h2>{props.name}</h2> 
            <h3>{formatSpots(props.spots)}</h3>
        </li>
    );
}