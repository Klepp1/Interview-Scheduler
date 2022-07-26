
 export function getAppointmentsForDay(state, day) {
  const dayReturn = state.days.find(data => data.name === day);
  if (!dayReturn) {
    return [];
  }

  let results = [];
  for (const id of dayReturn.appointments) {
    const appointment = state.appointments[id]
    results.push(appointment);
  }
  return results;
}

  export function getInterview(state, interview) {
  if(interview) {
    for (const prop in state.interviewers) {
      if (interview.interviewer === state.interviewers[prop].id) {
        return {
          "student": interview.student,
          "interviewer": state.interviewers[prop]
        }
      }
    }
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const dayReturn = state.days.find(data => data.name === day);
  if (!dayReturn) {
    return [];
  }
  console.log(dayReturn)
  let results = [];
  for (const id of dayReturn.interviewers) {
   const interviewer = state.interviewers[id]
    results.push(interviewer);
  }
  return results;
}





