import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { USERS, FACULTY_STUDENT_MAPPING, PARTICIPATION, EVENTS } from '../mockData';
import { LogOut, Users, Search, Filter, Download, UserCircle, X, ExternalLink } from 'lucide-react';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const [filterType, setFilterType] = useState('ALL'); // ALL, COMPLETED, IN_PROGRESS, AT_RISK, DEFAULTER
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Get assigned students only
  const assignedEmailList = FACULTY_STUDENT_MAPPING[user.email] || [];
  const assignedStudents = useMemo(() => {
    return USERS.filter(u => assignedEmailList.includes(u.email)).map(s => {
      const hours = PARTICIPATION.filter(p => p.studentEmail === s.email).reduce((sum, p) => sum + p.hours, 0);
      let status = 'IN_PROGRESS';
      if (hours >= 80) status = 'COMPLETED';
      else if (hours < 10) status = 'DEFAULTER';
      else if (hours < 40) status = 'AT_RISK';
      
      return { ...s, hours, status };
    });
  }, [assignedEmailList]);

  // Apply filters
  const filteredStudents = assignedStudents.filter(s => {
    if (filterType === 'ALL') return true;
    if (filterType === 'COMPLETED') return s.hours >= 80;
    if (filterType === 'DEFAULTER') return s.hours < 10;
    if (filterType === 'AT_RISK') return s.hours >= 10 && s.hours < 40;
    if (filterType === 'IN_PROGRESS') return s.hours >= 40 && s.hours < 80;
    return true;
  });

  const handleDownload = (student) => {
    alert(`Generating detailed report for ${student.name} (${student.roll})...\nCSV Format Report saved to downloads.`);
  };

  const getStudentHistory = (email) => {
    return PARTICIPATION.filter(p => p.studentEmail === email).map(p => {
      const event = EVENTS.find(e => e.id === p.eventId);
      return { ...p, ...event };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="container animate-fade">
      {/* Header */}
      <header className="flex-between" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Counselling Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>{user.name} | Faculty Advisor</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Stats Summary */}
      <div className="grid-cols" style={{ marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Students</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{assignedStudents.length}</span>
            <Users size={16} color="var(--primary)" />
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed (80+ Hrs)</p>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {assignedStudents.filter(s => s.hours >= 80).length}
          </span>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>At Risk / Defaulters</p>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger)' }}>
            {assignedStudents.filter(s => s.hours < 40).length}
          </span>
        </div>
      </div>

      {/* Controls & List */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Filter size={20} color="var(--primary)" /> Student Monitoring List
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select 
              className="input-field" 
              style={{ width: 'auto', background: 'var(--bg-darker)' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="AT_RISK">At Risk</option>
              <option value="DEFAULTER">Defaulters</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Roll Number</th>
                <th style={{ padding: '1rem' }}>Student Name</th>
                <th style={{ padding: '1rem' }}>PCD Hours</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }} className="table-row-hover">
                  <td style={{ padding: '1rem' }}>{student.roll}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{student.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', minWidth: '60px' }}>
                        <div style={{ width: `${Math.min(100, (student.hours/80)*100)}%`, height: '100%', background: student.hours >= 80 ? 'var(--success)' : 'var(--primary)', borderRadius: '2px' }}></div>
                      </div>
                      <span>{student.hours}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.65rem', padding: '0.25rem 0.6rem', borderRadius: '1rem',
                      background: student.hours >= 80 ? 'rgba(34, 197, 94, 0.1)' : student.hours < 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: student.hours >= 80 ? 'var(--success)' : student.hours < 10 ? 'var(--danger)' : 'var(--warning)',
                      border: `1px solid ${student.hours >= 80 ? 'var(--success)' : student.hours < 10 ? 'var(--danger)' : 'var(--warning)'}44`
                    }}>
                      {student.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-outline" style={{ padding: '0.4rem', border: 'none' }} onClick={() => setSelectedStudent(student)} title="View Details">
                        <ExternalLink size={16} />
                      </button>
                      <button className="btn-outline" style={{ padding: '0.4rem', border: 'none' }} onClick={() => handleDownload(student)} title="Download Report">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No students found matching the current filter.
            </div>
          )}
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-panel animate-fade" style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="flex-between" style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <UserCircle size={48} color="var(--primary)" />
                <div>
                  <h2 style={{ fontSize: '1.5rem' }}>{selectedStudent.name}</h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Roll: {selectedStudent.roll} • {selectedStudent.email}</p>
                </div>
              </div>
              <button className="btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => setSelectedStudent(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h3>PCD Activity History</h3>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Total: {selectedStudent.hours} / 80 Hours</span>
              </div>
              
              {getStudentHistory(selectedStudent.email).map((item, idx) => (
                <div key={idx} style={{ padding: '1rem', borderLeft: '2px solid var(--primary)', marginBottom: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex-between">
                    <span style={{ fontWeight: '600' }}>{item.name}</span>
                    <span style={{ color: 'var(--primary)' }}>+{item.hours} hrs</span>
                  </div>
                  <div className="flex-between" style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
              
              {getStudentHistory(selectedStudent.email).length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No records found for this student.</p>
              )}
            </div>

            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => handleDownload(selectedStudent)}>
                <Download size={18} /> Download Detailed PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </div>
  );
};

export default FacultyDashboard;
