
export const selectTheme = (theme) => {
    return {
        type: 'THEME_SELECTED',
        payload: theme
    }
}
export const selectVideo = (action) => {
    return {
        type: 'VIDEO_SELECTED',
        payload: action
    }
}
export const selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user
    }
}