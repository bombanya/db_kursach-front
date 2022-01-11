import React, {Component} from "react";
import {TabPanel, TabView} from "primereact/tabview";
import NewSatInput from "./NewSatInput";
import PositionPredictor from "./PositionPredictor";
import {Card} from "primereact/card";
import DangerousFinder from "./DangerousFinder";

class Instruments  extends Component{

    render() {
        return(
            <Card title="Instruments">
                <TabView >
                    <TabPanel header="New Sat">
                        <NewSatInput newSatNorad={this.props.newSatNorad}
                                     onChange={this.props.newSatOnChange}
                                     loading={this.props.newSatLoading}
                                     error={this.props.newSatError}
                                     onClick={this.props.newSatOnClick}/>
                    </TabPanel>
                    <TabPanel header="Predict Position">
                        <PositionPredictor sats={this.props.sats} server={this.props.server}/>
                    </TabPanel>
                    <TabPanel header="Find Dangerous">
                        <DangerousFinder server={this.props.server}/>
                    </TabPanel>
                </TabView>
            </Card>
        );
    }
}

export default Instruments;