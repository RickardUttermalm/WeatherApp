import React, {Component} from 'react';
import Day from './Day';

export default class Forecast extends Component
{
    render()
    {
        console.log(this.props.forecast);

        var test = this.props.forecast;
        console.log(test);

        return(
            <div className="row"></div>
        );
    }
}