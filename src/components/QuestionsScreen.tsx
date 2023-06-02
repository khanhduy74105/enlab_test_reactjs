import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Question } from './Question'
import { useDispatch } from 'react-redux'
import { setUserRespone } from '../actions/quizActions'
enum STEPS {
    'START',
    'QUESTIONS',
    'ENDQUIZ'
}

const shuffle = (arr: Question[]) => {
    function compareRandom(a: any, b: any) {
        return Math.random() - 0.5;
    }

    return arr.sort(compareRandom);
}

interface QuestionsScreenProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<STEPS>>
}

export const QuestionsScreen = ({ setCurrentStep }: QuestionsScreenProps) => {

    const quiz = useSelector((state: any) => state.quizReducer)

    const dispatch = useDispatch()

    const [currentQuestion, setCurrentQuestion] = useState({
        number: 1,
        question: {
            ...quiz.questions[0],
            anwsers: [...quiz.questions[0].incorrect_answers, quiz.questions[0].correct_answer]
        }
    })


    const [userRespones, setUserRespones] = useState<any[]>([])
    const getNextQuestion = () => {
        if (currentQuestion.number === quiz.questions.length) {
            setCurrentStep(STEPS.ENDQUIZ)
            dispatch(setUserRespone(userRespones))
            return
        }
        setCurrentQuestion((prev: any) => {
            return {
                ...prev,
                number: prev.number + 1,
                question: {
                    ...quiz.questions[prev.number],
                    anwsers: shuffle([...quiz.questions[prev.number].incorrect_answers, quiz.questions[prev.number].correct_answer])
                }
            }
        })
    }

    return (
        <Question quiz={quiz} currentQuestion={currentQuestion} onClick={getNextQuestion} setUserRespones={setUserRespones} />
    )
}
