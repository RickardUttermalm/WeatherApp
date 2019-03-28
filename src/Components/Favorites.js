import React, {Component} from 'react';

export default class Favorites extends Component
{
    render()
    {
        var favs = JSON.parse(localStorage.getItem("wafavorites"));
        if(favs == null)
        {
            return;
        }
        else
        {
            var options = favs.map((item) => {
                return(<option>{item}</option>);
            });
            return(
                <select id="favorites">{options}</select>
            );
        }
    }
}