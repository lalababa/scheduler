import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types'; 

export default function InterviewerList (props) {

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const listOfInterviewer = props.interviewers.map((interviewer)=> {
      return (
        <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)} 
        />
      )
    }
  )
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewer}</ul>
    </section>
  ) 

} 


// import React from "react";
// import "./InterviewerList.scss";
// import PropTypes from 'prop-types'; 
// import InterviewerListItem from "./InterviewerListItem";

// export default function InterviewerList(props) {

//   InterviewerList.propTypes = {
//     interviewers: PropTypes.array.isRequired
//   };

//   const listOfInterviewer = props.interviewers.map((interviewer)=>{
//     return (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === props.value}
//         setInterviewer={() => props.onChange(interviewer.id)}  
//       />
//     )
//   }
//   )

//   return (
//   <section className="interviewers">
//     <h4 className="interviewers__header text--light">Interviewer</h4>
//     <ul className="interviewers__list">{listOfInterviewer}</ul>
//   </section>
//   );


// }