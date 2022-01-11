import React, {Component} from "react";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

class DangerousFinder extends Component{
    constructor(props) {
        super(props);

        this.state = {
            norad: null,
            loading: false,
            dangerous: []
        }

        this.findDangerous = this.findDangerous.bind(this);
    }

    findDangerous(){
        fetch(this.props.server + "dangerous/" + this.state.norad)
            .then(response => response.json())
            .then(data => {
                data = data.map(e => {
                    return {noradId: e};
                });
                this.setState({dangerous: data});
            });
    }

    render() {
        return(
            <div className="p-grid">
                <div className="p-col-3">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="norad">Satellite Norad Id</label>
                            <InputNumber id="norad" value={this.state.norad}
                                         min={0}
                                         format={false}
                                         onValueChange={(e) => this.setState({norad: e.value})}
                                         placeholder="norad"/>
                        </div>
                    </div>
                    <Button label="Find dangerous" onClick={this.findDangerous} loading={this.state.loading}/>
                </div>
                <div className="p-col-3">
                    <DataTable value={this.state.dangerous} scrollable scrollHeight="150px">
                        <Column field="noradId" header="Dangerous Sats"/>
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default DangerousFinder;