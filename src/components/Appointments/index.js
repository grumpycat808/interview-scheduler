import React from "react";
import Show from "components/Appointments/Show"
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import Form from "components/Appointments/Form"
import "components/Appointments/styles.scss"
import classnames from 'classnames/bind';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
const { mode, transition, back } = useVisualMode(
   props.interview ? SHOW : EMPTY
 );

 const onAdd = () => {
    transition(CREATE)
 }

 const onCancel = () => {
   back();
 }

 function save(name, interviewer) {
   const interview = {
     student: name,
     interviewer
   };
   console.log("Saved", name, interviewer)
 }
 
   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={onAdd} />}
         {mode === SHOW && (
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer}
            />
         )}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} onConfirm={save}/>}

      </article>
 );
}
