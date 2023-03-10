import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  };

  const back = () => {
    if (history.length === 1) return;
    const newHistory = history.slice(0,history.length - 1)
    setHistory([...newHistory])
    setMode(newHistory[newHistory.length - 2])
  };

  return { 
    mode,
    transition,
    back
   };
}