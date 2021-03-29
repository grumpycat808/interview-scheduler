import React from "react";
import Show from "components/Appointments/Show"
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import "components/Appointments/styles.scss"
import classnames from 'classnames/bind';

export default function Appointment(props) {

   return (
      <article className="appointment">
         <Header time={props.time} />
         {props.interview ? (
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer}
            />
         ) : (
            <Empty />
         )}
      </article>
 );
}
