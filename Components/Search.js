import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text} from 'react-native'
import films from '../Helpers/data'
import FilmItem from './FilmItem'


class Search extends React.Component
{
	render()
	{
		return (
			<View style={styles.main_container}>
				<TextInput style={styles.textinput} placeholder="recherche"/>
				<Button title="rechercher" onPress={()=>{}}/>
				<FlatList
					data={films}
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
