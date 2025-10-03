import React, { useState } from 'react';

interface Base64ToolProps {
  onClose: () => void;
}

const Base64Tool: React.FC<Base64ToolProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input);
      setResult(encoded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed');
      setResult('');
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(input);
      setResult(decoded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decoding failed');
      setResult('');
    }
  };

  return (
    <div className="task-panel">
      <button className="close-panel" onClick={onClose}>×</button>
      <h2>🔐 Base64 Tool</h2>
      
      <div className="form-group">
        <label>Input Text:</label>
        <textarea 
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hello World!"
        />
      </div>
      
      <button className="btn" onClick={encodeBase64}>Encode</button>
      <button className="btn btn-secondary" onClick={decodeBase64}>Decode</button>
      
      {error && (
        <div className="result-area" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {result && (
        <div className="result-area">
          {result}
        </div>
      )}
    </div>
  );
};

export default Base64Tool;