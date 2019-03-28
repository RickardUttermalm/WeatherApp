import React, {Component} from 'react';
import Day from './Day';

export default class Forecast extends Component
{
    render()
    {
        try {
            var divlist = [];
            for(let i = 1; i < 6; i++)
            {
                divlist.push(<Day date={this.props.dates[i]} icon={this.props.icons[i]}
                             maxtemp={this.props.maxtemps[i]} mintemp={this.props.mintemps[i]}/>)
            }
    
            return(
                <div className="row">
                    {divlist}
                </div>
            ); 
        } catch (err) {
            console.log(err);
        }
    }
}