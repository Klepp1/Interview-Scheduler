import { useState } from 'react';
//this function has transition and back functions to switch between modes to display different things
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(value, replace = false) {
    if (replace) {
      setMode(value);
      const newHistory = [...history].pop();
      setHistory(newHistory);
    } else {
      setMode(value);
      history.push(value);
    }
  }

  function back() {
    if (mode !== 'FIRST') {
      history.pop();
      const position = history.length - 1;
      setMode(history[position]);
    } else {
      setMode('FIRST');
    }
  }
  return { mode, transition, back };
}
