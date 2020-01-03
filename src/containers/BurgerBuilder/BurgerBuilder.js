import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import  Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
 import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing:false,
  loading:false
  };

componentWillMount(){
   axios.get('https://react-my-burger-cace8.firebaseio.com/ingredients.json')
  .then(responce =>{
    console.log
    this.setState({ingredients:responce.data})
  })
  .catch(error => {})
}

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

purchaseHandler =()=>{
  this.setState({purchasing:true})
}

purchaseCancelHandler = () =>{
 this.setState({purchasing:false}) 
}


 purchaseContunueHandler= async ()=>{
   await this.setState({loading:true})
const order = {
  ingredients: this.state.ingredients,
  price:this.state.totalPrice,
  customer: {
    name:'subodh mishra',
    addrss:{
      street:'7 new ashok nagar',
      zipcode:'110096',
      country:'india'
    },
    email:'subodh.shipgig@gmail.com'
  },
  deliveryMethod:'fastest'
}
axios.post('/orders.json',order).
then(responce=>{
  console.log('updated responce',responce)
 this.setState({loading:false})
 console.log('after responce',this.state.loading);
 
  })
.catch(error=>console.log(error))
 this.setState({loading:false})
 }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary= null;
    let burger = <Spinner />
     if(this.state.ingredients !== null){
 burger = (
          <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
        </Aux>
        );
        orderSummary = <OrderSummary 
          ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContunueHandler}
       ingredientsPrice={this.state.totalPrice}
          />;
}

     if(this.state.loading){
     console.log('coming in loading true')
      orderSummary= <Spinner/>
        }
  
    return (
      <Aux>
        <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
