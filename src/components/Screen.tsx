import { Button } from "./Button"
import { useDispatch } from 'react-redux'
import { doNewQuiz, playAgain } from '../actions/quizActions'
import { useEffect, useState } from "react"
import { QuestionsScreen } from "./QuestionsScreen"
import axios from 'axios'
import { CompleteScreen } from "./CompleteScreen"
enum STEPS {
    'START',
    'QUESTIONS',
    'ENDQUIZ'
}
export const Screen = () => {

    const [currentStep, setCurrentStep] = useState(STEPS.START)
    const dispatch = useDispatch()


    const [questions, setQuestions] = useState<Question[]>()
    const [startDisable, setStartDisable] = useState<boolean>(true)

    const onStartQuiz = () => {
        dispatch(doNewQuiz(questions))
        setCurrentStep(STEPS.QUESTIONS)
    }

    const onPlayAgain = () => {
        dispatch(playAgain())
        setCurrentStep(STEPS.START)
    }

    const getNewQuiz = () => {
        const respone = axios.get('https://opentdb.com/api.php?amount=5')
        respone.then((data) => {
            setQuestions(data.data.results)
            setStartDisable(false)
        })
    }

    useEffect(() => {
        getNewQuiz()
    }, [])

    let body = (
        <div className="flex items-center justify-center flex-col gap-4">
            <img alt="img" src="./robot.png" />
            <Button text="Start" color onClick={onStartQuiz} disable={startDisable} />
        </div>
    )

    if (currentStep === STEPS.START) {
        return (body)
    }

    if (currentStep === STEPS.QUESTIONS) {
        body = <QuestionsScreen setCurrentStep={setCurrentStep} />
    }

    if (currentStep === STEPS.ENDQUIZ) {
        body = (
            <CompleteScreen action={onPlayAgain} />
        )
    }

    return (
        body
    )
}
