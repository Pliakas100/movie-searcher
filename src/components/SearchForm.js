import React , { Component } from 'react'

const API_KEY = 'e342e849'


export class SearchForm extends Component{
	state = {
		inputMovie: ''
	}

	_handleChange = (e) => {
		this.setState({ inputMovie: e.target.value })
	}

	_handleSubmit = (e) => {
		e.preventDefault()
		const { inputMovie } = this.state
		fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`) //És asíncrono por lo que hay que hacer una promesa 
			.then( res => res.json()) //La respuesta es un string , así que lo convertimos a json. 
			.then( results => { 
				const { Search = [] , totalResults = "0" } = results 
				console.log({ Search, totalResults })
				this.props.onResults(Search)
			})
	}

	render(){
		return(
			<form onSubmit = { this._handleSubmit }>

				<div className="field has-addons">
				  <div className="control">
				    <input 
				    	className="input" 
				    	type="text" 
				    	onChange={this._handleChange}
				    	placeholder="Movie to search..."
				    />
				  </div>
				  <div className="control">
				    <button className="button is-info" >
				      Search
				    </button>
				  </div>
				</div>
			</form>

		)
	}
}