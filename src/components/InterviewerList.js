import React from "react";
// import classnames from 'classnames/bind';
import "components/InterviewList.scss"
import InterviewListItem from "components/InterviewListItem"

export default function InterviewList(props) {
    const list = props.interviewers.map((item) => {
        return (
            <InterviewListItem 
                key={item.id}
                avatar={item.avatar}
                name={item.name}
                id={item.id}
                setInterviewer={props.onChange}
                selected={item.id === props.interviewer}
                ></InterviewListItem>
        )
    })
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {list}
            </ul>
        </section>
    );
}