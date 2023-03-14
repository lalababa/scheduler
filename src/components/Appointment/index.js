import "./styles.scss";
// import Header from "./Header";
import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const CONFIRMING = "CONFIRMING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //create a interview info in backend
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

  //delete a inverview info
  function cancel(name, interviewer) {
    transition(DELETING,true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    
    <article className="appointment" data-testid="appointment">
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
        message="deleting" 
        />
      )}
      {mode === EDITING && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
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
        message="confirming"
        />
      )}
    </article>
    
  );
  
}