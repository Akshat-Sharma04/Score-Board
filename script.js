{/* Componets of React*/ }

const { useState } = React;

function ScoreKeeperApp() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [message, setMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [showPopup, setShowPopup] = useState(false);
// Handels Runs
  const handleRun = (increment, message) => {
    if (wickets === 10) return; // no  more actions will be excuted after the match is over
    setRuns(runs + increment); //it will increase the runs
    setMessage(message);//it will display a contextual message
    setPopupType('run');//it set the pop up type to "run"
    setShowPopup(true);//shows the pop up as the buttons of runs,wickets are clicked
// Increament of Balls
    let newBalls = Math.round((overs - Math.floor(overs)) * 10) + 1;
    let newOvers = Math.floor(overs);

    if (newBalls > 5) {
      newBalls = 0;
      newOvers += 1;
    }

    // setOvers(newOvers + newBalls / 10);it will update the overs

    setTimeout(() => setShowPopup(false), 2000);//it will hide the pop up after 2 seconds
  };

//   Handels Wickets
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
 
//Handel Reset Button
  const resetScore = () => {
    setRuns(0);
    setWickets(0);
    setOvers(0);
  };
//Formats Over
  const formatOvers = (overs) => {
    const completedOvers = Math.floor(overs);
    const balls = Math.round((overs - completedOvers) * 10);
    return `${completedOvers}.${balls}`;
  };
{/* Rendering App*/ }

//Scoreboard UI
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
{/* Control Button */}
      <div className="controls">
        <button onClick={() => handleRun(1, '1 Run')}>Add 1 Run</button>
        <button onClick={() => handleRun(4, '4 Runs')}>Add 4 Runs</button>
        <button onClick={() => handleRun(6, '6 Runs')}>Add 6 Runs</button>
        <button onClick={handleWicket}>Add Wicket</button>
        <button onClick={resetScore} className="reset-button">Reset</button>
      </div>

      {showPopup && (
        <div className={`popup ${popupType}`}> {/* Conditional Rendering*/ }
          <div className="popup-icon">
            {popupType === 'run' ? '🏏' : popupType === 'wicket' ? '🎯' : '🎉'} {/* Place where pop up icon appears*/ }
          </div>
          {message}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<ScoreKeeperApp />, document.getElementById('root'));
