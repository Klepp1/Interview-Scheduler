import Button from "components/Button.js";
import InterviewerList from "components/interviewerList.js";
import React, { useState } from 'react';
export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  // resets the student and interviewer
  function reset() {
    setStudent("");
    setInterviewer(null);
  };
  // clears interviewer and student and returns back to the ADD mode
  function cancel() {
    reset();
    props.onCancel()
    setError(null)
  };
  // this function checks to see if both fields are filled out or not if not there will be an error
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    };

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    };
    setError('');

    props.onSave(student, interviewer);
  };

  //html for the form with some props
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name='name'
            value={student}
            data-testid='student-name-input'
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
          <InterviewerList 
            setInterviewer={setInterviewer}
            interviewers={props.interviewers}
            value={interviewer}
          />
        </section>
          <section className="appointment__card-right">
            <section className="appointment__actions">
              <Button danger onClick={cancel}>Cancel</Button>
              <Button confirm onClick={() => validate()}>Save</Button>
            </section>
          </section>
    </main>
  )
};