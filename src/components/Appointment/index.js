import React from 'react';
import Header from "components/Appointment/Header.js";
import './styles.scss';
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

  function delete1() {
    transition(DELETE, true)
    props.deleteInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === CONFIRM && <Confirm onConfirm={delete1} onCancel={() => back()} message={'are you sure you want to delete?'}/>}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === EMPTY && <Empty bookInterview={props.bookInterview} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      bookInterview={props.bookInterview}
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(EDIT)}
      onDelete={() => transition(CONFIRM)}
      />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === EDIT && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} student={props.interview.student} interviewer={props.interview.interviewer.id} />}
      {mode === ERROR_DELETE && <Error message={'Failed to delete!'} onClose={() => back()} />}
      {mode === ERROR_SAVE && <Error message={'Failed to save!'} onClose={() => back()} />}
    </article>
  )
};