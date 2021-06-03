import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stacks/HomeStack';
import MediaStack from '../stacks/MediaStack';
import QuestionPapersStack from '../stacks/QuestionPapersStack';
import SportsStacks from '../stacks/SportsStacks';
import AdmissionsStack from '../stacks/AdmissionsStack';
import ProfileStack from '../stacks/ProfileStack';
import MyTabBar from './MyTabBar';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import InsituteStack from '../stacks/InsituteStack';
import ClassStack from '../stacks/ClassStack';
const Tab = createBottomTabNavigator();
class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

      if(this.props.user == null){
        return(
          <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
          >
            <Tab.Screen name="universal" component={HomeStack}


            />
            <Tab.Screen name="Media" component={MediaStack}


            />
            <Tab.Screen name="QuestionPapers" component={QuestionPapersStack}


            />
            <Tab.Screen name="Sports" component={SportsStacks}


            />
            <Tab.Screen name="Admissions" component={AdmissionsStack}


            />


          </Tab.Navigator>
        )
      }else{
        return (
          <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
          >
            <Tab.Screen name="universal" component={HomeStack}


            />
            <Tab.Screen name="Institute" component={InsituteStack}


            />
            <Tab.Screen name="Class" component={ClassStack}


            />
            <Tab.Screen name="Sports" component={SportsStacks}


            />
            <Tab.Screen name="Profile" component={ProfileStack}


            />


          </Tab.Navigator>
        )
      }
    
  
  }
}
const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,
    user: state.selectedUser,
  }
}
export default connect(mapStateToProps, { selectTheme })(TabNavigator)