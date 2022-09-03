import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function ScoreCalculator(props) {
  const weight = useSelector(state => state.project.weight)
  const project = props.project
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const totalWeight = Object.values(weight).reduce((prev, cur) => prev + cur, 0)
    const weightedScore = Object.keys(weight).reduce((prev, pro) => {
      let field = pro
      let w = weight[field]
      let score = project[field + '_score']
      let w_score = (w * score)
      console.debug(field, w, score, w_score)
      return prev + w_score
    }, 0)
    setSum((weightedScore / totalWeight).toFixed(2))
  }, [weight])

  return (
    <div>
      <h3 className='bold'>{sum}/100</h3>
    </div>
  );
}