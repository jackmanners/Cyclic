import React, { useState } from 'react';

interface JsonFormatterProps {
  onClose: () => void;
}

const JsonFormatter: React.FC<JsonFormatterProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setResult(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setResult('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setResult(minified);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setResult('');
    }
  };

  return (
    <div className="task-panel">
      <button className="close-panel" onClick={onClose}>×</button>
      <h2>📝 JSON Formatter</h2>
      
      <div className="form-group">
        <label>Input JSON:</label>
        <textarea 
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"John","age":30}'
        />
      </div>
      
      <button className="btn" onClick={formatJson}>Format</button>
      <button className="btn btn-secondary" onClick={minifyJson}>Minify</button>
      
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

export default JsonFormatter;