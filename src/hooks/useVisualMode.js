import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace) => {
    // If "replace" is not true, this code updates the "history" array by adding "newMode" to the end
    if (!replace) {
      setHistory(prev => [...prev, newMode])
    } else {
      setHistory(prev => [...prev.slice(0,prev.length-1),mode])
    }
    // This code updates the "mode" state variable with the new mode
    setMode(newMode)
  };

  // This code defines a function named "back" that goes back to the previous mode in the history array
  const back = () => {
    // If the history array only contains one mode, there's no previous mode to go back to, so this code returns
    if (history.length === 1) return;
    const newHistory = history[history.length - 2]
    setHistory(prev => prev.slice(0,history.length - 1))
    setMode(newHistory)
  };

  
  return { 
    mode,
    transition,
    back
   };
}