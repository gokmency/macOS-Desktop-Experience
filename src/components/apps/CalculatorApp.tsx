import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const result = calculate(currentValue, inputValue, operation);

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button: React.FC<{ 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    type?: 'number' | 'operation' | 'function';
  }> = ({ onClick, className = '', children, type = 'number' }) => {
    const baseClasses = "h-14 w-14 rounded-full font-medium transition-all duration-150 active:scale-95 flex items-center justify-center text-lg";
    const typeClasses = {
      number: "bg-gray-600 hover:bg-gray-500 text-white",
      operation: "bg-orange-500 hover:bg-orange-400 text-white",
      function: "bg-gray-500 hover:bg-gray-400 text-white"
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${typeClasses[type]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="h-full bg-black p-6 flex flex-col">
      {/* Display */}
      <div className="mb-8 flex-1 flex flex-col justify-end">
        <div className="text-right">
          <div className="text-6xl font-light text-white truncate mb-2" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {display}
          </div>
          {previousValue !== null && operation && (
            <div className="text-xl text-gray-400 mb-4">
              {previousValue} {operation}
            </div>
          )}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button onClick={deleteLast} type="function">
          <Delete className="w-5 h-5" />
        </Button>
        <Button onClick={clear} type="function">AC</Button>
        <Button onClick={inputPercent} type="function">%</Button>
        <Button onClick={() => inputOperation('÷')} type="operation">÷</Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button onClick={() => inputOperation('×')} type="operation">×</Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button onClick={() => inputOperation('−')} type="operation">−</Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={() => inputOperation('+')} type="operation">+</Button>

        {/* Row 5 */}
        <Button 
          onClick={() => inputNumber('0')} 
          className="col-span-2 w-auto"
        >
          0
        </Button>
        <Button onClick={inputDecimal}>,</Button>
        <Button onClick={performCalculation} type="operation">=</Button>
      </div>
    </div>
  );
};

export default CalculatorApp;