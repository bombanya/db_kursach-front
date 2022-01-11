import React, {Component} from "react";
import Instruments from "./Instruments";
import DataTables from "./DataTables";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sats: [],
            serverURL : "http://localhost:8080/api/sat/",
            loadingSats: true,
            newSatNorad: null,
            satInputLoading: false,
            satInputError: false
        };

        this.fetchNewSat = this.fetchNewSat.bind(this);
    }

    fetchNewSat(){
        this.setState({satInputLoading: true});
        fetch(this.state.serverURL + "new/" + this.state.newSatNorad, {method: 'POST'})
            .then(response => {
                this.setState({satInputLoading: false});
                if (response.ok){
                    response.json().then(response => this.setState({sats:
                            this.roundDoublesInSatData([...this.state.sats, response])}));
                }
                else this.setState({satInputError: true});
            });
    }

    componentDidMount() {
        fetch(this.state.serverURL + "all")
            .then(response => response.json())
            .then(data => {
                this.setState({sats: this.roundDoublesInSatData(data)});
                this.setState({loadingSats: false});
            });
    }

    roundDoublesInSatData(sats){
        return sats.map((sat) => {
            this.roundToThreeSigns(sat, "mass");
            this.roundToThreeSigns(sat, "volume");
            this.roundToThreeSigns(sat, "apogee");
            this.roundToThreeSigns(sat, "perigee");
            this.roundToThreeSigns(sat, "period");
            if (sat.propellantMass != null) this.roundToThreeSigns(sat, "propellantMass");
            return sat;
        })
    }

    roundToThreeSigns(obj, key){
        obj[key] =  Math.round(obj[key] * 1000) / 1000;
    }

    render() {
        return(
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="p-menubar">
                        <div className="p-text-bold">
                            Kursach. Proshkin Nikita P33301. Satellites tracking system
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <Instruments newSatOnChange={(e) => {
                        this.setState({newSatNorad: e.value});
                        this.setState({satInputError: false});
                        }}
                                 newSatNorad={this.state.newSatNorad}
                                 newSatLoading={this.state.satInputLoading}
                                 newSatError={this.state.satInputError}
                                 newSatOnClick={this.fetchNewSat}
                                 server={this.state.serverURL}
                                 sats={this.state.sats}/>
                </div>

                <div className="p-col-12">
                    <DataTables sats={this.state.sats}
                                loadingSats={this.state.loadingSats}
                                server={this.state.serverURL}/>
                </div>

            </div>
        );
    }
}

export default App;