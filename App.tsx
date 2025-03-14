import React, { useState, useEffect } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, Percent } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [theme] = useState('dark');

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + op + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(Number(result).toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleDelete = () => {
    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    if (e.key === '+') handleOperator('+');
    if (e.key === '-') handleOperator('-');
    if (e.key === '*') handleOperator('*');
    if (e.key === '/') handleOperator('/');
    if (e.key === 'Enter' || e.key === '=') handleEqual();
    if (e.key === 'Backspace') handleDelete();
    if (e.key === 'Escape') handleClear();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [display, equation]);

  const Button = ({ children, onClick, className = '', isOperator = false }: any) => (
    <button
      onClick={onClick}
      className={`calc-btn glass flex items-center justify-center text-2xl p-4 rounded-2xl
        ${isOperator ? 'text-teal-400' : 'text-white'} ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-radial from-slate-900 via-purple-900 to-slate-900">
      <div className="glass p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm border border-white/10">
        <div className="mb-8 glass rounded-2xl p-6">
          <div className="text-teal-400/80 text-right h-6 text-sm font-mono">{equation}</div>
          <div className="text-white text-right text-5xl font-light tracking-wider h-14 overflow-hidden display-glow">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <Button 
            onClick={handleClear} 
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            C
          </Button>
          <Button onClick={handleDelete} className="bg-slate-700/20">
            <Delete size={20} />
          </Button>
          <Button onClick={() => handleOperator('%')} isOperator>
            <Percent size={20} />
          </Button>
          <Button onClick={() => handleOperator('/')} isOperator>
            <Divide size={20} />
          </Button>

          {[7, 8, 9].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-slate-800/20 hover:bg-slate-800/30"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('*')} isOperator>
            <X size={20} />
          </Button>

          {[4, 5, 6].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-slate-800/20 hover:bg-slate-800/30"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('-')} isOperator>
            <Minus size={20} />
          </Button>

          {[1, 2, 3].map(num => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-slate-800/20 hover:bg-slate-800/30"
            >
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('+')} isOperator>
            <Plus size={20} />
          </Button>

          <Button
            onClick={() => handleNumber('0')}
            className="bg-slate-800/20 hover:bg-slate-800/30 col-span-2"
          >
            0
          </Button>
          <Button 
            onClick={() => handleNumber('.')} 
            className="bg-slate-800/20 hover:bg-slate-800/30"
          >
            .
          </Button>
          <Button 
            onClick={handleEqual} 
            className="bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
          >
            <Equal size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;