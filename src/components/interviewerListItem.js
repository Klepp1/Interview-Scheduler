import React from 'react';
import classNames from "classnames";
import "components/interviewerListItem.scss";
export default function InterviewerListItem(props) {
  //displays the interviewers and changes the looks based on if its selected or not
  const interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected });
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {(props.selected) ? props.name : "" }
    </li>
  );
};