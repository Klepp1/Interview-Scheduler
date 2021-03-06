import Button from "components/Button.js";
import InterviewerList from "components/interviewerList.js";
import React, { useState } from 'react';
export default function Form(props) {

const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

function reset() {
  setStudent("");
  setInterviewer(null);
}

function cancel() {
  reset();
  props.onCancel()
}

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name='name'
        value={student}
        type="text"
        placeholder="Enter Student Name"
        onChange={(e) => setStudent(e.target.value)}
      />
    </form>
    <InterviewerList 
      setInterviewer={setInterviewer}
      interviewers={props.interviewers}
      value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
};