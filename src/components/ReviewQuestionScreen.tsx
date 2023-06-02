import { useSelector } from 'react-redux'
import { useState } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Button } from './Button'
import { MdOutlineDone } from 'react-icons/md'

interface ReviewQuestionScreenProps {
    action: ()=>void,
    onClose: ()=>void
}
export const ReviewQuestionScreen = ({action, onClose}:ReviewQuestionScreenProps) => {
    const quized = useSelector((state: any) => state.quizReducer)
    const [currentQuestion, setCurrentQuestion] = useState(quized.user_respones[0])
    const [currentIndex, setCurrentIndex] = useState(1)
    const onNextQuestion = () => {
        const nextIndex = currentIndex + 1
        setCurrentQuestion(quized.user_respones[nextIndex - 1])
        setCurrentIndex(prev => prev + 1)
    }
    const onPrevQuestion = () => {
        const prevIndex = currentIndex - 1
        setCurrentQuestion(quized.user_respones[prevIndex - 1])
        setCurrentIndex(prev => prev - 1)
    }
    return (
        <div className="flex items-center justify-center flex-col gap-4 w-[400px] text-white relative">
            <div className="absolute right-0 -top-2 text-2xl hover:opacity-75 cursor-pointer" onClick={onClose}>x</div>
            <button disabled={currentIndex === 1} className="absolute  -left-8 top-1/2 text-2xl hover:opacity-75 cursor-pointer" onClick={onPrevQuestion}>
                <GrPrevious size={32} />
            </button>
            <button disabled={currentIndex === quized.user_respones.length} className="absolute  -right-8 top-1/2 text-2xl hover:opacity-75 cursor-pointer" onClick={onNextQuestion}>
                <GrNext size={32} ></GrNext>

            </button>
            <h1 className='text-3xl'>Review</h1>
            <h1 className='text-xl'>Question {currentIndex}/{quized.questions.length}</h1>
            <p className='py-2 text-center' dangerouslySetInnerHTML={{ __html: currentQuestion.question.question }}></p>

            {currentQuestion.question.anwsers.map((item: string, index: any) => {
                return (
                    <div
                        key={index}
                        className={`px-3 py-2 rounded-r-full rounded-l-full border-2 cursor-pointer w-full flex justify-between items-center 
                            ${currentQuestion.userAnswer && item === currentQuestion.question.correct_answer ? "border-green-500 text-green-500" : (currentQuestion.userAnswer !== currentQuestion.question.correct_answer && item === currentQuestion.userAnswer) ? "border-red-500 text-red-500" : ''}`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                        <span className={`rounded-full border-2 w-6 h-6 flex items-center justify-center 
                        ${currentQuestion.userAnswer && item === currentQuestion.question.correct_answer ? "border-green-500" : (currentQuestion.userAnswer !== currentQuestion.question.correct_answer && item === currentQuestion.userAnswer) ? "border-red-500" : ''}
                        `} >
                            {currentQuestion.userAnswer && item === currentQuestion.question.correct_answer && <MdOutlineDone />}
                        </span>
                    </div>
                )
            })}
            <Button text="Play Again" onClick={action}/>
        </div>
    )
}
