import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, withRouter, history } from 'react-router-dom';
import axios from 'axios';

import Results from './components/Results';
import StartGame from './components/StartGame';
import SecondPlayGame from './components/Second_Playing';

class App extends Component {
  constructor(props){
    super(props)
      this.planets = [{"name":"Donlon","distance":100},{"name":"Enchai","distance":200},{"name":"Jebing","distance":300},{"name":"Sapir","distance":400},{"name":"Lerbin","distance":500},{"name":"Pingasor","distance":600}];
      this.vehicles = [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}];

      this.state={
        vehicles:[{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}],
        planets:[{"name":"Donlon","distance":100},{"name":"Enchai","distance":200},{"name":"Jebing","distance":300},{"name":"Sapir","distance":400},{"name":"Lerbin","distance":500},{"name":"Pingasor","distance":600}],
        selections:[{"planet":null, "vehicle":null, "stateOfCard":"inProgress"},
                    {"planet":null, "vehicle":null, "stateOfCard":"notStarted"},
                    {"planet":null, "vehicle":null, "stateOfCard":"notStarted"},
                    {"planet":null, "vehicle":null, "stateOfCard":"notStarted"}
                  ],
        vehicleCount:[[2,1,1,2],[2,1,1,2],[2,1,1,2],[2,1,1,2]],
        activePlaying: 0,
        validInput: "true",
        canVehicleReachPlanet: true,
        timeRequired:0,
        validation:'',
        results:''
      }
  }
  
  
  handleRadioChange = (e, ref) =>{
    let selectionDetails = {};
    selectionDetails.vehicle = e.currentTarget.value;
    selectionDetails.planet = this.state.selections[this.state.activePlaying].planet;
    selectionDetails["stateOfCard"] = this.state.selections[this.state.activePlaying].stateOfCard;
    let selections = [...this.state.selections];
    selections[this.state.activePlaying] = selectionDetails;
    this.setState({
      selections,
    })

  }

  onSubmit = (e, history) =>{
    var headers={headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    }}
    //const history = this.props.history;
    var  data = ''
    var url = 'https://findfalcone.herokuapp.com/token';
    axios.post(url,data,headers)
      .then((response)=>{

        let responseBody = {};
        responseBody.token = response.data.token;
        responseBody.planet_names = this.state.selections.map((selection)=>{
          return this.planets[selection.planet].name;
        })
        responseBody.vehicle_names = this.state.selections.map((selection)=>{
          return this.vehicles[selection.vehicle].name;
        })
        axios.post('https://findfalcone.herokuapp.com/find', responseBody, headers)
          .then((response)=>{
            var result='';
            console.log(response)
            if(response.data.status == "success"){
              result = response.data.planet;
            }
            this.setState({result});
            
            
          }
          ).catch((error)=>{
            console.log(error);
          })

      }).catch(function (error) {
        console.log(error)
      });
      history.push('/results');
  }

  handleSelectedValue = (e) =>{
    const {id, value } = e.target;
    let selectionDetails = {};
    selectionDetails["planet"] = value;
    selectionDetails["vehicle"] = this.state.selections[id].vehicle;
    selectionDetails["stateOfCard"] = this.state.selections[id].stateOfCard;
    let selections = [...this.state.selections]
    selections[id] = selectionDetails;
    let vehicleCount = [...this.state.vehicleCount];
    if(id != 0){
      vehicleCount[id] = vehicleCount[id-1].slice();
      vehicleCount[id][selections[id-1].vehicle] -= 1;
    }
    this.setState({
      selections,
      vehicleCount
    })
  }

  validateInputs = () =>{
    var validation='';
    if((this.state.selections[this.state.activePlaying].planet === null) || (this.state.selections[this.state.activePlaying].vehicle === null)){
        validation='Select both Planet and vehicle';
      
    }else if(this.planets[this.state.selections[this.state.activePlaying].planet].distance > this.vehicles[this.state.selections[this.state.activePlaying].vehicle].max_distance ) {
        validation='Selected vehicle cannot reach the planet'
    }
    return validation;
        
  }

 selectNextPlanet = () =>{
   var validation= this.validateInputs();
    this.setState({validation}, function(){
      if(this.state.validation == ''){
        let selections = this.state.selections.slice();
        selections[this.state.activePlaying].stateOfCard = "Result";
        if(this.state.activePlaying <3){
          selections[this.state.activePlaying + 1].stateOfCard = "inProgress";
        }
        this.setState({
          activePlaying: this.state.activePlaying + 1,
          selections,
          canVehicleReachPlanet: true,
          timeRequired: this.state.timeRequired+ (this.planets[selections[this.state.activePlaying].planet].distance/this.vehicles[selections[this.state.activePlaying].vehicle].speed )

        })
      }
    })
  
}
resetState = () =>{
  let selections = [{"planet":null, "vehicle":null, "stateOfCard":"inProgress"},
  {"planet":null, "vehicle":null, "stateOfCard":"notStarted"},
  {"planet":null, "vehicle":null, "stateOfCard":"notStarted"},
  {"planet":null, "vehicle":null, "stateOfCard":"notStarted"}
]
  let vehicleCount=[[2,1,1,2],[2,1,1,2],[2,1,1,2],[2,1,1,2]]
  let activePlaying= 0
  let timeRequired = 0;

  this.setState({
    selections,
    vehicleCount,
    activePlaying,
    timeRequired
  })
}
  render() {
    return (
      
        <BrowserRouter>
          <div>
            <Route exact path='/' component={StartGame}></Route>
            <Route exact path='/secondPlay' 
                    render={() =>{
                        return(
                           <SecondPlayGame vehicles={this.vehicles}
                                     planets={this.planets}
                                     selections={this.state.selections}
                                     activePlaying= {this.state.activePlaying}
                                     vehicleCount = {this.state.vehicleCount}
                                     validation={this.state.validation}
                                     timeRequired={this.state.timeRequired}
                                     selectNextPlanet = {this.selectNextPlanet}
                                     resetState={this.resetState}
                                     onSubmit={this.onSubmit}
                                     onSelectChange={this.handleSelectedValue}
                                     handleRadioChange={this.handleRadioChange}
                        /> 
                        )}}>
            </Route>
            <Route exact path='/results' render={()=>{
                                        return <Results/>
            }}></Route>
          </div>
        </BrowserRouter>
      
    );
  }
}

export default App;
