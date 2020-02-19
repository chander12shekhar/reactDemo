import React from 'react';
import Search from './mainComponents/Search';
import Filter from './mainComponents/Filter';
import Result from './mainComponents/Result';
import Sorting from './mainComponents/Sorting';
import './App.css';
import './css/all.css';
 
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products : [],
      cartItems: [],
      sort: "",
      searchData: "",
      originalData:[]
    }
    this.cartTotal = this.cartTotal.bind(this);
  }
  componentWillMount(){
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
    fetch("https://api.myjson.com/bins/qzuzi")
      .then(response => response.json())
      .then(result => this.setState({
      products: result,
      originalData:result
    }));
  }
  removeFromCart = (e, item) =>{
    this.setState(state => {
      const cartItems = state.cartItems;
      cartItems.forEach(cp => {
        if (cp.id === item.id) {
          cp.count -= 1;
        }
      });
      cartItems.push({ ...item, count: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };
  addToCart = (e, item) =>{
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === item.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...item, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };
  cartTotal(){    
    let cartItems = this.state.cartItems;
    let totalCount = 0;
    for(var i of cartItems){
      totalCount = totalCount + i.count;
    }
    if(totalCount !== 0){
      return totalCount;
    }
  }
  listProducts = () => {
    this.setState(state => {
      if(state.sort === "Price--High Low") {
        state.products.sort((a, b) =>a.price < b.price? 1 : -1)
      } else if(state.sort === "Price--Low High"){
        state.products.sort((a, b) =>a.price > b.price? 1 : -1)
      } else if(state.sort === "Discount"){
        state.products.sort((a, b) =>a.discount < b.discount? 1 : -1)
      }
      return { filteredProducts: state.products };
    });
  };
  handleSortClick = e => {
    this.setState({ sort: e.target.innerText });
    this.listProducts();
  };
  handleFilterClick = e => {    
    const items = this.state.originalData;
    let filteredData = items.filter(function(item) {
      return e.state.value.min < item.price && item.price < e.state.value.max;
    });
    this.setState({ 
      products : filteredData 
    });
  }  
  
  handleInputChange = e => {
    const items = this.state.originalData;
    let filteredData = items.filter(function(item) {
      return item.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1;
    });
    this.setState({ 
      searchData: e.target.value,
      products : filteredData 
    });
  }

  render(){
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="/"><i class="fas fa-star logo"></i></a> 
          <div class="form-inline">
            <Search value={this.state.searchData} handleInputChange={this.handleInputChange} />
            <a href="/cart"><i class="fas fa-shopping-cart"></i>{this.cartTotal()}</a>            
          </div>
        </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-sm-12">
            <Filter handleFilterClick={this.handleFilterClick} />
          </div>
          <div className="col-lg-10 col-sm-12">
            <Sorting handleSortClick={this.handleSortClick} />
            <Result items={this.state.products} handleClick={this.addToCart} />
          </div>
        </div>
      </div>
    </div>
      
    );
  }
}
export default App;