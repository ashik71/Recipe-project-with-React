import React, { Component } from 'react';
import './App.css';
import { recipes } from './tempList';
import RecipeDetails from './components/RecipeDetails';
import RecipeList from './components/RecipeList';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=dcb75d06723b12ba685cefcf411dafe4",
    base_url:"https://www.food2fork.com/api/search?key=dcb75d06723b12ba685cefcf411dafe4",
    details_id:35383,
    pageIndex:1,
    search:'',
    query: '&q=',
    error:''
  }

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const reciepeData = await data.json();

      if(reciepeData.recipes.length ===0){
        this.setState(()=>{
          return {error:'sorry, but your search did not return any results'}
        })
      }else{
        this.setState({
          recipes: reciepeData.recipes
        });
      }     
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount(){
    this.getRecipes();
  }

  displayCurrentPage = (index)=>{
    switch(index){
      default:
        case 1:
          return(
            <RecipeList recipes={this.state.recipes} handleDetails = {this.handleDetails}
            value = {this.state.search}
            handleChanges = {this.handleChanges}
            handleSubmit = {this.handleSubmit}
            error ={this.state.error}
            />
          )
        case 0:
          return(
            <RecipeDetails id={this.state.details_id} handlePageIndex={this.handlePageIndex} />
          )
    }
  }

  handlePageIndex = index => {
    this.setState({
      pageIndex :index
    })
  }

  handleDetails = (index,id)=>{
    this.setState({
      pageIndex:index,
      details_id:id
    })
  }
  handleChanges = (e)=>{
    this.setState({
      search:e.target.value
    },()=>{
      console.log(this.state.search);
    })
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const{base_url,query,search} = this.state;
    this.setState(()=>{
      return {url:`${base_url}${query}${search}`,search:""}
    },()=>{
      this.getRecipes();
    })

  }
  render() {
    console.log(this.state.recipes);
    return (
      <React.Fragment> 
        {
          this.displayCurrentPage(this.state.pageIndex)
        }       
      </React.Fragment>
    );
  }
}
export default App;
