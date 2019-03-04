import React from 'react';
import Search from './Components/Search'
import {View} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
		<View  style={{ flex: 1 }}>
			<Search/>
		</View>
    );
  }
}

