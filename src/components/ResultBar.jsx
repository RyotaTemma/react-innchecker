import React, { useEffect } from 'react'

export const ResultBar = ({ results, startValue, combinedResults, setCombinedResults, diffs, setDiffs, latestStartValue }) => {
  // スタートの値とリザルトの値を結合する
  useEffect(() => {
    setCombinedResults([...startValue, ...results].sort((a, b) => a.id - b.id));
  }, [results, startValue, setCombinedResults]);

  // 最新のスタートの値を記録する
  for (let i = combinedResults.length - 1; i >= 0; i--) {
    if (combinedResults[i].source === "startValue") {
      latestStartValue.current = combinedResults[i].value;
      break;
    }
  }

  // diffを保持する
  useEffect(() => {
    const newDiffs = [];
    const newCombinedResults = [...startValue, ...results].sort((a, b) => a.id - b.id);
    for (let i = 1; i < newCombinedResults.length; i++) {
      const prevItem = newCombinedResults[i - 1];
      const item = newCombinedResults[i];
      const diff = (item.value - prevItem.value) * 2;
      newDiffs.push(diff);
      const ave = newDiffs.length > 0 ? newDiffs.reduce((a, b) => a + b) / newDiffs.length : 0;
      newCombinedResults[i] = {...item, ave};
    }
    setDiffs(newDiffs);
    setCombinedResults(newCombinedResults);
  }, [results, startValue, setDiffs, setCombinedResults]);

  // console.log(latestStartValue.current);
  // console.log(numresults);

  return (
    <div className="Results">
      {combinedResults.map((item, index) => {
        const prevItem = combinedResults[index - 1];
        const diff = prevItem ? (item.value - prevItem.value) * 2 : 0;
        // Calculate the average of all diffs
        const ave = item.ave || 0;
        return (
          <div className="Result" key={index}>
            <div className="Resultnum">
              <span>{item.value} {diff !== 0 && item.source === "results" && `今回：${diff}回/1k`} {ave !== 0 && item.source === "results" && `平均：${ave}回/1k`} {item.source === "startValue" && '---Start---'}</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}