import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="row filterItems">
                <b>Filter</b>
                <div className="col-md-12 text-center">
                    <input type="range" class="custom-range" min="0" max="1000" step="1" id="customRange3" />
                    <button className="btn btn-primary addCart">Apply</button>
                </div>
            </div>
        )
    }
}