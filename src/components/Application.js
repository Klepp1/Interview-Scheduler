import React from 'react';
import DayList from './DayList';
import 'components/Application.scss';
import 'components/Appointment';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterviewersForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application() {
    // destructuring the object with all the functions i need
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  // formats the appointments and sends all the data as props to the apppointment component
  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });
  //main HTML page layout with some props passed
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days} 
            value={state.day} 
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
