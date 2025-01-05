import React, { useState } from 'react';

const CoinCalculator = () => {
  const [targetAmount, setTargetAmount] = useState('');
  const [coinDenominations, setCoinDenominations] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const denominations = coinDenominations.split(',').map(Number);
      const params = new URLSearchParams({
        targetAmount: parseFloat(targetAmount),
        coinDenominations: denominations.join(','),
      });

      // Use localhost when frontend and backend are running on the same machine,
      // Use 3.0.18.101 when frontend and backend are running on different machines
      const response = await fetch(`http://3.0.18.101:8080/api/coins/calculate?${params.toString()}`, {
      // const response = await fetch(`http://localhost:8080/api/coins/calculate?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert(`Failed to fetch data: ${error.message}. Please check the console for more details.`);
    }
  };

  return (
      <div>
        <h1>Coin Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Target Amount:</label>
            <input
                type="number"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Coin Denominations (comma separated):</label>
            <input
                type="text"
                value={coinDenominations}
                onChange={(e) => setCoinDenominations(e.target.value)}
                required
            />
          </div>
          <button type="submit">Calculate</button>
        </form>
        {result.length > 0 && (
            <div>
              <h2>Result:</h2>
              <p>{result.join(', ')}</p>
            </div>
        )}
      </div>
  );
};

export default CoinCalculator;
