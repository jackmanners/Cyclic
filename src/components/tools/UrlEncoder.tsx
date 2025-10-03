import React, { useState } from 'react';

interface UrlEncoderProps {
  onClose: () => void;
}

const UrlEncoder: React.FC<UrlEncoderProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encodeUrl = () => {
    try {
      const encoded = encodeURIComponent(input);
      setResult(encoded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed');
      setResult('');
    }
  };

  const decodeUrl = () => {
    try {
      const decoded = decodeURIComponent(input);
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
      <h2>🔗 URL Encoder</h2>
      
      <div className="form-group">
        <label>Input Text:</label>
        <textarea 
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hello World & Special Characters!"
        />
      </div>
      
      <button className="btn" onClick={encodeUrl}>Encode</button>
      <button className="btn btn-secondary" onClick={decodeUrl}>Decode</button>
      
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

export default UrlEncoder;