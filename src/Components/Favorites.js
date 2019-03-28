import React, {Component} from 'react';

export default class Favorites extends Component
{
    render()
    {
        var favs = this.props.favs;
        if(favs.lenght === 0)
        {
            return;
        }
        else
        {
            var options = favs.map((item) => {
                return(<option>{item}</option>);
            });
            return(
                <select id="favorites" ref={(loc) => this.searchtext = loc} 
                onChange={() => this.props.getforecast(this.searchtext.value)}>{options}</select>
            );
        }
    }
}