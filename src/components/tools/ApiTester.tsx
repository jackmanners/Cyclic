import React, { useState } from 'react';
import { ApiRequest, ApiResponse } from '../../types';

interface ApiTesterProps {
  onClose: () => void;
}

const ApiTester: React.FC<ApiTesterProps> = ({ onClose }) => {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: '',
    headers: {}
  });
  const [headersText, setHeadersText] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendRequest = async () => {
    if (!request.url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let headers = {};
      if (headersText.trim()) {
        headers = JSON.parse(headersText);
      }

      const options: RequestInit = {
        method: request.method,
        headers: headers
      };

      if (['POST', 'PUT'].includes(request.method) && body.trim()) {
        options.body = body;
      }

      const res = await fetch(request.url, options);
      const responseText = await res.text();
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: responseText
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-panel">
      <button className="close-panel" onClick={onClose}>×</button>
      <h2>🌐 API Tester</h2>
      
      <div className="form-group">
        <label>Method:</label>
        <select 
          value={request.method} 
          onChange={(e) => setRequest({...request, method: e.target.value as ApiRequest['method']})}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>URL:</label>
        <input 
          type="url" 
          value={request.url}
          onChange={(e) => setRequest({...request, url: e.target.value})}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
      
      <div className="form-group">
        <label>Headers (JSON format):</label>
        <textarea 
          rows={3}
          value={headersText}
          onChange={(e) => setHeadersText(e.target.value)}
          placeholder='{"Content-Type": "application/json"}'
        />
      </div>
      
      <div className="form-group">
        <label>Body (for POST/PUT):</label>
        <textarea 
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='{"key": "value"}'
        />
      </div>
      
      <button className="btn" onClick={handleSendRequest} disabled={loading}>
        {loading ? 'Sending...' : 'Send Request'}
      </button>
      
      {error && (
        <div className="result-area" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {response && (
        <div className="result-area">
          <strong>Status:</strong> {response.status} {response.statusText}\n\n
          <strong>Headers:</strong>\n{JSON.stringify(response.headers, null, 2)}\n\n
          <strong>Body:</strong>\n{response.body}
        </div>
      )}
    </div>
  );
};

export default ApiTester;