import React, {Component} from 'react';
import { ExpectedMeasure} from './Api_spec/generated-types'

interface ExpectedMeassureIntervalProps{
	expectedMeasure: ExpectedMeasure,
	idx: number,
	expectedMeasures: Array<ExpectedMeasure>
}

class ExpectedMeassureInterval extends Component<ExpectedMeassureIntervalProps, ExpectedMeassureIntervalProps>{

	constructor(props: ExpectedMeassureIntervalProps){
		super(props);
		//this.initialState = {
		//  	expectedMeasure: any,
		//  	idx: 0,
		//  	expectedMeasures: []
		//}

//		this.props = this.initialState;
		this.state = { 
		 	expectedMeasure: props.expectedMeasure,
		 	idx: props.idx,
		 	expectedMeasures: props.expectedMeasures
		};
	}

	render(){
		const {expectedMeasure, idx, expectedMeasures} = this.state;
//expectedMeasure={expected_measure} 
		console.log(this.props);
		return(
			<div id={'interval-' + idx} key={expectedMeasure.id}>
			{idx===0 ?
                '0'.padStart(4,'0') :
                String(expectedMeasures[idx-1].end_hour * 100 + expectedMeasures[idx-1].end_minute).padStart(4, '0')}
                -<input type='time' id={'end-'+ idx } value={String(expectedMeasure.end_hour).padStart(2, '0')  + ":" + String(expectedMeasure.end_minute).padStart(2, '0')} />
				<span>=</span>
				<input type="text" id={'value-'+idx} value={expectedMeasure.expected_value}/> {expectedMeasure.unit?.description}

			</div>
//			<div> hi </div>
			)
	}
}

export default ExpectedMeassureInterval;