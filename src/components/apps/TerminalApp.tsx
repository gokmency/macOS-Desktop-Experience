import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to FakeTerminal v2.0.1' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help       - Show this help message',
      '  ls         - List directory contents',
      '  cat        - Display file contents',
      '  fortune    - Get a random fortune',
      '  motivate   - Get motivated (maybe)',
      '  whoami     - Display current user',
      '  date       - Show current date',
      '  clear      - Clear the terminal',
      '  exit       - Close terminal (just kidding)',
    ],

    ls: () => [
      'total 42',
      'drwxr-xr-x  2 user staff   64 Oct 15 14:30 Desktop',
      'drwxr-xr-x  3 user staff   96 Oct 15 14:30 Documents',
      'drwxr-xr-x  4 user staff  128 Oct 15 14:30 Downloads',
      '-rw-r--r--  1 user staff 1337 Oct 15 14:30 todo.txt',
      '-rw-r--r--  1 user staff  256 Oct 15 14:30 secrets.txt',
      '-rwxr-xr-x  1 user staff 2048 Oct 15 14:30 run_away.sh',
      'drwxr-xr-x  2 user staff   64 Oct 15 14:30 definitely_not_memes',
    ],

    cat: (args: string[]) => {
      const filename = args[0] || 'todo.txt';
      const files: Record<string, string[]> = {
        'todo.txt': [
          '[ ] Learn to use terminal properly',
          '[x] Pretend to know what I\'m doing',
          '[ ] Fix that bug from 3 months ago',
          '[ ] Actually read documentation',
          '[x] Spend 2 hours on 5-minute task',
          '[ ] Remember why I opened this terminal',
          '[ ] Stop procrastinating by using terminal',
          '[ ] Make coffee',
          '[x] Make more coffee',
        ],
        'secrets.txt': [
          'My deepest secrets:',
          '1. I use StackOverflow for everything',
          '2. I have 73 browser tabs open right now',
          '3. I copy-paste code and hope it works',
          '4. I restart my computer when things get weird',
          '5. I\'ve never read the Git manual',
          '6. I say "it works on my machine" unironically',
        ],
        'run_away.sh': [
          '#!/bin/bash',
          'echo "Running away from responsibilities..."',
          'sleep 3',
          'echo "Still here. Responsibilities found me."',
          'echo "Hiding behind terminal again."',
        ],
      };
      
      return files[filename] || [`cat: ${filename}: No such file or directory`];
    },

    fortune: () => {
      const fortunes = [
        'Today you will find a bug that has been there for years.',
        'Your code will work on the first try. Just kidding.',
        'A meeting that could have been an email awaits you.',
        'Coffee is in your near future.',
        'You will spend 2 hours debugging a missing semicolon.',
        'Stack Overflow will be down when you need it most.',
        'Your variable names will make perfect sense... to you.',
        'Rubber duck debugging will solve your problems.',
      ];
      return [fortunes[Math.floor(Math.random() * fortunes.length)]];
    },

    motivate: () => {
      const motivations = [
        'You got this! (Probably)',
        'Failure is just success that hasn\'t happened yet.',
        'Every master was once a disaster.',
        'The only impossible journey is the one you never begin.',
        'You miss 100% of the shots you don\'t take. - Wayne Gretzky - Michael Scott',
        'If at first you don\'t succeed, try, try again. Then give up. No point being ridiculous.',
        'The best time to plant a tree was 20 years ago. The second best time is now. (But debugging is fine too)',
      ];
      return [motivations[Math.floor(Math.random() * motivations.length)]];
    },

    whoami: () => ['user (probably you, unless someone else is using your computer)'],

    date: () => [new Date().toString()],

    clear: () => {
      setLines([]);
      return [];
    },

    exit: () => ['Nice try! This terminal is eternal. Use Cmd+W to close the window.'],
  };

  const executeCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return [];

    const [command, ...args] = trimmed.split(' ');
    const cmd = commands[command as keyof typeof commands];
    
    if (cmd) {
      if (command === 'clear') {
        return (cmd as () => string[])();
      }
      return typeof cmd === 'function' ? (cmd as (args: string[]) => string[])(args) : cmd;
    } else {
      return [`command not found: ${command}`, 'Type "help" for available commands.'];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    // Add command to lines
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'command', content: `$ ${currentInput}` }
    ];

    // Execute command and add output
    const output = executeCommand(currentInput);
    output.forEach(line => {
      newLines.push({ type: 'output', content: line });
    });

    // Add empty line after output
    newLines.push({ type: 'output', content: '' });

    setLines(newLines);
    setHistory(prev => [...prev, currentInput]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      }
    }
  };

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
      className="h-full bg-gray-900 text-green-400 font-mono text-sm overflow-auto cursor-text"
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-xs">Terminal</span>
        </div>
        <div className="text-gray-400 text-xs">
          user@macbook-air ~
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4">
        {/* Terminal output */}
        {lines.map((line, index) => (
          <div key={index} className={`whitespace-pre-wrap mb-1 ${
            line.type === 'command' ? 'text-yellow-400' : 
            line.type === 'error' ? 'text-red-400' : 
            'text-green-400'
          }`}>
            {line.content}
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-yellow-400">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-400 ml-1"
            autoFocus
          />
          <span className="animate-pulse text-green-400">█</span>
        </form>
      </div>
    </div>
  );
};

export default TerminalApp;