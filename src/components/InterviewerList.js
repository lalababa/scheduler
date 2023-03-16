// import the necessary dependencies
import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types'; 

// create the InterviewerList component
export default function InterviewerList (props) {

  // define the PropTypes for this component
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  // create an array of InterviewerListItem components by mapping over the interviewers array from props
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
  
  // return the InterviewerList component with the list of InterviewerListItems
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewer}</ul>
    </section>
  ) 

} 