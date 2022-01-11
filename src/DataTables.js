import React, {Component} from "react";
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";
import SatsTable from "./SatsTable";
import EventsTable from "./EventsTable";

class DataTables extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            lastEventId: -1,
        }
    }

    render() {
        return(
            <Card title="Data">
                <TabView>
                    <TabPanel header="All Satellites">
                        <SatsTable sats={this.props.sats} loading={this.props.loadingSats}/>
                    </TabPanel>
                    <TabPanel header="Collision Events">
                        <EventsTable server={this.props.server}
                                     events={this.state.events}
                                     eventsUpdate={(e) => this.setState({events: e})}
                                     lastEventId={this.state.lastEventId}
                                     eventIdUpdate={(e) => this.setState({lastEventId: e})}/>
                    </TabPanel>
                </TabView>
            </Card>
        );
    }
}

export default DataTables;