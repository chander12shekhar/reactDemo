import React, { Component } from 'react';
import '../css/main.css';

export default class Result extends Component {
    finalPrice = (price, discount) => {
        let discountPrice = Number(discount) / 100;
        let totalValue = price - (price * discountPrice);
        return totalValue;
    }
    render() {
        const listItems = this.props.items.map((items) =>
            <div className="col-md-2 item-card">
                <div className="thumbnail">
                    <a href="#adsa">
                        <img src={items.img_url} alt="" />
                        <p>{items.name}</p>
                    </a>
                    <div className="text-center">
                        <p className="itemPrice">Rs.{this.finalPrice(items.price, items.discount)} <s>{items.price}</s> <span>{items.discount}% off</span></p>
                        <button className="btn btn-primary addCart" onClick={(e)=>this.props.handleClick(e,items)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        );
        console.log(this.props.items);
        return (
            <div>
                {listItems}
            </div>
        )
    }
}