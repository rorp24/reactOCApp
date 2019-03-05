import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component
{
	constructor(props)
	{
		super(props)
		this.page = 0
		this.totalPages = 0
		this.state = {
			films:[],
			isLoading: false
		}
		this.searchedText = ""
	}
	
	_loadFilms()
	{
		
		if (this.searchedText.length > 0)
		{
			this.setState({isLoading: true})
			getFilmFromApiWithSearchedText(this.searchedText, this.page + 1).then(data =>{
				console.log("page:"+this.page)
				this.page = data.page
				this.totalPages = data.total_pages
				this.setState(
				{
					films: [...this.state.films, ...data.results],
					//ou: films: this.state.films.concat(data.results),
					isLoading: false
				})
			} )
		}
	}
	
	_searchTextInputChanged(text)
	{
		this.searchedText = text
	}
	
	_displayLoading()
	{
		if (this.state.isLoading)
		{
			return(
				<View style={styles.loading_container}>
					<ActivityIndicator size="large"/>
				</View>
			)
		}
	}
	_searchFilms()
	{
		this.page = 0
		this.totalPages = 0
		this.setState({
			films:[]
		}, () => {
			console.log("page="+this.page)
			console.log("total pages="+this.totalPages)
			console.log("nb films="+this.state.films.length)		
			this._loadFilms()
		})
	}
	
	_displayDetailForFilm = (idFilm) => {
		console.log ("Display film with id" + idFilm)
	}
	
	render()
	{
		console.log(this.props);
		return (
			<View style={styles.main_container}>
				<TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="recherche"/>
				<Button title="rechercher" onPress={()=>this._searchFilms()}/>
				<FlatList
					data={this.state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if(this.page < this.totalPages)
						{
							this._loadFilms()						
						}

					}}
					
				/>
				{this._displayLoading()}
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: 
	{
		flex:1,
	},
	textinput: 
	{
		marginLeft:5, 
		marginRight: 5, 
		height:50, 
		borderColor: '#000000', 
		borderWidth:1, 
		paddingLeft:5
	},
	loading_container:
	{
		position: "absolute",
		left: 0,
		right: 0,
		top: 100,
		bottom: 0,
		alignItems: 'center',
		justifyContent: "center"
	}
})

export default Search
