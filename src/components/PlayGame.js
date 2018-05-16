import React from 'react'

export default ({vehicles, planets,onSelectChange, selectedValue, selections, handleRadioChange, vehicleCount}) => {
  

  const ReturnvehiclesAsOptions = (vehicles, ref) => {
    return (
      vehicles.map((vehicle, index)=>{
        
        return (
          <div key={index}>
            
            
            <input type="radio" disabled={vehicleCount[ref][index]<=0 || false} name="vehicle" value={index} checked={selections[ref].vehicle == index} onChange={(e) => handleRadioChange(e,ref)} />
            <label>{vehicle.name}</label> <span>{vehicleCount[ref][index]}</span>
          </div>
    
        )
      }
      )
    )
  }

  const ReturnPlanetsAsOptions = (planets) =>{
    return(
      planets.map((planet, index) => {
        return <option key={index} value={index} id={index}>{planet.name}</option>
      })
    )
  }
   const test = (stateOfCards) =>{
      switch(stateOfCards){
        case "notStarted": return(<div>notStarted</div>)
        case "inProgress": return(<div>InProgress</div>)
        case "Result": return(<div>Result</div>)
      }

   }


  return(
    <div>
      <div>
        <label htmlFor="0">Planet 0</label>
        <select id="0" onChange={onSelectChange} name="planet" value={selections[0].planet}>
        <option disabled selected value> -- select an option -- </option>
          {ReturnPlanetsAsOptions(planets)}
        </select>
      </div>
      
      {selections[0].planet && <form id='0'>{ReturnvehiclesAsOptions(vehicles, 0)}</form>}
      
      
      <div>
        <label htmlor="1">Planet 1</label>
        <select id="1" onChange={onSelectChange} name="planet" value={selections[1].planet}>
        <option disabled selected value> -- select an option -- </option>
          {ReturnPlanetsAsOptions(planets)}
        </select>
      </div>
      
      {selections[1].planet && <form id='1'>{ReturnvehiclesAsOptions(vehicles, 1)}</form>}
      
      <div>
        <label htmlor="2">Planet 2</label>
        <select id="2" onChange={onSelectChange} name="planet" value={selections[2].planet}>
        <option disabled selected value> -- select an option -- </option>
          {ReturnPlanetsAsOptions(planets)}
        </select>
      </div>
      
      {selections[2].planet && <form id='2'>{ReturnvehiclesAsOptions(vehicles, 2)}</form>}

      <div>
        <label htmlor="3">Planet 3</label>
        <select id="3" onChange={onSelectChange} name="planet" value={selections[3].planet}>
        <option disabled selected value> -- select an option -- </option>
          {ReturnPlanetsAsOptions(planets)}
        </select>
      </div>
      
      {selections[3].planet && <form id='3'>{ReturnvehiclesAsOptions(vehicles, 3)}</form>}
    </div>
  )

  
}
