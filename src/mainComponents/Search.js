import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.value} placeholder="Search" onChange={this.props.handleInputChange} />
            </div>
        )
    }
}