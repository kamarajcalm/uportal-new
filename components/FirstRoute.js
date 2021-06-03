import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { TabView, SceneMap } from 'react-native-tab-view';
const width = Dimensions.get('screen').width
class FirstRoute extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
  
    render() {
       
        return (
          <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
              <Text>FirstRoute</Text>
          </View>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(FirstRoute)