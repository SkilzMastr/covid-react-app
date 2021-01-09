import React, { Component } from 'react'
const axios = require('axios')

export default class API extends Component {
    
    constructor() {
        super();
        this.stateRef = React.createRef();
        this.state = {
            state: "",
            positive: "",
            negative: "",
            deaths: "",
            lastUpdated: ""
        }

    }



    fetchCases = ()=>{
        var state = this.stateRef.current.value
        axios.get(`https://api.covidtracking.com/v1/states/${state.toLowerCase()}/current.json`).then((response)=>{

            this.setState({
                state: response.data.state,
                positive: response.data.positive,
                negative: response.data.negative,
                deaths: response.data.deathConfirmed || response.data.death,
                lastUpdated: response.data.dateModified

            })


        })

    }
    
    


    
    render() {
        return (
            <div>
                <label>
                    <form>
                        <input ref={this.stateRef} type="text" placeholder="State Abrev."/>
                        <button type="reset" onClick={this.fetchCases}>Get Stats</button>
                    </form>
                    <h4>State: {this.state.state}</h4>
                    <h4>Positive: {this.state.positive}</h4>
                    <h4>Negative: {this.state.negative}</h4>
                    <h4>Deaths: {this.state.deaths}</h4>
                    <h4>Last Updated: {this.state.lastUpdated}</h4>
                </label>            
            </div>
        )
    }
}
