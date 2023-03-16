export function getAppointmentsForDay(state, day) {
 
  // Filters the days array in state to return an array of all days that match the input 'day'
  const filteredDays = state.days.filter(newDay => newDay.name === day);
  
  // If no days match the input 'day', return an empty array
  let filteredDaysObj = filteredDays[0];
  
  if (!filteredDaysObj){
    return [];
  }

  // Maps over the appointments array in the filteredDays object to return an array of appointments with the matching id
  const appointments = filteredDaysObj.appointments.map(id => {
    return (
      state.appointments[id]
    )
  })
    return appointments;
}

export  function getInterview(state, interview) {
  if(!interview) return null;
  // Creates a new object called filteredInterview with properties student and interviewer,
  // where student is equal to interview.student and interviewer is equal to the interviewer object 
  // with matching id in the state.interviewers object
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;

}


export function getInterviewersForDay(state, name) {
    // Filters the days array in state to return an array of all days that match the input 'name'
    const filteredDays = state.days.filter(day => day.name === name);
    // If the state.days array is empty or no days match the input 'name', return an empty array
    if(state.days.length===0 || filteredDays.length===0){
      return [];
    }
  
    // Sets a variable to equal the interviewers array in the first object of the filteredDays array
    const interviewersFromDays = filteredDays[0].interviewers;
   
    // Maps over the interviewersFromDays array to return an array of 
    // interviewer objects with matching ids from the state.interviewers object
    let filteredInterviewers = [];
  
    for(let interviewer of interviewersFromDays) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }

    // Returns the filteredInterviewers array
    return filteredInterviewers;


}




















// export function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.filter((singleDay) => { 
//     return singleDay.name === day
//     })

//   if (filteredDays.length === 0) {
//     return [];
//   }
//   const appointmentsMapped = filteredDays[0].appointments.map((app) => {
//     return state.appointments[app]
//   })

//   return appointmentsMapped;
// }


// export function getInterview(state, interview) {
//   if (!interview) {
//     return null;
//   }
//   const newInterview = {
//     ...interview,
//     interviewer: {...state.interviewers[interview.interviewer] }
//   }
  
//   return newInterview;
// }

// export function getInterviewersForDay(state, day) {
//   const filteredDays = state.days.filter((singleDay) => { 
//     return singleDay.name === day
//     })

//   if (filteredDays.length === 0) {
//     return [];
//   }
//   const interviewersMapped = filteredDays[0].interviewers.map((int) => {
//     return state.interviewers[int]
//   })

//   return interviewersMapped;
// }