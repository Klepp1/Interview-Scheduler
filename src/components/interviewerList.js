import React from 'react';
import "components/interviewerList.scss"
import InterviewerListItem from './interviewerListItem';
export default function InterviewerList(props) {
  const interviewerData = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    )
  })
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewerData}
  </ul>
  </section>
  )
};
