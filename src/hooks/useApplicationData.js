import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

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
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day,
        spots: spotCount
      };
    });
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    let newState = {...state, appointments}
    let newDays = setSpots(newState)
    newState.days = newDays

    return axios.put(`/api/appointments/${id}`,{interview})
    .then((res) =>{
      setState(newState)
    })
    };

  function cancelInterview(id, interview) {
      console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment}
        
      let newState = {...state, appointments}
      let newDays = setSpots(newState)
      newState.days = newDays

      return axios.delete(`/api/appointments/${id}`)
        .then((res) =>{
          setState(newState)
        })
      
      };

  function editInterview(id, interview) {
        console.log(id, interview);
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment}
    
        return axios.put(`/api/appointments/${id}`,{interview})
        .then((res) =>{
          setState({...state, appointments})
        })
        };

        return {
          state, 
          setDay,
          setSpots,
          bookInterview,
          cancelInterview,
          editInterview
        };
        

}