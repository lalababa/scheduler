import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function useApplicationData() {

  // Define initial state values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
  });

  // Define a function to update the selected day in state
  const setDay = (day) => setState({ ...state, day });

  // Fetch data from the server when the component mounts using useEffect
  useEffect(() => {
    const daysAPI = `/api/days`;

    const appointmentAPI = `/api/appointments`;
    const interviewerAPI = `/api/interviewers`;
    Promise.all([
      axios.get(daysAPI),
      axios.get(appointmentAPI),
      axios.get(interviewerAPI),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  // Function to update the available spots remaining for an appointment based on the current state
  const setSpots = (state) => {
    let spotCount = 0;
    for (let day in state.days) {
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (state.appointments[id].interview === null) {
            spotCount++;
          }
        }
      }
    }
    return state.days.map((day) => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day,
        spots: spotCount,
      };
    });
  };

  // Function to book an appointment by updating state and sending a PUT request to the server
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    let newState = { ...state, appointments };
    let newDays = setSpots(newState);
    newState.days = newDays;

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState(newState);
    });
  }

  // Function to cancel an appointment by updating state and sending a DELETE request to the server
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let newState = { ...state, appointments };
    let newDays = setSpots(newState);
    newState.days = newDays;

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState(newState);
    });
  }

  // Function to edit an existing appointment by updating state and sending a PUT request to the server
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments });
    });
  }
  
  // Return state and all functions for use in other components
  return {
    state,
    setDay,
    setSpots,
    bookInterview,
    cancelInterview,
    editInterview,
  };
}
