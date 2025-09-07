import React, { useState } from 'react';
import { Plus, Search, Folder, Star, Trash2, Archive, MoreHorizontal } from 'lucide-react';

const NotesApp: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState(0);
  const [notes, setNotes] = useState([
    {
      title: 'About Gökmen Çelik',
      content: `# Gökmen Çelik - Developer & Community Builder

## Professional Profile
**Independent developer and crypto community builder** turning ideas into usable products and engaged communities.

## Core Expertise
- **End-to-end Development**: Smart contracts, APIs, frontend polish
- **Community Operations**: Building and managing engaged crypto communities
- **Web3 Technologies**: Blockchain, DeFi, and decentralized systems
- **Developer Tooling**: Creating tools that enhance developer experience

## Philosophy & Values
- **Open Systems**: Believer in permissionless, transparent systems
- **Sustainable Incentives**: Focus on long-term value creation
- **Transparent Governance**: Advocating for clear, fair decision-making
- **Real World Impact**: Bias for shipping and measurable results

## Current Focus Areas
- **Web3 Development**: Smart contracts and decentralized applications
- **Developer Tooling**: Improving the developer experience
- **Investment Strategy**: Exploring opportunities in crypto and tech
- **Community Building**: Creating sustainable, engaged communities

## Contact & Projects
- **Personal Website**: gokmens.com
- **Project Portfolio**: grainz.vercel.app
- **Specialization**: Full-stack development with Web3 focus`,
      date: 'Today',
      folder: 'Personal',
      starred: true
    },
    {
      title: 'Web3 Development Notes',
      content: `# Web3 Development Strategy

## Smart Contract Development
- Focus on gas optimization and security
- Implement comprehensive testing suites
- Use established patterns and libraries
- Consider upgradeability and governance

## API Development
- RESTful APIs for blockchain interaction
- Real-time data feeds for DeFi protocols
- Rate limiting and caching strategies
- Documentation and developer experience

## Frontend Polish
- Intuitive user interfaces for complex DeFi operations
- Mobile-first responsive design
- Progressive Web App capabilities
- Accessibility and user experience optimization

## Community Building
- Sustainable incentive mechanisms
- Transparent governance processes
- Educational content and resources
- Long-term engagement strategies`,
      date: '2 hours ago',
      folder: 'Work',
      starred: true
    },
    {
      title: 'Project Ideas',
      content: `# Project Pipeline & Ideas

## Active Projects
- **Gokmens.com**: Personal portfolio and blog
- **Grainz.vercel.app**: Web3 project showcase
- **Community Tools**: Developer-focused utilities

## Upcoming Ideas
- **DeFi Analytics Dashboard**: Real-time protocol metrics
- **Developer Toolkit**: Smart contract deployment automation
- **Community Governance Platform**: Transparent voting mechanisms
- **Educational Platform**: Web3 learning resources

## Investment Opportunities
- **Early-stage Web3 projects**: Focus on utility and adoption
- **Developer tooling companies**: Improving ecosystem infrastructure
- **Community-driven protocols**: Sustainable tokenomics
- **Real-world integration**: Bridging crypto and traditional finance

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Python, Rust
- **Blockchain**: Ethereum, Solana, Polygon
- **Tools**: Vercel, GitHub, Docker`,
      date: 'Yesterday',
      folder: 'Work',
      starred: false
    },
    {
      title: 'Community Building Strategy',
      content: `# Community Building & Operations

## Core Principles
- **Permissionless Systems**: Open access and participation
- **Sustainable Incentives**: Long-term value alignment
- **Transparent Governance**: Clear decision-making processes
- **Real Impact**: Focus on measurable outcomes

## Engagement Strategies
- **Educational Content**: Tutorials, guides, and resources
- **Regular Communication**: Updates, announcements, and feedback
- **Community Events**: AMAs, workshops, and networking
- **Recognition Programs**: Rewarding valuable contributions

## Governance Framework
- **Proposal System**: Structured decision-making process
- **Voting Mechanisms**: Fair and transparent voting
- **Implementation Tracking**: Clear execution and accountability
- **Feedback Loops**: Continuous improvement based on community input

## Success Metrics
- **Community Growth**: Active participants and contributors
- **Engagement Levels**: Discussion quality and frequency
- **Project Adoption**: Usage of community-developed tools
- **Long-term Sustainability**: Self-sustaining ecosystem`,
      date: '3 days ago',
      folder: 'Work',
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