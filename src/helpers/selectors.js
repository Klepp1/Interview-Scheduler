
  export function getAppointmentsForDay(state, day) {
  const dayReturn = state.days.filter(data => data.name === day);
  if (state.days && dayReturn[0]) {
  let final = [];
  const appointments = dayReturn[0].appointments;
  for (const prop in state.appointments) {
    for (const prop2 of appointments) {
      if (state.appointments[prop].id === prop2) {
         final.push(state.appointments[prop]);
      }
    }
  }
  return final;
  } else {
    return [];
  }
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
  const dayReturn = state.days.filter(data => data.name === day);
  if (state.days && dayReturn[0]) {
  let final = [];
  let data = getAppointmentsForDay(state, day);
  for (const prop of data) {
    if (prop.interview) {
      for (const prop2 in state.interviewers) {
        if (prop.interview.interviewer === state.interviewers[prop2].id) {
          final.push(state.interviewers[prop2])
        }
      }
    }
  }
   return final;
  } else {
    return [];
  }
}





