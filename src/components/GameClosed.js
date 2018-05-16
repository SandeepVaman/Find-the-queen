import React from 'react'

export default ({selections, count,planets, vehicles}) => {
  return (
    <div>
      <h1>Result</h1>
      <p>Planet:<span>{planets[selections[count].planet].name}</span></p>
      <p>Vehicle:<span>{vehicles[selections[count].vehicle].name}</span></p>
    </div>
  )
}
