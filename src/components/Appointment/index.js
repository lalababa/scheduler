//Import statements for necessary components and hooks
import "./styles.scss";
import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Header from "./Header";

export default function Appointment(props) {
  //Define constants for each possible state of the appointment
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const CONFIRMING = "CONFIRMING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Use the useVisualMode hook to manage the state of the appointment component
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //A function that creates a new interview and updates the state of the component
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id,interview)
    .then(()=>transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  //A function that cancels an existing interview and updates the state of the component.
  function cancel(name, interviewer) {
    transition(DELETING,true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    
    // Render the Appointment component with different modes based on the current mode
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRMING)}
        onEdit={() => transition(EDITING)}
      />
      )}
      {mode === CREATE && (
      <Form 
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}
      />
      )}
      {mode === SAVING && (
        <Status 
        message="saving" 
        />
      )}
      {mode === DELETING && (
        <Status 
        message="Deleting" 
        />
      )}
      {mode === EDITING && (
        <Form
        name={props.interview.student}
        interviewer={props?.interview?.interviewer?.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error Deleting Appointment" onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error Saving Appointment" onClose={back} />
      )}
      {mode === CONFIRMING && (
        <Confirm
        onConfirm={cancel}
        onCancel={back} 
        message="Are you sure you would like to delete?"
        />
      )}
    </article>
    
  );
  
}