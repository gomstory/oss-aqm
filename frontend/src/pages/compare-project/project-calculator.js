import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { metricWeight } from '../../redux/projectReducer';

const selectAvailableWeight = createSelector(
  (state) => state.project.weight,
  ({...weight}) => {
    for (let field in weight) {
      const isWeight = metricWeight.includes(field) === true
      const isDisabledWeight = weight[field].disabled === true
      if (!isWeight || isDisabledWeight) {
        delete weight[field]
      }
    }

    return weight
  }
)

export function ScoreCalculator(props) {
  const weight = useSelector(selectAvailableWeight)
  const project = props.project
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const logs = []
    const localWeight = { ...weight }
    const totalWeight = Object.values(localWeight).reduce((prev, cur) => prev + cur.weight, 0)
    const totalWeightedScore = Object.keys(localWeight).reduce((prev, field) => {
      const weight = parseInt(localWeight[field].weight)
      const score = parseFloat(project[field].score)
      const weightedScore = (weight * score)
      const total = prev + weightedScore
      logs.push({ field, weight, score, weightedScore })
      return total
    }, 0)

    // Dispatch total score
    const overallScore = (totalWeightedScore / totalWeight)
    setSum((overallScore).toFixed(2))
    logs.push({ field: 'overall_score', weight: totalWeight, score: totalWeightedScore, weightedScore: overallScore })

    // Debug as table
    console.table(logs)

  }, [weight, project])

  return (
    <div>
      <h3 className='bold'>{sum}/100</h3>
    </div>
  );
}