import React, {Component} from "react";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";

class NewSatInput extends Component{

    render() {
        let inputClassName = this.props.error ? "p-invalid" : "";
        return(
          <div>
              <div className="p-grid">
                  <div className="p-col-3">
                      <div className="p-inputgroup">
                          <InputNumber value={this.props.newSatNorad} min={0} onValueChange={this.props.onChange}
                                       placeholder="Norad Id of the new satellite" format={false}
                                       className={inputClassName} />
                          <Button label="Add Sat"
                                  loading={this.props.loading}
                                  onClick={this.props.onClick}/>
                      </div>
                  </div>
              </div>
              <div className="p-grid">
                  <div className="p-col-3 ">
                      <small className="p-error">
                          {this.props.error && "Such satellite does not exist"}
                      </small>
                  </div>
              </div>
          </div>

        );
    }
}

export default NewSatInput;
