import React, { Component } from 'react';
import InputRange from 'react-input-range';
export default class Filter extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: { min: 2, max: 500 },
        };
    }
    render() {
        return (
            <div className="row filterItems">
                <b>Filter</b>
                <div className="col-md-12 text-center">
                    <br/><br/>
                    <InputRange
                        maxValue={1000}
                        minValue={0}
                        formatLabel={value => `Rs.${value}`}
                        value={this.state.value}
                        onChange={value => this.setState({ value: value })}
                         /><br/><br/>
                    <button className="btn btn-primary addCart"  onClick={(e)=>this.props.handleFilterClick(this)}>Apply</button> 
                </div>
            </div>
        )
    }
}