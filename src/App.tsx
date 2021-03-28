import React from 'react';
import logo from './logo.svg';
import './App.css';
import {GetChamberSchedule, GetSensors} from "./Api_spec/generated-types";

const App = () => {

    return <div className="App">
        <header className="App-header">
            <p>Sensor list:</p>
            <GetSensors children={(sensors, action) => {
                return (
                    <div>
                        {sensors?.map((sensor, idx) => (
                            <p>{sensor.description}</p>
                            ))}
                    </div>
                )
            }}/>
        </header>
        <div> Chamber 1 schedule:
            <GetChamberSchedule configuration_id={1} children={(intervals, action) => {
                return (
                    <div> Intervals:
                        {intervals?.map((interval, idx) => {
                            return <div id={"interval-"+idx}>
                                <p>{(interval.start_hour*100+interval.start_minute).toString().padStart(4, '0')} - {(interval.end_hour*100 + interval.end_minute).toString().padStart(4, '0')}</p>
                                <p>{interval.expected_value}{interval.unit?.description}</p>
                            </div>
                        })}
                    </div>
                )
            }}/>
        </div>
    </div>

}

export default App;
