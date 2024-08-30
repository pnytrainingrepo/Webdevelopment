'use client';
import { useState } from 'react';

import CounterDisplay from '../_components/CounterDisplay';
import CounterButtons from '../_components/CounterButtons';

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <CounterDisplay count={count} />
      <CounterButtons increment={increment} decrement={decrement} />
    </div>
  );
}
