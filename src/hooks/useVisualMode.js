import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace) => {
    // If "replace" is not true, this code updates the "history" array by adding "newMode" to the end
    if (!replace) {
      setHistory([...history, newMode])
    }
    // This code updates the "mode" state variable with the new mode
    setMode(newMode)
  };

  // This code defines a function named "back" that goes back to the previous mode in the history array
  const back = () => {
    // If the history array only contains one mode, there's no previous mode to go back to, so this code returns
    if (history.length === 1) return;
    const newHistory = history.slice(0,history.length - 1)
    setHistory([...newHistory])
    setMode(newHistory[newHistory.length - 1])
  };

  // This code returns an object containing the "mode", "transition", and "back" functions
  return { 
    mode,
    transition,
    back
   };
}