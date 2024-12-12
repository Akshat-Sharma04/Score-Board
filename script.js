const { useState } = React;

function ScoreKeeperApp() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [message, setMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleRun = (increment, message) => {
    if (wickets === 10) return; // No more actions after match is over
    setRuns(runs + increment);
    setMessage(message);
    setPopupType('run');
    setShowPopup(true);

    let newBalls = Math.round((overs - Math.floor(overs)) * 10) + 1;
    let newOvers = Math.floor(overs);

    if (newBalls > 5) {
      newBalls = 0;
      newOvers += 1;
    }

    setOvers(newOvers + newBalls / 10);

    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleWicket = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
      if (wickets + 1 === 10) {
        setMessage('Match Over!');
        setPopupType('over');
      } else {
        setMessage('Wicket!');
        setPopupType('wicket');
      }

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const resetScore = () => {
    setRuns(0);
    setWickets(0);
    setOvers(0);
  };

  const formatOvers = (overs) => {
    const completedOvers = Math.floor(overs);
    const balls = Math.round((overs - completedOvers) * 10);
    return `${completedOvers}.${balls}`;
  };

  return (
    <div className="scorekeeper-container">
      <header className="scoreboard-header">
        <h1>Cricket Score Keeper</h1>
      </header>

      <div className="scoreboard">
        <div className="scoreboard-row">
          <div className="score-item">
            <span className="score-label">Runs: </span>
            <strong>{runs}</strong>
          </div>
          <div className="score-item">
            <span className="score-label">Wickets: </span>
            <strong>{wickets}</strong>
          </div>
          <div className="score-item">
            <span className="score-label">Overs: </span>
            <strong>{formatOvers(overs)}</strong>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => handleRun(1, '1 Run')}>Add 1 Run</button>
        <button onClick={() => handleRun(4, '4 Runs')}>Add 4 Runs</button>
        <button onClick={() => handleRun(6, '6 Runs')}>Add 6 Runs</button>
        <button onClick={handleWicket}>Add Wicket</button>
        <button onClick={resetScore} className="reset-button">Reset</button>
      </div>

      {showPopup && (
        <div className={`popup ${popupType}`}>
          <div className="popup-icon">
            {popupType === 'run' ? '🏏' : popupType === 'wicket' ? '🎯' : '🎉'}
          </div>
          {message}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<ScoreKeeperApp />, document.getElementById('root'));