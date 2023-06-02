import React, { useState } from 'react'
import { Button } from './Button'
import { MdOutlineDone } from 'react-icons/md'

interface QuestionProps {
    quiz: any,
    currentQuestion: any,
    onClick: () => void,
    setUserRespones: React.Dispatch<React.SetStateAction<any[]>>
}

export const Question = ({ quiz, currentQuestion, onClick, setUserRespones }: QuestionProps) => {

    const [answer, setAnswer] = useState<string | null>(null)

    const onChooseAnwser = (userAnw: string) => {
        if (answer) {
            return
        }
        setAnswer(userAnw)
        setUserRespones((prev: any) => {
            let isCorrect = false
            if (userAnw === currentQuestion.question.correct_answer) {
                isCorrect = true
            }

            return [...prev, {
                ...currentQuestion,
                userAnswer: userAnw,
                isCorrect
            }]
        })
    }

    const onNextQuestion = () => {
        setAnswer(null)
        onClick()
    }

    return (
        <div className="flex items-center justify-center flex-col gap-4 w-[400px] text-white">
            <h1>Question {currentQuestion.number}/{quiz.questions.length}</h1>
            <p className='py-2' dangerouslySetInnerHTML={{ __html: currentQuestion.question.question }}></p>

            {currentQuestion.question.anwsers.map((item: string, index: any) => {
                return (
                    <div
                        key={index}
                        className={`px-3 py-2 rounded-r-full rounded-l-full border-2 cursor-pointer w-full flex justify-between items-center 
                            ${answer && item === currentQuestion.question.correct_answer ? "border-green-500 text-green-500" : (answer !== currentQuestion.question.correct_answer && item === answer) ? "border-red-500 text-red-500" : ''}`}
                        onClick={(e) => onChooseAnwser(item)}
                    >
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                        <span className={`rounded-full border-2 w-6 h-6 flex items-center justify-center 
                        ${answer && item === currentQuestion.question.correct_answer ? "border-green-500" : (answer !== currentQuestion.question.correct_answer && item === answer) ? "border-red-500" : ''}
                        `} >
                            {answer && item === currentQuestion.question.correct_answer && <MdOutlineDone />}
                        </span>
                    </div>
                )
            })}
            <Button text="Next" w_full onClick={onNextQuestion} disable={!answer} />
        </div>
    )
}
