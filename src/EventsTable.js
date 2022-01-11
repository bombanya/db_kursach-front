import React, {Component} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

class EventsTable extends Component{
    constructor(props) {
        super(props);

        this.state = {
            updater: 0
        }

        this.updateEventsList = this.updateEventsList.bind(this);
    }

    updateEventsList(){
        fetch(this.props.server + "events/new/" + this.props.lastEventId)
            .then(response => response.json())
            .then(data => {
                data.map(d => {
                    d.distance = Math.round(d.distance * 1000) / 1000;
                    d.eventCreationTime = new Date(d.eventCreationTime).toUTCString();
                    d.predictedEventTime = new Date(d.predictedEventTime).toUTCString();
                    this.props.eventIdUpdate(
                        d.eventId > this.props.lastEventId ? d.eventId : this.props.lastEventId);
                    return d;
                });
                this.props.eventsUpdate(this.props.events.concat(data));
            })
    }

    componentDidMount() {
        this.setState({updater: setInterval(this.updateEventsList, 6000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.updater);
    }

    render() {
        return(
            <DataTable value={this.props.events} responsiveLayout="scroll">
                <Column field="eventId" header="Event Id"/>
                <Column field="noradId1" header="Norad Id 1"/>
                <Column field="noradId2" header="Norad Id 2"/>
                <Column field="predictedEventTime" header="Predicted Event Time"/>
                <Column field="eventCreationTime" header="Event Calculating Moment"/>
                <Column field="maneuveringSat" header="Sat To Maneuver"/>
                <Column field="distance" header="Distance Between Sats (km)"/>
            </DataTable>
        );
    }
}

export default EventsTable;