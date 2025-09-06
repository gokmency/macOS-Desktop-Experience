import React, { useState } from 'react';

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
      case '-':
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

  const Button: React.FC<{ 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    type?: 'number' | 'operation' | 'function';
  }> = ({ onClick, className = '', children, type = 'number' }) => {
    const baseClasses = "h-12 rounded font-medium transition-all active:scale-95";
    const typeClasses = {
      number: "bg-muted hover:bg-muted/80 text-foreground",
      operation: "bg-primary hover:bg-primary/90 text-primary-foreground",
      function: "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
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
    <div className="h-full bg-white p-6 flex flex-col">
      {/* Display */}
      <div className="mb-6 p-6 bg-gray-900 rounded-2xl text-right">
        <div className="text-3xl font-mono text-white truncate" title={display}>
          {display}
        </div>
        {previousValue !== null && operation && (
          <div className="text-sm text-gray-400 mt-1">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3 flex-1">
        {/* Row 1 */}
        <Button onClick={clear} type="function" className="bg-gray-200 hover:bg-gray-300 text-gray-800">C</Button>
        <Button onClick={toggleSign} type="function" className="bg-gray-200 hover:bg-gray-300 text-gray-800">±</Button>
        <Button onClick={inputPercent} type="function" className="bg-gray-200 hover:bg-gray-300 text-gray-800">%</Button>
        <Button onClick={() => inputOperation('÷')} type="operation" className="bg-orange-500 hover:bg-orange-600 text-white">÷</Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber('7')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">7</Button>
        <Button onClick={() => inputNumber('8')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">8</Button>
        <Button onClick={() => inputNumber('9')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">9</Button>
        <Button onClick={() => inputOperation('×')} type="operation" className="bg-orange-500 hover:bg-orange-600 text-white">×</Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber('4')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">4</Button>
        <Button onClick={() => inputNumber('5')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">5</Button>
        <Button onClick={() => inputNumber('6')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">6</Button>
        <Button onClick={() => inputOperation('-')} type="operation" className="bg-orange-500 hover:bg-orange-600 text-white">-</Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber('1')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">1</Button>
        <Button onClick={() => inputNumber('2')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">2</Button>
        <Button onClick={() => inputNumber('3')} className="bg-gray-100 hover:bg-gray-200 text-gray-800">3</Button>
        <Button onClick={() => inputOperation('+')} type="operation" className="bg-orange-500 hover:bg-orange-600 text-white">+</Button>

        {/* Row 5 */}
        <Button 
          onClick={() => inputNumber('0')} 
          className="col-span-2 bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          0
        </Button>
        <Button onClick={inputDecimal} className="bg-gray-100 hover:bg-gray-200 text-gray-800">.</Button>
        <Button onClick={performCalculation} type="operation" className="bg-orange-500 hover:bg-orange-600 text-white">=</Button>
      </div>

      {/* Footer message */}
      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500">
          "Math: The only place where people buy 64 watermelons and no one questions it."
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;