// import React from "react";

// export default function DayListItem(props) {
//   return (
//     <li>
//       <h2 className="text--regular">Day Name</h2> 
//       <h3 className="text--light">X spots remaining</h3>
//     </li>
//   );
// }



import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  function formatSpots(props) {
    if (props.spots === 0){
      return "no spots remaining";
    } else if (props.spots === 1){
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  const DayListClass = classNames("day-list__item",
  {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : props.spots===0
  }
  )

  return (
    <li className={DayListClass}  onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}