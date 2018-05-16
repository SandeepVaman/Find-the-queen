import React from 'react';

export default (props) => {
    const {vehicles, planets,onSelectChange, selections, handleRadioChange, vehicleCount, count, selectNextPlanet, resetState} = props
    const ReturnvehiclesAsOptions = (vehicles, ref) => {
        return (
          vehicles.map((vehicle, index)=>{            
            return (
              <div key={index}>   
                <input type="radio" disabled={vehicleCount[ref][index]<=0 || false} name="vehicle" value={index} checked={selections[ref].vehicle == index} onChange={(e) => handleRadioChange(e,ref)} />
                <label>{vehicle.name}</label> <span>{vehicleCount[ref][index]}</span>
              </div>
            )})
        )}
    
    const ReturnPlanetsAsOptions = (planets) =>{
        return(
          planets.map((planet, index) => {
            return <option key={index} value={index} id={index}>{planet.name}</option>
          })
    )}
    
  return (
      <div>
        <div>
            <label htmlFor={count}>Planet {count}</label>
            <select id={count} onChange={onSelectChange} name="planet" value={selections[count].planet}>
            <option disabled selected value> -- select an option -- </option>
            {ReturnPlanetsAsOptions(planets)}
            </select>
        </div>
        {selections[count].planet && <form id={count}>{ReturnvehiclesAsOptions(vehicles, count)}</form>}
    </div>
  )
}
