import * as React from "react";
import './App.css';
import DontPanic from "./DontPanic";
import NegativeComment from "./NegativeComment";
import PositiveComment from "./PositiveComment";

// Using API at https://data.police.uk/docs/

export class App extends React.Component {

  state={places:[],               // List of places (forces) we could visit
         previous:["Betelgeuse"], // List of previous places visited
         last:"Betelgeuse",       // Specific last one
         lastStopAndSearch:0,     // How many Stops and Searches in last area
         isFetchingForce:false,
         readForces:false,
         isFetchingForces:false,
         isFetchingNhood:false,
         isFetchingBoundary:false,
         readNhood:false,
         readBoundary:false,
         neighbourhoods:[],
         boundary:[],
        } 
  
  fetchForces = () => {
    
    this.setState({isFetchingForces:true})
    
    fetch('https://data.police.uk/api/forces')
      .then(response => {
        if (response.ok) { 
          response.json().then(json => { 
            this.setState({places:json.map(item => {return item;}),isFetchingForces:false,readForces:true});
        })
        } else {
          this.setState({isFetchingForces:false});
          console.log("Sub-Etha Net down.  Please wait.");
          const myTimeout=setTimeout(this.fetchForces,5000);
        }
      })
      .catch((error) => {
        console.log("ERROR WAS:"+error);
        this.setState({isFetchingForces:false});
        const myTimeout=setTimeout(this.fetchForces,5000);
    });
    
  }
  
  componentDidMount() { this.fetchForces(); }
  
  getNeighbourhoods=(name) => {
    let index=this.state.places.find(x => x.name===name);
    
    if (index==undefined) { // Back to Betelgeuse
      this.setState({readNhood:false,isFetchingNhood:false}); 
    } else {
      let id=index.id;
      
      fetch('https://data.police.uk/api/'+id+'/neighbourhoods')
        .then(response => {
          if (response.ok) { 
            response.json().then(json => { 
              this.setState({neighbourhoods:json.map(item => {return item;}),isFetchingNhood:false,readNhood:true});
              console.log(this.state.neighbourhoods);
          })
          } else {
            this.setState({isFetchingNhood:false});
            console.log("Sub-Etha Net down.");
          }
        })
        .catch((error) => {
          console.log("ERROR WAS:"+error);
          this.setState({isFetchingNhood:false});
      });
    }
  }
  
  addPrevious=(id) => {
    
    this.setState({isFetchingForce:true});    // This never works, seems to be an API fault.  Doesn't work with their own example!
    // Example given is https://data.police.uk/api/stops-force?force=avon-and-somerset&date=2017-01
    
    const name=this.state.places.find(x => x.id===id).name;

    fetch('https://data.police.uk/api/stops-force?force='+id+'&date=2020-01')  // Arbitrary comparator date
      .then(response => {
        if (response.ok) { 
          response.json().then(json => {console.log(json); /*this.setState({places:json.map(item => {return [item.name];})}); */ // Comment out as it always fails
        })
        } else {
          console.log("Sub-Etha Net down.  Please wait.");
        }
      })
      .catch((error) => {
        console.log("ERROR WAS:"+error);
    });
    
    if (this.state.previous.reduce((present,item) => present||item==name,false)) {
      //Don't add if it is already there
      this.setState(state => ({
        previous: state.previous,
        last:name,
        places:state.places,        
      })) 
    } else {
      this.setState(state => ({
        previous: [name,...state.previous],
        last:name,
        places:state.places,
      }))
    }
    this.getNeighbourhoods(name);
    
  }

  reselectPrevious=(name) => {
    this.setState(state => ({last:name,readNhood:false}))
    this.getNeighbourhoods(name);
  }
  
  visitNeighbourhood=(name) => {
    console.log(name); 
    
    let id=this.state.places.find(x => x.name===this.state.last).id;
    
    fetch('https://data.police.uk/api/'+id+'/'+name+'/boundary')
        .then(response => {
        if (response.ok) { 
          response.json().then(json => { 
            this.setState({boundary:json.map(item => {return item;}),isFetchingBoundary:false,readBoundary:true});
            console.log(this.state.boundary);
            // Done.  Not obvious what to do next ...
        })
        } else {
          this.setState({isFetchingBoundary:false});
          console.log("Sub-Etha Net down.");
        }
      })
      .catch((error) => {
        console.log("ERROR WAS:"+error);
        this.setState({isFetchingBoundary:false});
    });    
  }

  render() {
    let better=false;
    return (
      <div>
        <h1 className="mytitle">The Hitchhiker's Guide to the UK</h1>

        <h2 className="ctr">WHERE DO YOU WANT TO GO TODAY?</h2>
        <h2 className="ctr">(Taking account of local crime statistics)</h2>
        <table className="center">
          <tbody>
            <tr>

              <th className="right">Previously visited:</th>
              
              <th className="right">
                <select name="forces" id="forces" onChange={(e) => this.reselectPrevious(e.target.value)}>
                  { this.state.previous.map((i) => (<option key={i} value={i}>{i+" Area"}</option>)) }
                </select>
              </th>              
              
            </tr>
 
            
            <tr>
              <th className="right">Options:</th>
              <th className="right">
              {
                !this.state.isFetchingForces && this.state.readForces &&
                <select name="forces" id="forces" onChange={(e) => this.addPrevious(e.target.value)}>
                  { this.state.places.map((item) => (<option key={item.id} value={item.id}>{item.name+" Area"}</option>)) }
                </select>
              }
              { 
                !this.state.readForces && <p className="invertRightRed">Sub-Etha Net down.  Please wait.</p>
              }
              {
                this.state.isFetchingForces && <p className="invertRight">Please wait</p>
              }
              </th>
            </tr>
          </tbody>
        </table>
        {better=((Math.random()*2)<1.0)}
        {
          // Should be using the result from number of stops but gets ERR_ABORTED 502 - server seems always busy
        }
        {!better && <NegativeComment {...this.state}/>}
        {better  && <PositiveComment {...this.state}/>}
        
        {this.state.readNhood&&<table className="center">
          <tbody>
            <tr>

              <th className="right">You could go further in the {this.state.last} area:</th>
              
              <th className="right">
                <select name="nhoods" id="nhoods" onChange={(e) => this.visitNeighbourhood(e.target.value)}>
                  { this.state.neighbourhoods.map((item) => (<option key={item.id} value={item.id}>{item.name+""}</option>)) }
                </select>
              </th>              
              
            </tr>
          </tbody>
        </table>}
        
        <DontPanic />
      </div>
    );
  }
}