import React, {useState} from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    function validate() {
        if (name === "") {
          setError("Student name cannot be blank");
          return;
        }
        setError("");
        props.onConfirm(name, interviewer);
      }
      
    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
            <form autoComplete="off">
            <input
                className="appointment__create-input text--semi-bold"
                name="name"
                type="text"
                placeholder="Enter Student Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                data-testid="student-name-input"
            />
            </form>
            <section className="appointment__validation">{error}</section>
            <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={(interviewerId) => setInterviewer(interviewerId)} />
        </section>
        <section className="appointment__card-right">
            <section className="appointment__actions">
            <Button onClick={props.onCancel} danger>Cancel</Button>
            <Button onClick={validate} confirm>Save</Button>
            </section>
        </section>
        </main>
    )
}
