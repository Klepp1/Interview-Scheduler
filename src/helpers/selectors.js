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

getAppointmentsForDay(state, 'Monday');
