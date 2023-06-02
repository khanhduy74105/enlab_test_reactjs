export const doNewQuiz = (payload: any) => {
    return {
        type: 'DO_NEW_QUIZ',
        payload: payload
    }
}

export const setUserRespone = (payload: any) => {
    return {
        type: 'SET_USER_RESPONE',
        payload: payload
    }
}

export const playAgain = () => {
    return {
        type: 'PLAY_AGAIN'
    }
}