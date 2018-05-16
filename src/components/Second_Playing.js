import React from 'react'
import GameUninitiated from './GameUninitiated';
import GameInProgress from './GameInProgress';
import GameClosed from './GameClosed';
import { withRouter } from 'react-router-dom';

 const SecondPlaying = (props) => {
    const {vehicles, planets,onSelectChange, selectedValue, selections, handleRadioChange,activePlaying, vehicleCount, selectNextPlanet, resetState, timeRequired, onSubmit, validation}  = props;
    const checkIfVehivleReachesPlanet= function(){
        const palnetIndex = selections[activePlaying].planet;
        const vehicleIndex = selections[activePlaying].vehicle;

        if(planets[palnetIndex].distance <= vehicles[vehicleIndex].max_distance){
            return false;
        }

    }
    return (
    <div>
    <div>
      { selections.map((selection, index) => {
          switch(selection.stateOfCard){
            case "notStarted": return <GameUninitiated/>
            case "inProgress": return <GameInProgress {...props} count={index}/>
            case "Result": return <GameClosed selections={selections} count={index} planets={planets} vehicles={vehicles}/>
          }
      })}
    </div>
        
    {validation === ''?null:<p>{validation}</p>}
    {(activePlaying == 4)?(<button onClick={(e)=>onSubmit(e,props.history)}>Submit</button>):(<button onClick={selectNextPlanet}>Next</button>)}
    <button onClick={resetState}>Reset</button>
    <p>time taken:<span>{timeRequired}</span></p>
    </div>
  )
}

export default withRouter(SecondPlaying);