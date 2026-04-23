import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PARTICIPATION, EVENTS, NOTIFICATIONS } from '../mockData';
import { LogOut, History, Bell, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  
  // Calculate hours
  const studentParticipation = PARTICIPATION.filter(p => p.studentEmail === user.email);
  const totalHours = studentParticipation.reduce((sum, p) => sum + p.hours, 0);
  const goalHours = 80;
  const remainingHours = Math.max(0, goalHours - totalHours);
  const progressPercent = Math.min(100, (totalHours / goalHours) * 100);

  // Get participation history with event details
  const history = studentParticipation.map(p => {
    const event = EVENTS.find(e => e.id === p.eventId);
    return { ...p, ...event };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container animate-fade">
      {/* Header */}
      <header className="flex-between" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Welcome, {user.name}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Student ID: {user.roll}</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Overview Cards */}
      <div className="grid-cols" style={{ marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', flex: 1 }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award color="var(--primary)" /> Progress to Goal
            </h3>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.round(progressPercent)}%</span>
          </div>
          
          <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)', transition: 'width 1s ease-out' }}></div>
          </div>
          
          <div className="flex-between" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span>{totalHours} hrs completed</span>
            <span>{goalHours} hrs requirement</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Remaining Hours</p>
          <h2 style={{ fontSize: '3rem', color: remainingHours === 0 ? 'var(--success)' : 'var(--primary)' }}>
            {remainingHours}
          </h2>
          <p style={{ fontSize: '0.875rem', color: remainingHours === 0 ? 'var(--success)' : 'inherit' }}>
            {remainingHours === 0 ? 'Requirement Met!' : 'Hours left to reach 80'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Event History */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <History size={24} color="var(--primary)" /> Participation History
          </h3>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            {history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date} • {item.type}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>+{item.hours} hrs</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={10} /> Credited
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>No participation records found.</p>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={24} color="var(--primary)" /> Alerts & Opportunities
          </h3>
          
          {NOTIFICATIONS.map(notif => (
            <div key={notif.id} style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{notif.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{notif.message}</p>
              <div style={{ background: 'rgba(45, 212, 191, 0.05)', padding: '1rem', borderRadius: '0.75rem', border: '1px dashed var(--primary)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Expected progress after completion:</div>
                <div className="flex-between">
                  <span style={{ fontWeight: '600' }}>{totalHours + notif.hours} / 80 hrs</span>
                  <ArrowRight size={16} color="var(--primary)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
