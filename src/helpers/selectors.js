const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

const interviewers = {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
}


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
    for (const prop in interviewers) {
      if (interview.interviewer === interviewers[prop].id) {
        return {
          "student": interview.student,
          "interviewer": interviewers[prop]
        }
      }
    }
  }
  return null;
}

