import { combineReducers } from 'redux';
import { selectTheme } from '../actions';
import { AsyncStorage } from 'react-native';
  

const selectedThemeReducer = (selectedTheme = null, action) => {
    if (action.type === "THEME_SELECTED") {
        return action.payload;
    }
    return selectedTheme
}
const selectedVideoReducer = (selectedVideo =null, action) => {
    if (action.type === "VIDEO_SELECTED") {
        return action.payload;
    }
    return selectedVideo
}
const selectedUserReducer = (selectedUser =null,action) =>{
    if (action.type === "USER_SELECTED") {
        return action.payload;
    }
    return selectedUser
}
export default combineReducers({
    selectedTheme: selectedThemeReducer,
    selectedVideo: selectedVideoReducer,
    selectedUser: selectedUserReducer
})