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
            current: {},
            condition: {},
            forecast: {},
            dates: [],
            icons: [],
            maxtemps: [],
            mintemps: [] 
        };
    }

    componentDidMount()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (res) => {
                fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=
                       ${res.coords.latitude},${res.coords.longitude}&days=6`)
                .then(prom => prom.json())
                .then(json => this.updatestate(json))});                      
        }
        else {
            
        }
    }

    getForecast = (loc) =>
    {
        fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=${loc}&days=6`)
        .then(res => res.json())
        .then(json => this.updatestate(json));
    }
    updatestate(data)
    {
        console.log(data);
        const dates = [];
        const icons = [];
        const maxtemps = [];
        const mintemps = []
        console.log(data.forecast.forecastday[1].day);
        data.forecast.forecastday.forEach(item => {
            dates.push(item.date.substring(5, 10));
            icons.push(item.day.condition.icon);
            maxtemps.push(item.day.maxtemp_c);
            mintemps.push(item.day.mintemp_c);
        });
        this.setState({location: data.location,
                       current: data.current,
                       condition: data.current.condition,
                       forecast: data.forecast.forecastday,
                       dates: dates,
                       icons: icons,
                       maxtemps: maxtemps,
                       mintemps: mintemps
                    })
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
                        <Forecast dates={this.state.dates} icons={this.state.icons} maxtemps={this.state.maxtemps} mintemps={this.state.mintemps}/>
                    </div>
                </div>
                <div className="col-sm-0 col-md-4"></div>      
            </div> 
       </div>
        );
    }
}