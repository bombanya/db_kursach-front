import React, {Component} from "react";
import {InputNumber} from "primereact/inputnumber";
import {InputMask} from "primereact/inputmask";
import {Button} from "primereact/button";

class PositionPredictor  extends Component{
    constructor(props) {
        super(props);

        this.state = {
            predictMoment: "",
            norad: null,
            inputMomentError: false,
            inputNoradError: false,
            predictError: false,
            loading: false,
            altitude: null,
            latitude: null,
            longitude: null
        }

        this.predictPosition = this.predictPosition.bind(this);
    }

    predictPosition(){
        let satExists = false;
        this.props.sats.map((sat) => satExists = sat.noradId === this.state.norad ? true : satExists);
        if (!satExists){
            this.setState({inputNoradError: true});
            return;
        }

        let moment = this.state.predictMoment.replace(" ", "T") + "Z";
        if (isNaN(Date.parse(moment)) || new Date(moment) <= new Date()){
            this.setState({inputMomentError: true});
            return;
        }

        this.setState({loading: true});
        fetch(this.props.server + "predict/moment/" + this.state.norad + "/" + new Date(moment).toISOString())
            .then(response => {
                this.setState({loading: false});
                if (response.ok){
                    response.json().then(data => this.setState(
                        {altitude: Math.round(data.altitude * 1000)/ 1000,
                            latitude: Math.round(data.latitude * 180 / Math.PI * 1000) / 1000,
                            longitude: Math.round(data.longitude * 180 / Math.PI * 1000) / 1000}));
                }
                else this.setState({predictError: true})
            })
    }

    render() {
        const momentClassName = this.state.inputMomentError ? "p-invalid" : "";
        const noradClassName = this.state.inputNoradError ? "p-invalid" : "";
        return(
            <div className="p-grid">
                <div className="p-col-3">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="norad">Satellite Norad Id</label>
                            <InputNumber id="norad" value={this.state.norad}
                                         min={0}
                                         format={false}
                                         onValueChange={(e) => this.setState({norad: e.value,
                                             inputNoradError: false,
                                             predictError: false})}
                                         className={noradClassName}
                                         placeholder="norad"/>
                            <small className="p-error">
                                {this.state.inputNoradError && "There is no such sat in db"}
                            </small>
                        </div>
                        <div className="p-field">
                            <label htmlFor="moment">Moment</label>
                            <InputMask id="moment"
                                       className={momentClassName}
                                       mask="9999-99-99 99:99:99.999"
                                       slotChar="yyyy-mm-dd hh:mm:ss.sss"
                                       placeholder="moment to predict"
                                       value={this.state.predictMoment}
                                       onChange={(e) => this.setState({predictMoment: e.value,
                                           predictError: false,
                                           inputMomentError: false})}/>
                            <small className="p-error">
                                {this.state.inputMomentError && "Moment must be a valid timestamp in the future"}
                            </small>
                        </div>
                    </div>
                    <Button label="Predict" onClick={this.predictPosition} loading={this.state.loading}/>
                    <small className="p-error">
                        {this.state.predictError && "Error during predicting"}
                    </small>
                </div>

                <div className="p-col-3">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="altitude">Altitude</label>
                            <InputNumber id="altitude" value={this.state.altitude} format={false} readOnly={true}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="latitude">Latitude</label>
                            <InputNumber id="latitude" value={this.state.latitude} format={false} readOnly={true}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="longitude">Longitude</label>
                            <InputNumber id="longitude" value={this.state.longitude} format={false} readOnly={true}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default PositionPredictor;