type Action = {
    type: String,
    payload?: any
}
interface Question {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

interface QuestionsState {
    questions: Question[],
    currentQuestion: number,
    correct_question: number,
    user_respones: any,
    startTime: Date | null,
    endTime: Date | null,

}

const initialState: QuestionsState = {
    questions: [],
    currentQuestion: 1,
    correct_question: 0,
    user_respones: null,
    startTime: null,
    endTime: null
}


export const quizReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "DO_NEW_QUIZ": {
            const newQuestions: Question[] = action.payload
            const currentTime = Date.now()
            const newState = {
                ...state,
                questions: newQuestions,
                startTime: currentTime
            }
            return newState

        }
        case "SET_USER_RESPONE": {
            const userRespones: any = action.payload
            const endTime = Date.now()

            const correct_count = userRespones.reduce((total: number, item: any) => {
                if (item.isCorrect) {
                    return total += 1
                }

                return total
            }, 0)

            const newState = {
                ...state,
                correct_question: correct_count,
                endTime: endTime,
                user_respones: userRespones
            }
            return newState
        }

        case "PLAY_AGAIN": {
            return initialState
        }

        default:
            return initialState

    }
}