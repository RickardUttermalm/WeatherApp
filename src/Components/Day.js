import React, {Component} from 'react';

export default class Day extends Component
{
    render()
    {
        console.log(this.props.date);
        return(
            <div className="col-2 text-center day">
                <p className="daydate">{this.props.date}</p>
                <img alt="" src={"http:" + this.props.icon}/>
                <p className="daymax">{this.props.maxtemp}&deg;c</p>
                <p className="daymin">{this.props.mintemp}&deg;c</p>
            </div>
        )
    }
}