import React, {Component} from 'react';


export default class Forecast extends Component
{
    render()
    {
        console.log(this.props.location);
        console.log(this.props.forecast);
        console.log(this.props.current);
        console.log(this.props.condition);
        return(
        <div>
            <div className="row">
                <div className="col-12 text-center">
                    <h3>{this.props.location.name}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <img id="condimg" alt="" src={"http:" + this.props.condition.icon}  />
                </div>
            </div>
        </div>
        );
    }
}