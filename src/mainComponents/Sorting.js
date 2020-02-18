import React, { Component } from 'react'

export default class Sorting extends Component {
    render() {
        return (
            <div className="row sortItems">
                <div className="col-md-12">
                    <b>Sort by  
                        <span className="sortData" onClick={this.props.handleSortClick}>Price--High Low</span>
                        <span className="sortData" onClick={this.props.handleSortClick}>Price--Low High</span>
                        <span className="sortData" onClick={this.props.handleSortClick}>Discount</span>
                    </b>
                </div>
            </div>
        )
    }
}
