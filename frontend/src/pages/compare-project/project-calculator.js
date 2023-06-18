import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function ScoreCalculator(props) {
  const weight = useSelector(state => state.project.weight)
  const project = props.project
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const localWeight = { ...weight }
    const totalWeight = Object.values(localWeight).reduce((prev, cur) => prev + cur.weight, 0)
    const weightedScore = Object.keys(localWeight).reduce((prev, pro) => {
      const field = pro
      const weight = localWeight[field].weight
      const score = project[field].score
      const weightedScore = (weight * score)
      return prev + weightedScore
    }, 0)

    // Dispatch total score
    setSum((weightedScore / totalWeight).toFixed(2))

  }, [weight])

  return (
    <div>
      <h3 className='bold'>{sum}/100</h3>
    </div>
  );
}