import React, { useState } from 'react';
import { Task } from '../../types';

interface WearablesApiTesterProps {
  task: Task;
  onClose: () => void;
}

const WearablesApiTester: React.FC<WearablesApiTesterProps> = ({ task, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.sleepscan.com');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async () => {
    if (!apiKey) {
      setError('Please enter an API key');
      return;
    }

    if (!baseUrl) {
      setError('Please enter a base URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const url = `${baseUrl.replace(/\/$/, '')}${task.endpoint}`;
      const headers: Record<string, string> = {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      };

      const res = await fetch(url, {
        method: task.method || 'GET',
        headers: headers
      });

      const responseData = await res.json();
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: responseData
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatResponseData = () => {
    if (!response) return '';
    
    let output = `Status: ${response.status} ${response.statusText}\n\n`;
    output += `Headers:\n${JSON.stringify(response.headers, null, 2)}\n\n`;
    output += `Response Data:\n${JSON.stringify(response.data, null, 2)}`;
    
    return output;
  };

  const getTaskInstructions = () => {
    switch (task.id) {
      case 'get-participants':
        return 'Fetches all participants from the wearables database. Returns an array of participant objects with their Withings email, user ID, study ID, and timestamps.';
      case 'get-studies':
        return 'Fetches all studies from the database. Returns an array of study objects with their code, display name, description, and timestamps.';
      case 'get-devices':
        return 'Fetches all devices from the database. Returns an array of device objects with their type, MAC address, participant info, and metadata.';
      default:
        return 'API endpoint for the wearables system.';
    }
  };

  return (
    <div className="task-panel">
      <button className="close-panel" onClick={onClose}>×</button>
      
      <div className="panel-header">
        <span style={{ fontSize: '2rem' }}>{task.icon}</span>
        <h2>{task.title}</h2>
      </div>
      
      <div style={{ 
        background: 'var(--bg-accent)', 
        padding: '1rem', 
        borderRadius: '10px', 
        marginBottom: '1.5rem',
        border: '1px solid var(--border-medium)'
      }}>
        <p><strong>Endpoint:</strong> <code>{task.method} {task.endpoint}</code></p>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          {getTaskInstructions()}
        </p>
      </div>
      
      <div className="form-group">
        <label>Base URL:</label>
        <input 
          type="url" 
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://api.sleepscan.com"
        />
      </div>
      
      <div className="form-group">
        <label>API Key:</label>
        <input 
          type="password" 
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your X-API-Key header value"
        />
      </div>
      
      <button 
        className="btn" 
        onClick={handleApiCall} 
        disabled={loading}
      >
        {loading ? (
          <>
            <span>⏳</span>
            Loading...
          </>
        ) : (
          <>
            <span>🚀</span>
            Send Request
          </>
        )}
      </button>
      
      {error && (
        <div className="result-area error">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {response && (
        <div className={`result-area ${
          response.status >= 200 && response.status < 300 ? 'success' : 'error'
        }`}>
          {formatResponseData()}
        </div>
      )}
      
      {response && response.data && response.data.participants && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
            📊 Summary
          </h3>
          <div style={{ 
            background: 'var(--bg-accent)', 
            padding: '1rem', 
            borderRadius: '10px',
            border: '1px solid var(--border-medium)'
          }}>
            <p><strong>Total Participants:</strong> {response.data.participants.length}</p>
            {response.data.participants.length > 0 && (
              <p><strong>First Participant:</strong> {response.data.participants[0].withings_email}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WearablesApiTester;