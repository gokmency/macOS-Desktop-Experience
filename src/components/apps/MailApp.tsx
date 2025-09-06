import React from 'react';
import { Star, Paperclip, Reply } from 'lucide-react';

const MailApp: React.FC = () => {
  const emails = [
    {
      sender: 'Procrastination Club',
      subject: "We'll send you tips tomorrow",
      preview: "Our weekly newsletter about putting things off until later...",
      time: '2:34 PM',
      unread: true,
    },
    {
      sender: 'Meeting About Meetings Inc.',
      subject: 'Meeting to discuss our meeting about meetings',
      preview: 'Following up on our meeting where we discussed scheduling meetings...',
      time: '1:15 PM',
      unread: true,
    },
    {
      sender: 'Coffee Addiction Support',
      subject: 'Your daily espresso report',
      preview: 'Today: 7 cups ☕ (Above average! Keep it up!)',
      time: '11:30 AM',
      unread: false,
    },
    {
      sender: 'Overthinking Anonymous',
      subject: 'Did I send this email correctly?',
      preview: 'Actually, maybe I should have worded that differently. Or should I have...',
      time: '10:22 AM',
      unread: false,
    },
    {
      sender: 'Tab Hoarders United',
      subject: 'Browser crashed again',
      preview: 'RIP 237 tabs. We hardly knew ye (but we kept them open anyway).',
      time: '9:45 AM',
      unread: false,
    },
    {
      sender: 'Desk Plant',
      subject: 'Still alive (barely)',
      preview: 'Remember me? Your green friend? Water would be nice...',
      time: 'Yesterday',
      unread: true,
    },
  ];

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-muted border-r border-border p-3">
        <div className="space-y-1">
          <div className="p-2 bg-primary text-primary-foreground rounded text-sm font-medium">
            Inbox
            <span className="float-right">4</span>
          </div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Sent</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Drafts</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Spam</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Trash</div>
        </div>
        
        <div className="mt-6 text-xs font-medium text-muted-foreground mb-2">FOLDERS</div>
        <div className="space-y-1">
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Important</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Work</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Newsletters</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Cat Photos</div>
        </div>
      </div>

      {/* Email list */}
      <div className="w-96 border-r border-border">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Inbox</h2>
          <div className="text-sm text-muted-foreground">6 messages, 4 unread</div>
        </div>
        
        <div className="overflow-auto h-full">
          {emails.map((email, index) => (
            <div
              key={index}
              className={`p-4 border-b border-border hover:bg-accent cursor-pointer ${
                email.unread ? 'bg-background' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${
                    email.unread ? 'font-bold' : 'font-normal'
                  }`}>
                    {email.sender}
                  </div>
                  <div className={`text-sm truncate ${
                    email.unread ? 'font-semibold' : 'font-normal'
                  }`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-1">
                    {email.preview}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="text-xs text-muted-foreground">{email.time}</div>
                  {email.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">We'll send you tips tomorrow</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-accent rounded">
                <Star className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-accent rounded">
                <Reply className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            From: Procrastination Club &lt;newsletter@procrastination.club&gt;
          </div>
          <div className="text-sm text-muted-foreground">
            To: Me &lt;definitely.not.procrastinating@email.com&gt;
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          <div className="prose prose-sm max-w-none">
            <h2>The Procrastination Club Weekly Update</h2>
            
            <p>Hello fellow procrastinator!</p>
            
            <p>
              We were going to write a really insightful newsletter about productivity 
              and time management techniques this week, but... well, you know how it is.
            </p>
            
            <p>
              Instead, here's what we accomplished while avoiding our newsletter deadline:
            </p>
            
            <ul>
              <li>Reorganized our email folders (again)</li>
              <li>Researched the perfect productivity app for 3 hours</li>
              <li>Cleaned our desktop (the actual desk, not the computer one)</li>
              <li>Watched 17 YouTube videos about "How to Stop Procrastinating"</li>
            </ul>
            
            <p>
              We'll definitely send you those promised productivity tips tomorrow. 
              Or maybe next week. Depends on how compelling Netflix looks.
            </p>
            
            <p>
              Keep putting things off,<br />
              The Procrastination Club Team
            </p>
            
            <p className="text-xs text-muted-foreground mt-8">
              P.S. - If you're reading this instead of doing something important, 
              you're doing great! Gold star! ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;