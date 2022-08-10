// this function gets the appointments for each day
export function getAppointmentsForDay(state, day) {
  const dayReturn = state.days.find((data) => data.name === day);
  if (!dayReturn) {
    return [];
  }
  const results = [];
  for (const id of dayReturn.appointments) {
    const appointment = state.appointments[id];
    results.push(appointment);
  }
  return results;
}
  //this function will get an interview based on state
export function getInterview(state, interview) {
  if (interview) {
    for (const prop in state.interviewers) {
      if (interview.interviewer === state.interviewers[prop].id) {
        return {
          student: interview.student,
          interviewer: state.interviewers[prop],
        };
      }
    }
  }
  return null;
}
  //this function will get all the interviewers for the day
export function getInterviewersForDay(state, day) {
  const dayReturn = state.days.find((data) => data.name === day);
  if (!dayReturn) {
    return [];
  }
  const results = [];
  for (const id of dayReturn.interviewers) {
    const interviewer = state.interviewers[id];
    results.push(interviewer);
  }
  return results;
}