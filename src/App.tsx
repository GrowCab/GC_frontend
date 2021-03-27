import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGet } from "restful-react";
import {Sensor} from "./Api_spec/generated-types";

const App = () => {

    const sensors = useGet<Sensor[]>({
        path: "/sensors/",
    }).data;

    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            {sensors?.map((sensor, index) => (
                <p>{sensor.description}</p>
                ))}
        </header>
    </div>

}

export default App;
