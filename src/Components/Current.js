import React, {Component} from 'react';


export default class Current extends Component
{
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
    }

    render()
    {
        var favs = JSON.parse(localStorage.getItem("wafavorites"));
        var iconclass;
        if(favs.includes(this.props.location.name))
        {
            iconclass = "fa fa-star";
        }
        else
        {
            iconclass = "fa fa-star-o";
        }


        return(
        <div>
            <div className="row">
                <div className="col-12 text-center">
                    <h3>{this.props.location.name}<i className={iconclass}
                         onClick={() => this.managefavorites(this.props.location.name)}></i></h3>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <img id="condimg" alt="" src={"http:" + this.props.condition.icon}  />
                </div>
                <div className="col-6"><h1>{this.props.current.temp_c}&deg;c</h1></div>
            </div>
        </div>
        );
    }
}