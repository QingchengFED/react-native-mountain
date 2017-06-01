/**
 * @Author: yxp
 * @Date:   2017-06-01 10:06:78
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-01 18:06:85
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import requests from '../services/requests_svc'

export default class Movies extends Component {
    static navigationOptions = {
        title: '电影'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            movies: ds.cloneWithRows([])
        }
    }

    fetchData() {
        fetch(requests.moviesShowingReq).then(response => response.json()).then(responseJson => {
            this.setState({
                movies: this.state.movies.cloneWithRows(responseJson.subjects),
                title: responseJson.title
            });
        })
    }

    componentWillMount() {
        this.fetchData();
    }

    _onPressButton(rowData) {
        if (!this.props.navigation) return;
        const {navigate} = this.props.navigation;
        navigate('MovieDetail', {id: rowData.id, title: rowData.title});
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <ListView dataSource={this.state.movies} renderRow={(rowData) => <MovieItem onPress={() => {
                    this._onPressButton(rowData)
                }}>{rowData}</MovieItem>} enableEmptySections={true}/>
            </View>
        )
    }
}

class MovieItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const movie = this.props.children;
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 15,
                    marginTop: 10
                }}>
                    <Image source={{
                        uri: movie.images.large
                    }} style={{
                        width: 150,
                        height: 217
                    }}></Image>
                    <Text style={{
                        marginTop: 10
                    }}>{movie.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
