import React from "react";
// import "components/DayListItem.scss";
import classnames from 'classnames/bind';
import DayListItem from "components/DayListItem"

export default function DayList(props) { 
    const dayList = props.days.map((day) => {
        return ( 
            <DayListItem
                name={day.name}
                spots={day.spots}
                selected={day.name === props.day}
                setDay={props.setDay}    
            >
            </DayListItem>
        );
    })
    return (
    <ul>{dayList}</ul>
    );
}