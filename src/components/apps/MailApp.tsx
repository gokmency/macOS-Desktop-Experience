import React, { useState } from 'react';
import { 
  Star, 
  Paperclip, 
  Reply, 
  Archive, 
  Trash2, 
  Flag, 
  MoreHorizontal,
  Search,
  Plus,
  Mail,
  Inbox,
  Send,
  FileText,
  Trash,
  Folder,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react';

const MailApp: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [composeOpen, setComposeOpen] = useState(false);
  
  const emails = [
    {
      sender: 'Apple Developer',
      subject: 'WWDC 2024: New Features Available',
      preview: 'Discover the latest innovations in iOS 18, macOS Sequoia, and watchOS 11...',
      time: '2:34 PM',
      unread: true,
      starred: true,
      attachments: 2,
    },
    {
      sender: 'GitHub',
      subject: 'Pull request merged: Feature branch',
      preview: 'Your pull request has been successfully merged into the main branch...',
      time: '1:15 PM',
      unread: true,
      starred: false,
      attachments: 0,
    },
    {
      sender: 'Design Team',
      subject: 'Weekly Design Review Meeting',
      preview: 'Join us for our weekly design review meeting tomorrow at 2 PM...',
      time: '11:30 AM',
      unread: false,
      starred: true,
      attachments: 1,
    },
    {
      sender: 'Stripe',
      subject: 'Payment received: $2,500.00',
      preview: 'We have successfully processed your payment. Thank you for your business...',
      time: '10:22 AM',
      unread: false,
      starred: false,
      attachments: 0,
    },
    {
      sender: 'Figma',
      subject: 'Design System Updated',
      preview: 'Your team has updated the design system. New components are available...',
      time: '9:45 AM',
      unread: false,
      starred: false,
      attachments: 3,
    },
    {
      sender: 'Calendar',
      subject: 'Meeting Reminder: Project Kickoff',
      preview: 'Don\'t forget about your meeting tomorrow at 10 AM for the project kickoff...',
      time: 'Yesterday',
      unread: true,
      starred: false,
      attachments: 0,
    },
  ];

  const folders = [
    { name: 'Inbox', count: 4, icon: Inbox },
    { name: 'Sent', count: 0, icon: Send },
    { name: 'Drafts', count: 2, icon: FileText },
    { name: 'Spam', count: 0, icon: Trash2 },
    { name: 'Trash', count: 0, icon: Trash },
  ];

  const smartFolders = [
    { name: 'Flagged', count: 2, icon: Flag },
    { name: 'Unread', count: 4, icon: Circle },
    { name: 'Attachments', count: 6, icon: Paperclip },
    { name: 'Today', count: 3, icon: Clock },
  ];

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-900">Mail</h1>
          <button 
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setComposeOpen(true)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 mb-6">
          {folders.map((folder, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                folder.name === 'Inbox' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
              }`}
            >
              <folder.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{folder.name}</span>
              {folder.count > 0 && (
                <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full ml-auto">
                  {folder.count}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Smart Folders
          </div>
          <div className="space-y-1">
            {smartFolders.map((folder, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                <folder.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{folder.name}</span>
                {folder.count > 0 && (
                  <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full ml-auto">
                    {folder.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Mailboxes
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <Folder className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Work</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <Folder className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Personal</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <Folder className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Newsletters</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email list */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search mail" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Inbox</h2>
            <div className="text-sm text-gray-500">6 messages, 4 unread</div>
          </div>
        </div>
        
        <div className="flex-1">
          {emails.map((email, index) => (
            <div
              key={index}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedEmail === index 
                  ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                  : email.unread 
                    ? 'bg-white hover:bg-gray-50' 
                    : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedEmail(index)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    {email.starred ? (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className={`text-sm font-medium truncate ${
                      email.unread ? 'font-bold text-gray-900' : 'text-gray-700'
                    }`}>
                      {email.sender}
                    </div>
                    <div className="flex items-center space-x-2">
                      {email.attachments > 0 && (
                        <Paperclip className="w-3 h-3 text-gray-400" />
                      )}
                      <div className="text-xs text-gray-500">{email.time}</div>
                    </div>
                  </div>
                  <div className={`text-sm truncate mb-1 ${
                    email.unread ? 'font-semibold text-gray-900' : 'text-gray-600'
                  }`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {email.preview}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {emails[selectedEmail]?.subject}
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Reply className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            From: {emails[selectedEmail]?.sender} &lt;{emails[selectedEmail]?.sender.toLowerCase().replace(' ', '.')}@example.com&gt;
          </div>
          <div className="text-sm text-gray-600">
            To: Me &lt;me@example.com&gt;
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {emails[selectedEmail]?.time}
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-auto bg-white">
          <div className="prose prose-sm max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {emails[selectedEmail]?.subject}
              </h2>
              <p className="text-gray-700 mb-4">
                Hello there!
              </p>
              <p className="text-gray-700 mb-4">
                {emails[selectedEmail]?.preview}
              </p>
              <p className="text-gray-700 mb-4">
                We're excited to share this update with you. This email contains important information 
                that we believe will be valuable for your workflow and productivity.
              </p>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Key Highlights:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Enhanced user experience with new features</li>
                  <li>Improved performance and reliability</li>
                  <li>Updated security measures</li>
                  <li>Better integration with existing tools</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4">
                If you have any questions or need assistance, please don't hesitate to reach out to our support team.
              </p>
              <p className="text-gray-700 mt-4">
                Best regards,<br />
                The Team
              </p>
            </div>
            
            {emails[selectedEmail]?.attachments > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attachments ({emails[selectedEmail]?.attachments})
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 text-xs font-bold">PDF</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Document.pdf</div>
                      <div className="text-xs text-gray-500">2.3 MB</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;