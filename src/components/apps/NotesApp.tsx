import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

const NotesApp: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  const [notes, setNotes] = useState([
    {
      title: 'Life Goals',
      content: `# Life Goals (Revised Edition #47)

## Short Term Goals:
- [ ] Stop making lists
- [x] Make a list about stopping making lists
- [ ] Find the irony in the above

## Long Term Goals:
- Learn to parallel park (Year 12 of trying)
- Finally understand what "cryptocurrency" actually is
- Master the art of small talk without mentioning the weather
- Develop actual hobbies beyond "watching Netflix"

## Impossible Goals:
- Remember where I put my keys
- Keep plants alive for more than a month
- Use all the apps I've downloaded
- Actually finish reading those 47 books I started`,
      date: 'Today'
    },
    {
      title: 'Meeting Notes',
      content: `# Meeting That Could Have Been an Email #247

**Date:** Today (unfortunately)
**Duration:** 2 hours (felt like 12)
**Attendees:** Too many

## Key Takeaways:
- We need more meetings to discuss our meetings
- Someone said "synergy" 14 times (I was counting)
- The real meeting will happen in the hallway after
- Action items will be forgotten by tomorrow

## New Buzzwords Discovered:
- "Ideate" (just say "think", Karen)
- "Circle back" (the corporate version of "never")
- "Low-hanging fruit" (there is no fruit here)

## Next Steps:
- Schedule a meeting to discuss these meeting notes
- Create a PowerPoint about why we need fewer PowerPoints
- Touch base to discuss touching bases`,
      date: '2 hours ago'
    },
    {
      title: 'Grocery List',
      content: `# Things I Definitely Need (But Will Forget to Buy)

## Essential Items:
- Milk (because cereal is a food group)
- Bread (the foundation of civilization)
- Eggs (for that omelet I'll never make)
- Coffee (liquid motivation)

## Items I Don't Need But Will Buy Anyway:
- Fancy cheese that will expire unused
- That weird fruit I've never tried
- Organic something-or-other (it's healthier, right?)
- Ice cream (for "emergencies")

## Things I'll Remember Only After Getting Home:
- The ONE thing I actually went to the store for
- Cat food (sorry, Mr. Whiskers)
- Toilet paper (always toilet paper)

*Note to self: Actually bring this list to the store instead of leaving it on the counter again.*`,
      date: 'Yesterday'
    },
    {
      title: 'Random Thoughts',
      content: `# 3 AM Philosophical Musings

## Questions That Keep Me Awake:
- Why do we park in driveways and drive on parkways?
- If nothing sticks to Teflon, how does Teflon stick to the pan?
- Why do we call it "rush hour" when nobody's moving?

## Shower Thoughts Archive:
- Maybe procrastination is just the art of keeping up with yesterday
- Social media is basically showing off to people we don't actually like
- "Sleep" is just death being shy

## Important Realizations:
- I spend more time choosing what to watch than actually watching
- My phone knows me better than I know myself
- Adult life is mostly just saying "I should really..." and then not doing it

*Written at 3:17 AM because my brain apparently has no chill.*`,
      date: '3 days ago'
    }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');

  const handleEditStart = () => {
    setEditMode(true);
    setEditContent(notes[selectedNote].content);
  };

  const handleSave = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNote] = {
      ...updatedNotes[selectedNote],
      content: editContent
    };
    setNotes(updatedNotes);
    setEditMode(false);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-muted border-r border-border flex flex-col">
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Notes</h2>
            <button className="p-1 hover:bg-accent rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-8 pr-3 py-1 text-sm bg-background border border-border rounded"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {notes.map((note, index) => (
            <div
              key={index}
              onClick={() => setSelectedNote(index)}
              className={`p-3 border-b border-border cursor-pointer hover:bg-accent ${
                selectedNote === index ? 'bg-accent' : ''
              }`}
            >
              <div className="font-medium text-sm truncate">{note.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{note.date}</div>
              <div className="text-xs text-muted-foreground truncate mt-1">
                {note.content.split('\n')[0].replace('#', '').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">{notes[selectedNote]?.title}</h3>
          <div className="flex items-center space-x-2">
            {!editMode ? (
              <button 
                onClick={handleEditStart}
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Edit
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditMode(false)}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {!editMode ? (
            <div className="prose prose-sm max-w-none">
              {notes[selectedNote]?.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h2>;
                } else if (line.startsWith('- [ ]')) {
                  return (
                    <div key={index} className="flex items-center space-x-2 mb-1">
                      <input type="checkbox" className="rounded" />
                      <span>{line.substring(5)}</span>
                    </div>
                  );
                } else if (line.startsWith('- [x]')) {
                  return (
                    <div key={index} className="flex items-center space-x-2 mb-1">
                      <input type="checkbox" checked className="rounded" />
                      <span className="line-through text-muted-foreground">{line.substring(5)}</span>
                    </div>
                  );
                } else if (line.startsWith('- ')) {
                  return <div key={index} className="ml-4 mb-1">• {line.substring(2)}</div>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="mb-2">{line}</p>;
                }
              })}
            </div>
          ) : (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full resize-none border-none outline-none bg-transparent font-mono text-sm"
              placeholder="Start writing..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;