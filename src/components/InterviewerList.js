import React from "react";
// import classnames from 'classnames/bind';
import "components/InterviewList.scss"
import InterviewListItem from "components/InterviewListItem"
import PropTypes from "prop-types"

function InterviewerList(props) {
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

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

export default InterviewerList;