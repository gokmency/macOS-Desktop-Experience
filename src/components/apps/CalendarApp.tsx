import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Calendar, Mail } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  const events = [
    { 
      id: 1, 
      title: 'Web3 Proje Geliştirme', 
      time: '09:00', 
      date: new Date().toDateString(),
      description: 'Smart contract ve API geliştirme toplantısı'
    },
    { 
      id: 2, 
      title: 'Crypto Community Building', 
      time: '14:00', 
      date: new Date().toDateString(),
      description: 'Topluluk operasyonları ve sürdürülebilir teşvikler'
    },
    { 
      id: 3, 
      title: 'Developer Tooling Review', 
      time: '16:30', 
      date: new Date(Date.now() + 86400000).toDateString(),
      description: 'Geliştirici araçları ve end-to-end deneyimler'
    },
    { 
      id: 4, 
      title: 'Open Source Governance', 
      time: '10:00', 
      date: new Date(Date.now() + 172800000).toDateString(),
      description: 'Şeffaf yönetim ve izinsiz sistemler'
    },
    { 
      id: 5, 
      title: 'Investment Strategy', 
      time: '11:30', 
      date: new Date(Date.now() + 259200000).toDateString(),
      description: 'Web3 yatırım fırsatları ve gerçek dünya etkisi'
    },
    { 
      id: 6, 
      title: 'Frontend Polish Session', 
      time: '15:00', 
      date: new Date(Date.now() + 345600000).toDateString(),
      description: 'Kullanıcı deneyimi ve arayüz iyileştirmeleri'
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

  const goToToday = () => {
    setCurrentDate(new Date());
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
      days.push(<div key={`empty-${i}`} className="h-24 border-r border-border"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      days.push(
        <div key={day} className={`h-24 border-r border-border p-2 ${isToday(day) ? 'bg-red-500/20' : ''}`}>
          <div className={`text-sm font-medium ${isToday(day) ? 'text-red-500' : 'text-white'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="text-xs bg-blue-500/20 text-blue-300 px-1 rounded truncate"
                title={event.title}
              >
                {event.time} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-400">+{dayEvents.length - 2} daha</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const todayEvents = events.filter(event => event.date === new Date().toDateString());

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {/* Left side - App icons */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Center - View selector */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {(['day', 'week', 'month', 'year'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedView === view 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {view === 'day' ? 'Gün' : 
               view === 'week' ? 'Hafta' : 
               view === 'month' ? 'Ay' : 'Yıl'}
            </button>
          ))}
        </div>

        {/* Right side - Search */}
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-800 rounded">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-light text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
              >
                Bugün
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 border-b border-gray-700">
        {dayNames.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-400 border-r border-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarApp;