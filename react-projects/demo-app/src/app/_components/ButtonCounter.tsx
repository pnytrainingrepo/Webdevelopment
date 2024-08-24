import { useState } from 'react';

export default function ButtonCounter() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <button classNameName="text-2xl bg-slate-300 rounded-md" onClick={handleClick}>
        Clicked {count} times
      </button>
    );
  }
  