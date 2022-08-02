import React from 'react';
import PropTypes from 'prop-types';
import "components/interviewerList.scss"
import InterviewerListItem from './interviewerListItem';
export default function InterviewerList(props) {
  const interviewerData = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
