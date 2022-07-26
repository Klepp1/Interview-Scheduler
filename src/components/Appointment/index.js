import React from 'react';
import Header from "components/Appointment/Header.js";
import './styles.scss';
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import { FORMERR } from 'dns';
import Status from './Status';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
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
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === EMPTY && <Empty bookInterview={props.bookInterview} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      bookInterview={props.bookInterview}
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => console.log('onEdit')}
      onDelete={() => console.log('onDelete')}
      />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
    </article>
  )
};