import React, {Component} from 'react';
import Current from './Current';
import Forecast from './Forecast';
import Favorites from './Favorites';

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
            mintemps: [],
            favorites: [],
            invalidinput: Boolean
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
            this.getForecast("Stockholm");
        }
        
        this.setState({favorites: JSON.parse(localStorage.getItem("wafavorites"))});
    }

    getForecast = (loc) =>
    {
        fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=${loc}&days=6`)
        .then(res => res.json())
        .then(json => this.updatestate(json));
    }
    updatestate(data)
    {
        try {
            console.log(data);
            const dates = [];
            const icons = [];
            const maxtemps = [];
            const mintemps = []
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
                           mintemps: mintemps,
                           invalidinput: false
                        })
        } catch (error) {
            console.log(error);
            this.setState({invalidinput: true});
        }
    }
    managefavorites = (loc) => 
    {
        
        var favs = JSON.parse(localStorage.getItem("wafavorites"));
        console.log(favs);
        if(favs == null)
        {
            favs = [];
        }

        if(favs.includes(loc))
        {
            for (var i=favs.length-1; i>=0; i--) {
                if (favs[i] === loc) {
                    favs.splice(i, 1);
                }
            }
        }
        else
        {
            favs.push(loc);
        }
        localStorage.setItem("wafavorites", JSON.stringify(favs));
        this.setState({favorites: favs});
    }

    render()
    {
        return(
        <div className="container-fluid" id="maincontainer">
            <div className="row">
                <div className="col-sm-0 col-lg-4"></div>
                <div className="col-sm-12 col-lg-4">
                    <div className="row">
                        <div className="col-12">
                            <br/>
                            <input className="searchinput" type="text" ref={(loc) => this.searchtext = loc}/>
                            <button className="searchbtn btn" onClick={() => this.getForecast(this.searchtext.value)}>Sök</button>
                            <Favorites favs={this.state.favorites} getforecast={this.getForecast}/>
                        </div>
                    </div>
                    <div className="row">
                        <Current location={this.state.location} forecast={this.state.forecast} current={this.state.current}
                        condition={this.state.condition} managefavorites={this.managefavorites} 
                        invalidinput={this.state.invalidinput}/>
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