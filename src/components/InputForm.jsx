// src/components/InputForm.js
import React from 'react';
import "../InputForm.css";

export const InputForm = ({ results, setResults, startValue, setStartValue, combinedResults, diffs, setDiffs, latestStartValue }) => {
  const [display, setDisplay] = React.useState("0");

  const handleClick = (e) => {
    if (display === "0") {
      setDisplay(e.target.value);
    } else {
      setDisplay(display + e.target.value);
    }
  }

  const handleDeleteleft = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  const handleClickCheck = () => {
    setResults([...results, { id: Date.now(), value: Number(display), source: "results" }]);
    setDisplay("0");
  }

  const startClick = () => {
    setStartValue([...startValue, { id: Date.now(), value: Number(display), source: "startValue" }]);
    setDisplay("0");
  }

  const handleDelete = () => {
    setResults([]);
    setStartValue([]);
  }

  const handleLineDelete = () => {
    const lastElement = combinedResults[combinedResults.length - 1];
    if (lastElement.source === "results") {
      setResults(results.slice(0, -1));
      setDiffs(diffs.slice(0, -1));
    } else if (lastElement.source === "startValue") {
      setStartValue(startValue.slice(0, -1));
    }
  }

  return (
    <div>
      <div className="display">{display}</div>
      <div className="number-buttons">
        {[...Array(9).keys()].map((i) => (
          <div className="number-button" key={i + 1}>
            <button value={i + 1} onClick={handleClick}>
              {i + 1}
            </button>
          </div>
        ))}
        <div className="number-button">
          <button onClick={handleDeleteleft}>
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>
        <div className="number-button">
          <button value={0} onClick={handleClick}>
            0
          </button>
        </div>
        <div className="number-button">
          <button onClick={handleClickCheck}>
            <i className="fa-regular fa-circle-check"></i>
          </button>
        </div>
        <div className='number-button'>
          <button onClick={startClick}>
            Start
          </button>
        </div>
        <div className="number-button">
          <button onClick={() => handleLineDelete()}>
            一行<br />削除
          </button>
        </div>
        <div className="number-button">
          <button onClick={() => handleDelete()}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
