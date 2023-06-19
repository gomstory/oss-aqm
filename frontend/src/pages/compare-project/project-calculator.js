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
    const localWeight = { ...weight }
    const totalWeight = Object.values(localWeight).reduce((prev, cur) => prev + cur.weight, 0)
    const weightedScore = Object.keys(localWeight).reduce((prev, field) => {
      const weight = localWeight[field].weight
      const score = project[field].score
      const weightedScore = (weight * score)
      return prev + weightedScore
    }, 0)

    // Dispatch total score
    setSum((weightedScore / totalWeight).toFixed(2))

  }, [weight, project])

  return (
    <div>
      <h3 className='bold'>{sum}/100</h3>
    </div>
  );
}