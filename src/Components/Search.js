import React, {Component} from 'react';
import Current from './Current';
import Forecast from './Forecast';

export default class Search extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            location: {},
            forecast: {},
            current: {},
            condition: {}
        };
    }

    async componentDidMount()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (res) => {
                // fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=
                //        ${res.coords.latitude},${res.coords.longitude}&days=6`)
                // .then(prom => prom.json())
                // .then(json => this.setState({location: json.location,
                //                              forecast: json.forecast.forecastday[1],
                //                              current: json.current,
                //                              condition: json.current.condition}))});
            const prom = await fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=
                                  ${res.coords.latitude},${res.coords.longitude}&days=6`);
            const data = await prom.json();
            console.log(data.forecast.forecastday[2].date);
            this.setState({location: data.location,
                           forecast: data.forecast,
                           current: data.current,
                           condition: data.current.condition})


            })                       
        }
        else {
            
        }
    }

    getForecast = (loc) =>
    {
        fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=${loc}&days=6`)
        .then(res => res.json())
        .then(json => this.setState({location: json.location,
                                     forecast: json.forecast,
                                     current: json.current,
                                     condition: json.current.condition}));
    }

    render()
    {
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-0 col-lg-4"></div>
                <div className="col-sm-12 col-lg-4">
                    <div className="row">
                        <div className="col-12">
                            <br/>
                            <input type="text" list="autocomplete" ref={(loc) => this.searchtext = loc}/>
                            <button onClick={() => this.getForecast(this.searchtext.value)}>Sök</button>
                            <datalist id="autocomplete"></datalist>
                        </div>
                    </div>
                    <div className="row">
                        <Current location={this.state.location} forecast={this.state.forecast} current={this.state.current}
                        condition={this.state.condition}/>
                    </div>
                    <div className="row">
                        <Forecast forecast={this.state.forecast}/>
                    </div>
                </div>
                <div className="col-sm-0 col-md-4"></div>      
            </div> 
       </div>
        );
    }
}