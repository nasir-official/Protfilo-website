import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ views: 0, messages: 0 });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple frontend protection
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch('http://localhost:5000/api/stats');
      const statsData = await statsRes.json();
      setStats({ views: statsData.total_views, messages: statsData.total_messages });

      // Fetch messages
      const msgsRes = await fetch('http://localhost:5000/api/messages');
      const msgsData = await msgsRes.json();
      setMessages(msgsData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-form-card" style={{ maxWidth: '400px', width: '100%' }}
        >
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <h2 className="heading-sm">Admin Access</h2>
            <div className="section-divider" style={{ margin: '0.5rem auto 0' }}></div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="form-input"
                required
              />
            </div>
            {error && <p className="text-error" style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-submit">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section container">
      <div className="section-header">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-md"
        >
          Dashboard
        </motion.h2>
        <div className="section-divider"></div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--accent-primary)' }}>Loading data...</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error && <p className="text-error" style={{ marginBottom: '2rem', textAlign: 'center' }}>{error}</p>}
          
          <div className="grid-cols-2" style={{ marginBottom: '4rem' }}>
            <div className="skill-card" style={{ textAlign: 'center' }}>
              <h3 className="skill-title">Total Views</h3>
              <p className="heading-lg text-gradient">{stats.views}</p>
            </div>
            <div className="skill-card" style={{ textAlign: 'center' }}>
              <h3 className="skill-title">Total Messages</h3>
              <p className="heading-lg text-gradient">{stats.messages}</p>
            </div>
          </div>

          <h3 className="heading-sm" style={{ marginBottom: '2rem', color: 'var(--accent-primary)' }}>Inbox</h3>
          
          <div className="messages-grid">
            <AnimatePresence>
              {messages.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No messages yet.</p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="message-card glass-card"
                  >
                    <div className="message-header">
                      <h4 className="message-subject">{msg.subject}</h4>
                      <span className="message-date">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="message-sender">
                      <strong>{msg.name}</strong> ({msg.email})
                    </div>
                    <div className="message-body">
                      {msg.message}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
