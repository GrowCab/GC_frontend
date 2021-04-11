import React, {Component} from 'react';
import { ExpectedMeasure} from './Api_spec/generated-types'

interface ExpectedMeassureIntervalProps{
	expectedMeasure: ExpectedMeasure,
	idx: number,
	expectedMeasures: Array<ExpectedMeasure>
}

class ExpectedMeassureInterval extends Component{

	constructor(props: ExpectedMeassureIntervalProps){
		super(props);
		//this.initialState = {
		//  	expectedMeasure: any,
		//  	idx: 0,
		//  	expectedMeasures: []
		//}

//		this.props = this.initialState;
		// this.state = { 
		// 	expectedMeasure: props.expectedMeasure,
		// 	idx: props.idx,
		// 	expectedMeasures: props.expectedMeasures
		//  };
	}

	render(){
//		const {expectedMeasure, idx, expectedMeasures} = this.props;
//expectedMeasure={expected_measure} 
		console.log(this.props);
		return(
//			<div id={'interval-' + idx} key={expectedMeasure.id}>Test</div>
			<div> hi </div>
			)
	}
}

export default ExpectedMeassureInterval;