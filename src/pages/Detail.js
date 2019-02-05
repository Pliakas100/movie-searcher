import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBackToHome } from '../components/ButtonBackToHome'

const API_KEY = 'e342e849'

export class Detail extends Component{

	static propTypes = { 
		match:  PropTypes.shape({
			params: PropTypes.object,
			isExact: PropTypes.bool,
			path: PropTypes.string,
			url: PropTypes.string
		})
	}

	state = { movie : {} }

	_fetchMovie({ id }){
		fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`) 
			.then( res => res.json()) //La respuesta es un string , así que lo convertimos a json. 
			.then( movie => { 
				console.log({ movie }) 
				this.setState({movie})
			})
	}

	_goBack(){
		window.history.back()
	}

	componentDidMount(){
		console.log(this.props)
		const { id } = this.props.match.params
		this._fetchMovie({  id })
	}


	render(){
		const { Title, Poster, Actors, Metascore, Plot } = 
		this.state.movie
		return(
			<div className="card" >
				<div className="card-image">
					<img src={Poster} />
				</div>
				<div className="card-content">
					<p className="title is-4"> { Title }</p>
					<p className="subtitle is-6">{ Actors} </p>
					<p className="subtitle is-8">{Metascore}/100</p>
					<div className="content">
						<p>{Plot}</p>
					</div>
					<ButtonBackToHome />
				</div>
			</div>

		)
	}
}