import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text} from 'react-native'
import films from '../Helpers/data'
import FilmItem from './FilmItem'
import { getFilmFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {films:[]}
	}
	
	_loadFilms()
	{
		if (this.state.searchedText.length > 0)
		{
			getFilmFromApiWithSearchedText(this.state.searchedText).then(data => this.setState({films: data.results}))
		}
	}
	
	_searchTextInputChanged(text)
	{
		this.setState({searchedText: text})
	}
	
	render()
	{
		return (
			<View style={styles.main_container}>
				<TextInput onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder="recherche"/>
				<Button title="rechercher" onPress={()=>this._loadFilms()}/>
				<FlatList
					data={this.state.films}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <FilmItem film={item}/>}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex:1,
		marginTop:25
	},
	textinput: {
		marginLeft:5, 
		marginRight: 5, 
		height:50, 
		borderColor: '#000000', 
		borderWidth:1, 
		paddingLeft:5
	}
})

export default Search
