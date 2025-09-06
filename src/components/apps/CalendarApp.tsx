import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const events = [
    { 
      id: 1, 
      title: 'Meeting About Meetings', 
      time: '9:00 AM', 
      date: new Date().toDateString(),
      description: 'A meeting to discuss all the meetings we need to schedule'
    },
    { 
      id: 2, 
      title: 'Pretend to Work on Important Project', 
      time: '10:30 AM', 
      date: new Date().toDateString(),
      description: 'Stare at screen intensely while browsing social media'
    },
    { 
      id: 3, 
      title: 'Lunch Meeting (Actually Just Lunch)', 
      time: '12:00 PM', 
      date: new Date().toDateString(),
      description: 'Convince myself this sandwich is a business expense'
    },
    { 
      id: 4, 
      title: 'Deadline That I Forgot About', 
      time: '2:00 PM', 
      date: new Date(Date.now() + 86400000).toDateString(),
      description: 'Panic-induced productivity session'
    },
    { 
      id: 5, 
      title: 'Stand-up Meeting (Everyone Still Sits)', 
      time: '3:30 PM', 
      date: new Date(Date.now() + 86400000).toDateString(),
      description: 'Daily ritual of explaining why nothing got done yesterday'
    },
    { 
      id: 6, 
      title: 'Coffee Break #7', 
      time: '4:15 PM', 
      date: new Date(Date.now() + 172800000).toDateString(),
      description: 'Fuel for pretending to be productive'
    },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-border"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      days.push(
        <div key={day} className={`h-20 border border-border p-1 ${isToday(day) ? 'bg-primary/10' : ''}`}>
          <div className={`text-sm font-medium ${isToday(day) ? 'text-primary' : ''}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="text-xs bg-primary/20 text-primary px-1 rounded truncate"
                title={event.title}
              >
                {event.time} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const todayEvents = events.filter(event => event.date === new Date().toDateString());

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 bg-muted border-r border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Today's Schedule of Chaos</h2>
          <button className="p-1 hover:bg-accent rounded">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {todayEvents.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              No meetings today! 
              <br />
              (Check back in 5 minutes, someone will schedule one)
            </div>
          ) : (
            todayEvents.map((event) => (
              <div key={event.id} className="p-3 bg-background rounded border border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-primary font-medium">{event.time}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.description}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 p-3 bg-muted/50 rounded">
          <div className="text-xs font-medium mb-2">Productivity Tip of the Day</div>
          <div className="text-xs text-muted-foreground">
            "The best way to avoid procrastination is to schedule it. 
            Block out 'Procrastination Time' from 2-4 PM daily."
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
          <div className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
            ⚠️ Reminder: Coffee meeting at 3 PM
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            It's just coffee, but calling it a meeting makes it sound important.
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 flex flex-col">
        {/* Calendar header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h1>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-1 hover:bg-accent rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-1 hover:bg-accent rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
              Today
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-r border-border">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 grid grid-cols-7">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;