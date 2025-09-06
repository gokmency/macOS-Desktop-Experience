import React, { useState } from 'react';
import { Plus, Search, Folder, Star, Trash2, Archive, MoreHorizontal } from 'lucide-react';

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
      date: 'Today',
      folder: 'Personal',
      starred: true
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
      date: '2 hours ago',
      folder: 'Work',
      starred: false
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
      date: 'Yesterday',
      folder: 'Personal',
      starred: false
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
      date: '3 days ago',
      folder: 'Personal',
      starred: true
    }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const folders = [
    { name: 'All Notes', count: notes.length, icon: Folder },
    { name: 'Personal', count: notes.filter(n => n.folder === 'Personal').length, icon: Folder },
    { name: 'Work', count: notes.filter(n => n.folder === 'Work').length, icon: Folder },
    { name: 'Starred', count: notes.filter(n => n.starred).length, icon: Star },
    { name: 'Recently Deleted', count: 0, icon: Trash2 },
  ];

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

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-900">Notes</h1>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 p-2">
          <div className="space-y-1 mb-4">
            {folders.map((folder, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
              >
                <folder.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{folder.name}</span>
                {folder.count > 0 && (
                  <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full ml-auto">
                    {folder.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-semibold text-gray-900">All Notes</h2>
          <div className="text-sm text-gray-500">{filteredNotes.length} notes</div>
        </div>

        <div className="flex-1">
          {filteredNotes.map((note, index) => (
            <div
              key={index}
              onClick={() => setSelectedNote(index)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedNote === index 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate flex items-center">
                    {note.title}
                    {note.starred && <Star className="w-3 h-3 text-yellow-500 ml-2 fill-current" />}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{note.date}</div>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="text-xs text-gray-600 truncate">
                {note.content.split('\n')[0].replace('#', '').trim()}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {note.folder}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{notes[selectedNote]?.title}</h3>
            <div className="text-sm text-gray-500">{notes[selectedNote]?.date}</div>
          </div>
          <div className="flex items-center space-x-2">
            {!editMode ? (
              <button 
                onClick={handleEditStart}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto bg-white">
          {!editMode ? (
            <div className="prose prose-sm max-w-none">
              {notes[selectedNote]?.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-gray-900">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold mt-5 mb-3 text-gray-800">{line.substring(3)}</h2>;
                } else if (line.startsWith('- [ ]')) {
                  return (
                    <div key={index} className="flex items-center space-x-3 mb-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">{line.substring(5)}</span>
                    </div>
                  );
                } else if (line.startsWith('- [x]')) {
                  return (
                    <div key={index} className="flex items-center space-x-3 mb-2">
                      <input type="checkbox" checked className="rounded border-gray-300" />
                      <span className="line-through text-gray-500">{line.substring(5)}</span>
                    </div>
                  );
                } else if (line.startsWith('- ')) {
                  return <div key={index} className="ml-6 mb-2 text-gray-700">• {line.substring(2)}</div>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <div key={index} className="font-semibold text-gray-800 mb-2">{line.substring(2, line.length - 2)}</div>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="mb-3 text-gray-700 leading-relaxed">{line}</p>;
                }
              })}
            </div>
          ) : (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full resize-none border-none outline-none bg-transparent font-mono text-sm text-gray-700 leading-relaxed"
              placeholder="Start writing..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;