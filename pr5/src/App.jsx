import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input));
      } catch {
        setResult('Error');
      }
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <div 
      className="container d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: '#000' }}
    >
      <div className="calculator text-white rounded p-3" style={{ width: '250px', backgroundColor: '#121212' }}>
        <div className="text-end mb-2">
          <div className="text-light" style={{ fontSize: '0.8rem' }}>{result ? `(${result})` : ''}</div>
          <div style={{ fontSize: '1.2rem' }}>{input || '0'}</div>
        </div>

        <div className="row g-2 mb-2">
          {['/', '*', '+', '-', 'DEL'].map((op) => (
            <div className="col" key={op}>
              <button onClick={() => handleClick(op)} className="btn btn-danger w-100">{op}</button>
            </div>
          ))}
        </div>

        <div className="row g-2">
          {[1,2,3,4,5,6,7,8,9,0,'.','='].map((char, idx) => (
            <div className="col-4" key={idx}>
              <button onClick={() => handleClick(char.toString())} className="btn btn-secondary w-100">{char}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
