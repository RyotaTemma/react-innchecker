import './App.css';
import { InputForm } from './components/InputForm';
import {  Title } from "./components/Title";
import { ResultBar } from "./components/ResultBar";
import React from 'react';
// import { useState } from 'react';

function App() {
  // 初期値以外を管理するステート
  const [results, setResults] = React.useState([]);
  // 最初の値を管理するステート
  const [startValue, setStartValue] = React.useState([]);
  // 両方の値を管理するステート
  const [combinedResults, setCombinedResults] = React.useState([]);
  // diffを管理するステート
  const [diffs, setDiffs] = React.useState([]);
  // 最後に追加したスタートの値を記録する
  const latestStartValue = React.useRef();

  return (
    <div className="body">
      <Title />
      <div className="displaycontent">
        <InputForm results={results} setResults={setResults} startValue={startValue} setStartValue={setStartValue}
        combinedResults={combinedResults} setCombinedResults={setCombinedResults} diffs={diffs} setDiffs={setDiffs} latestStartValue={latestStartValue}/>
        <ResultBar results={results} setResults={setResults} startValue={startValue} setStartValue={setStartValue}
        combinedResults={combinedResults} setCombinedResults={setCombinedResults} diffs={diffs} setDiffs={setDiffs} latestStartValue={latestStartValue}/>
      </div>
    </div>
  );
}

export default App;
