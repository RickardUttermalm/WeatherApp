import React, {Component} from 'react';
import Forecast from './Forecast';

export default class Search extends Component
{
    // constructor(props)
    // {
    //     super(props);
        
    // }

    componentDidMount()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((res) => {
                fetch(`http://api.apixu.com/v1/forecast.json?key=2ab5aa03cc244d079ba82038192203&q=
                       ${res.coords.latitude},${res.coords.longitude}&days=5`)
                .then(res => res.json())
                .then(json => console.log(json));
            });
          } else {
            
          }
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
                            <input type="text" list="autocomplete"/>
                            <datalist id="autocomplete"></datalist>
                        </div>
                    </div>
                    <div className="row">
                        <Forecast/>
                    </div>
                </div>
                <div className="col-sm-0 col-md-4"></div>      
            </div> 
       </div>
        );
    }
}