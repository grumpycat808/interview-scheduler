
import {useState} from 'react';
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); 
    function transition(newMode, replace = false) { 
        if(replace) {
            const historyArr = history;
            historyArr.splice(historyArr.length - 1, 1);
            const newHistory = [...historyArr, newMode]
            setHistory(newHistory);
        } else {
            setHistory([...history, newMode])
        }
        setMode(newMode);
    }
    function back() { 
        
        if(history.length === 1) return;
        const historyArr = history;
        historyArr.splice(history.length - 1, 1);
        
        setMode(historyArr[historyArr.length - 1]);
        setHistory(historyArr);
    }
    return { mode, transition, back };
  }