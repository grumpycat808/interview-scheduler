import React from "react";
import classnames from 'classnames/bind';
import "components/InterviewListItem.scss"
export default function InterviewListItem(props) {
    let interviewListItemClass = classnames({
        'interviewers__item': true,
        'interviewers__item--selected': props.selected
    })
    return (
        <li className={interviewListItemClass} onClick={() => props.setInterviewer(props.id)}>
            <img
                className="interviewers__item-image"
                src={props.avatar}
                alt={props.name}
            />
            {props.name}
        </li>
    );
}