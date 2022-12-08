import './recipePage.css';
import React, { Component } from "react";
import Modal from "../../components/modal/Modal";
import axios from "axios";

/*const RecipePage = () => {
  return (
    <div className="RecipePage">
      
      <h1>
          You have reached the recipe page.
      </h1>

    </div>
  );
}*/

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      activeItem: {
        title: "",
        description: "",
        vegan: false,
      },
      editing:false,
    };
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log("Fetching...")

    fetch('http://127.0.0.1:8000/api/recipes/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        recipeList:data
      })
    )
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log('Name: ', name)
    console.log('Value: ', value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM: ', this.state.activeItem)
  }

  render(){
    var recipes = this.state.recipeList
    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit} id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange} className="form-control" id="title" type="text" name="title" placeholder="Add task.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
             
              </div>

              <div  id="list-wrapper">         
                    {recipes.map(function(recipe, index){
                      return(
                        <div key={index} className="task-wrapper flex-wrapper">
                          
                          <div style={{flex:7}}>
                            <span>{recipe.title}</span>
                          </div>

                          <div style={{flex:1}}>
                                <button className="btn btn-sm btn-outline-info">Edit</button>
                            </div>

                            <div style={{flex:1}}>
                                <button className="btn btn-sm btn-outline-dark delete">-</button>
                            </div>

                        </div>
                      )
                    })}
              </div>
          </div>
          
        </div>
      )
  }
}
  
export default RecipePage;