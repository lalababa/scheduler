export function getAppointmentsForDay(state, day) {
 
  const filteredDays = state.days.filter(newDay => newDay.name === day);
  
  //transfer arr to obj
  let filteredDaysObj = filteredDays[0];
  
  if (!filteredDaysObj){
    return [];
  }

  const appointments = filteredDaysObj.appointments.map(id => {
    return (
      state.appointments[id]
    )
  })
    return appointments;
}

export  function getInterview(state, interview) {
  if(!interview) return null;
  const filteredInterview = {};
  filteredInterview.student = interview.student;
  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;

}


export function getInterviewersForDay(state, name) {
    const filteredDays = state.days.filter(day => day.name === name);
    if(state.days.length===0 || filteredDays.length===0){
      return [];
    }
  
    const interviewersFromDays = filteredDays[0].interviewers;
   
    let filteredInterviewers = [];
  
    for(let interviewer of interviewersFromDays) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }
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