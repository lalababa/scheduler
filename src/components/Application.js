import React from "react";

import "components/Application.scss";

import Appointment from "./Appointment";

import DayList from "./DayList";

import { getAppointmentsForDay,  getInterviewersForDay, getInterview } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

// import { useEffect } from "react";

// import axios from "axios";

export default function Application(props) {
  
  //const [days, setDays] = useState([]);

  // useEffect (() => {
  //   axios.get('/api/days')
  //   .then(responce => setDays=(responce))
  // },[])

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
      />
    );
  });

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
  
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"  />
      </section>
    </main>
  );
}
