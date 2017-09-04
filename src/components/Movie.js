/**
 * @Author: yxp
 * @Date:   2017-06-01 17:06:38
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-02 15:06:40
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
 import requests, {resource} from '../services/requests_svc'

 export default class Movie extends Component {
     static navigationOptions = ({navigation}) => {
         title: navigation.state.params.title
     };

     constructor(props) {
        super(props);
     }

     fetchData () {
         var params = {};
         if (this.props.navigation) {
             params.id = this.props.navigation.state.params.id;
         }
         resource(requests.movieReq, params).then(responseJson => {
             console.log(responseJson);
             this.setState({
                 movie: responseJson
             });
         });
     }

     componentWillMount () {
         this.fetchData();
     }

     render () {
         const movie = this.state.movie;
         return (
             <View style={{backgroundColor: 'white'}}>
                {movie && (
                    <Image source={{uri: movie.images.large}} style={{width: 150, height: 217}} />
                    <Text style={{marginTop: 10}}>{movie.title}</Text>
                    <Text style={{marginTop: 10}}>{movie.summary}</Text>
                )}
             </View>
         )
     }
 }
