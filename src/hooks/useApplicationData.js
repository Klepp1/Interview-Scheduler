import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} 
  });

  const setDay = day => setState({...state, day })

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment )
    .then((response) => {
      setState({
        ...state,
        appointments,
        days: spotsRemaining(state, appointments)
      });
    })

  }

  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: spotsRemaining(state, appointments)
      })
    })

  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  function spotsRemaining(state, appointments) {
    const dayReturn = state.days.filter(data => data.name === state.day)[0];
    let spots = 0;

    for (let prop of dayReturn.appointments) {
      if (appointments[prop].interview === null) {
        spots += 1;
      }
    }
    return state.days.map(day => {
      if (day !== dayReturn) return day;

      return {
        ...day,
        spots
      }
    })
    }

  return {state, setDay, bookInterview, deleteInterview}
}