import { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255,0.2)" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(0.6); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={`position-relative border rounded-4 bg-dark text-white p-4 ${className}`}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      {children}
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className='container my-5'>
      <SpotlightCard className='mx-auto mt-5'>
        <div className='d-flex flex-column gap-3 align-items-center justify-content-center'>

          <h1 className="fw-bold mb-3 mt-3">Count : {count}</h1>

          <div className='mb-3'>
            <button onClick={() => setCount(count + 1)} className="btn btn-primary me-2 mb-2">Increment</button>
            <button onClick={() => setCount(count - 1)} className="btn btn-secondary me-2 mb-2">Decrement</button>
            <button onClick={() => setCount(0)} className="btn btn-danger me-2 mb-2">Reset</button>
            <button onClick={() => setCount(count + 5)} className="btn btn-success me-2 mb-2">Increment 5</button>
          </div>

          <h1 className='fw-bold mb-3 mt-3'>Welcome to Charusat!</h1>

          <div className="mb-2">
            <label className="form-label">First name:</label>
            <input
              onInput={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder='Enter your first name'
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Last name:</label>
            <input
              onInput={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control"
              placeholder='Enter your last name'
            />
          </div>

          <div>First Name: {name}</div>
          <div>Last Name: {lastName}</div>

        </div>
      </SpotlightCard>
    </div>
  )
}

export default App
