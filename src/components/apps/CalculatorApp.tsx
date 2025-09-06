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
    <div className="h-full bg-macos-window p-4 flex flex-col">
      {/* Display */}
      <div className="mb-4 p-4 bg-background border border-border rounded text-right">
        <div className="text-2xl font-mono truncate" title={display}>
          {display}
        </div>
        {previousValue !== null && operation && (
          <div className="text-sm text-muted-foreground">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {/* Row 1 */}
        <Button onClick={clear} type="function">C</Button>
        <Button onClick={toggleSign} type="function">±</Button>
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
        <Button onClick={() => inputOperation('-')} type="operation">-</Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={() => inputOperation('+')} type="operation">+</Button>

        {/* Row 5 */}
        <Button 
          onClick={() => inputNumber('0')} 
          className="col-span-2"
        >
          0
        </Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button onClick={performCalculation} type="operation">=</Button>
      </div>

      {/* Footer message */}
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          "Math: The only place where people buy 64 watermelons and no one questions it."
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;