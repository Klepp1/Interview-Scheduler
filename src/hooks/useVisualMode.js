import { react, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(value, replace = false) {
    if (replace) {
      setMode(value)
      history.pop()
      history.push(value)
    } else {
      setMode(value)
      history.push(value)
    }
  }

  function back() {
    if (mode !== 'FIRST') {
      history.pop()
      const position = history.length - 1
      setMode(history[position])
    } else {
      setMode('FIRST')
    }
  }
  return { mode, transition, back };
};