import React from "react";

// Importing the styles for the Application component
import "components/Application.scss";

// Importing the Appointment and DayList components, and some helper functions
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay,  getInterviewersForDay, getInterview } from "helpers/selectors";

// Importing a custom hook that manages the application state
import useApplicationData from "hooks/useApplicationData";

// Defining the Application component
export default function Application(props) {

  // Destructuring the state and functions from the custom hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();
  
  // Getting the daily appointments and interviewers for the selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // Mapping over the daily appointments to create an array of Appointment components
  const schedule = dailyAppointments.map((appointment) => {

  // Getting the interview data for the current appointment, if it exists
  const interview = getInterview(state, appointment.interview);
    
    // Returning an Appointment component with props
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

  // Returning the JSX for the Application component
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
