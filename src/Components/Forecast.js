import React, {Component} from 'react';
import Day from './Day';

export default class Forecast extends Component
{
    render()
    {
        console.log(this.props.dates[1])
        return(
            <div className="row"><p>{this.props.dates[1]}</p></div>
        );
    }
}