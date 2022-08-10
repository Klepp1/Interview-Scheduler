import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  //Main state of the project with all the data
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  // this useEffect makes all the api calls and sets the state with the newly returned data
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,
      }));
    });
  }, []);
  // this checks the spots remaining on each day
  function spotsRemaining(state, appointments) {
    const dayReturn = state.days.filter((data) => data.name === state.day)[0];
    let spots = 0;

    for (const prop of dayReturn.appointments) {
      if (appointments[prop].interview === null) {
        spots += 1;
      }
    }
    return state.days.map((day) => {
      if (day !== dayReturn) return day;

      return {
        ...day,
        spots,
      };
    });
  }

  const setDay = (day) => setState({ ...state, day });
  // books an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: spotsRemaining(state, appointments),
        });
      });
  }
  // deletes an interview with the id
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: spotsRemaining(state, appointments),
        });
      });
  }
  // return the main functions to reuse in the application file
  return {
    state, setDay, bookInterview, deleteInterview,
  };
}
