import React, {Component} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class SatsTable  extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selectedSat: null
        }
    }

    render() {
        return(
            <DataTable value={this.props.sats} removableSort responsiveLayout="scroll"
                selectionMode="single" selection={this.state.selectedSat}
                onSelectionChange={e => this.setState({selectedSat: e.value})}
                loading={this.props.loading} >
                <Column field="noradId" header="Norad Id" sortable/>
                <Column field="intldes" header="Inter. Designator" sortable />
                <Column field="satName" header="Name" sortable/>
                <Column field="companyName" header="Company" sortable/>
                <Column field="launch" header="Launch Day" sortable/>
                <Column field="decay" header="Decay Day" sortable/>
                <Column field="opStatus" header="Status" sortable/>
                <Column field="mass" header="Mass (kg)" sortable/>
                <Column field="volume" header="Volume (m3)" sortable/>
                <Column field="satelliteType" header="Type" sortable/>
                <Column field="apogee" header="Apogee (km)" sortable/>
                <Column field="perigee" header="Perigee (km)" sortable/>
                <Column field="period" header="Period (min)" sortable/>
                <Column field="orbitType" header="Orbit Type" sortable/>
                <Column field="propellantMass" header="Propellant Mass" sortable/>
            </DataTable>
        );
    }

}

export default SatsTable;