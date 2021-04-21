import React from "react";
import Show from "components/Appointments/Show"
import Header from "components/Appointments/Header"
import Empty from "components/Appointments/Empty"
import Form from "components/Appointments/Form"
import "components/Appointments/styles.scss"
// import classnames from 'classnames/bind';
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

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
   transition(SAVING);
   props.bookInterview(props.id, interview)
         .then(() => transition(SHOW));
 }

 function handleDelete() {
   transition(CONFIRM);
 }

 function deleteInterview(){
   transition(DELETING);
   props.deleteInterview(props.id)
         .then(()=> transition(EMPTY))
 }

 
   return (
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={onAdd} />}
         {mode === SHOW && (
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer}
               onDelete={handleDelete}
               onEdit={() => transition(CREATE)}
            />
         )}
         {mode === CREATE && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={onCancel} onConfirm={save}/>}
         {mode === CONFIRM && <Confirm message="Delete appointment?" onCancel={onCancel} onConfirm={deleteInterview}/>}
         {mode === DELETING && <Status message="Deleting..."/>}
         {mode === SAVING && <Status message="Saving..."/>}
      </article>
 );
}
