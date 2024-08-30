export default function CounterButtons({
    increment,
    decrement,
  }: {
    increment: () => void;
    decrement: () => void;
  }) {
    return (
      <div>
        <button onClick={increment} style={{ marginRight: '10px' }}>
          Increment
        </button>
        <button onClick={decrement}>Decrement</button>
      </div>
    );
  }
  