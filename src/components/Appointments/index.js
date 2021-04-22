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
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const EDIT = "EDIT";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
         .then(() => transition(SHOW))
         .catch(() => transition(ERROR_SAVE));
 }

 function handleDelete() {
   transition(CONFIRM);
 }

 function deleteInterview(){
   transition(DELETING);
   props.deleteInterview(props.id)
         .then(()=> transition(EMPTY))
         .catch(() => transition(ERROR_DELETE))
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
               onEdit={() => transition(EDIT)}
            />
         )}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} onConfirm={save}/>}
         {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={onCancel} onConfirm={save}/>}
         {mode === CONFIRM && <Confirm message="Delete appointment?" onCancel={onCancel} onConfirm={deleteInterview}/>}
         {mode === DELETING && <Status message="Deleting..."/>}
         {mode === SAVING && <Status message="Saving..."/>}
         {mode === ERROR_SAVE && <Error message="Unable to save" onClose={() => transition(SHOW, true)} />}
         {mode === ERROR_DELETE && <Error message="Unable to delete" onClose={() => transition(SHOW, true)}/>}
      </article>
 );
}
