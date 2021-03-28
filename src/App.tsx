import React from 'react';
import logo from './logo.svg';
import './App.css';
import {GetSensors} from "./Api_spec/generated-types";

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
    </div>

}

export default App;
