import React, { Component } from 'react';
import Search from './Search';
import '../css/all.css';
import '../css/main.css';

export default class Cart extends Component {
    constructor(props){
      super(props);
      this.state = {
        cartItems: []
      }
    }
    componentWillMount(){
      if (localStorage.getItem("cartItems")) {
        this.setState({
          cartItems: JSON.parse(localStorage.getItem("cartItems"))
        });
      }
    }
    finalPrice = (price, discount) => {
        let discountPrice = Number(discount) / 100;
        let totalValue = price - (price * discountPrice);
        return totalValue;
    }
    totalPrice(item){
        let total = 0;
        for(let i of item){
            total = (total + i.price) * i.count;
        }
        return total;
    }
    totalDiscount(item){
        let total = 0;
        for(let i of item){
            let discountPrice = Number(i.discount) / 100;
            total = (total + (i.price * discountPrice)) * i.count;
        }
        return total;
    }
    total(item){
        let total = 0;
        for(let i of item){
            let discountPrice = Number(i.discount) / 100;
            total = (total + (i.price - (i.price * discountPrice))) * i.count;
        }
        return total;
    }
    counter = (item, operation) => {
        let cartData = this.state.cartItems;
        let objIndex = cartData.findIndex((obj => obj.id === item.id));
        if(operation === "+"){
            cartData[objIndex].count++;
        } else {
            cartData[objIndex].count--;
            if(cartData[objIndex].count === 0){
                cartData.splice(objIndex, 1);
            }
        }
        this.setState({
            cartItems : cartData
        });
        localStorage.setItem("cartItems", JSON.stringify(cartData));
    }
    removeCart = (item) =>{
        let cartData = this.state.cartItems;
        let objIndex = cartData.findIndex((obj => obj.id === item.id));
        cartData.splice(objIndex, 1);
        this.setState({
            cartItems : cartData
        });
        localStorage.setItem("cartItems", JSON.stringify(cartData));
    }
    render() {
        const listItems = this.state.cartItems.map((items) =>
            <div className="col-md-12 cartDetails">
                <div className="thumbnail">
                    <div className="col-md-2 cartBlock">
                        <img src={items.img_url} alt="" />
                    </div>
                    <div className="col-md-4 cartBlock">
                        <p>{items.name}</p>
                        <p className="itemPrice">Rs.{this.finalPrice(items.price, items.discount)} <s>{items.price}</s> <span>{items.discount}% off</span></p>
                    </div>
                    <div className="col-md-4 cartBlock details">
                        <span className="counterSign" onClick={(e)=>this.counter(items, "-")}>
                            <i class="fas fa-minus-circle"></i>
                        </span>
                        <input type="text" value={items.count} readonly="true" />
                        <span className="counterSign" onClick={(e)=>this.counter(items, "+")}>
                            <i class="fas fa-plus-circle"></i>
                        </span>
                    </div>
                    <div className="col-md-2 cartBlock details">
                        <span className="removeCart" onClick={(e)=>this.removeCart(items)}>Remove</span>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="/">Logo</a> 
                    <div class="form-inline">
                        <Search />     
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-sm-12">
                            {listItems}
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            Price Details <br />
                            <ul class="list-group mb-3">
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 class="my-0">Price</h6>
                                    </div>
                                    <span class="text-muted">{this.totalPrice(this.state.cartItems)}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 class="my-0">Discount</h6>
                                    </div>
                                    <span class="text-muted">{this.totalDiscount(this.state.cartItems)}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total Payable</span>
                                    <strong>{this.total(this.state.cartItems)}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}