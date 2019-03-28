import React, {Component} from 'react';


export default class Current extends Component
{

    render()
    {
        try {
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
                            {
                                (this.props.invalidinput)
                                ?<p id="errormsg">Invalid input</p>
                                : ""
                            }
                            <h3>{this.props.location.name}<i className={iconclass}
                                 onClick={() => this.props.managefavorites(this.props.location.name)}></i></h3>
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
        } catch (err) {
            console.log(err);
            return(
                <div>
                    <h2>No data avaliable</h2>
                </div>
            );

        }

    }
}