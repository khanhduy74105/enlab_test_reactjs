import { Button } from "./Button"
import { useSelector } from 'react-redux'
import moment from 'moment';
interface CompleteScreenProps {
    action: () => void,
    secondaryAction: () => void
}
export const CompleteScreen = ({ action,secondaryAction }: CompleteScreenProps) => {

    const quized = useSelector((state: any) => state.quizReducer)
    const duration = moment.duration(quized.endTime - quized.startTime).asSeconds()
    let timeComplete = `${duration} seconds`
    if (duration > 60) {
        timeComplete = `${Math.floor(duration / 60)} mins ${duration % 60} seconds`
    }
    return (
        <div className="flex bg-white items-center justify-center flex-col gap-4 w-[400px] py-6 rounded-lg shadow-lg">
            <img alt="img" src={quized.correct_question > quized.questions.length / 2 ? `${process.env.PUBLIC_URL}/awards.png` : `${process.env.PUBLIC_URL}/replay.png`} />
            <h1 className="font-bold text-2xl">
                {quized.correct_question > quized.questions.length / 2 ? "Congratulations!" : 'Completed!'}

            </h1>
            <p className="text-center">
                {quized.correct_question > quized.questions.length / 2 ? "You are amazing!!" : 'Better luck next time!!'}

                <br />
                {quized.correct_question}/{quized.questions.length} correct anwsers in {timeComplete}
            </p>
            <div className="flex items-center justify-center gap-2">
                <Button text="Review" color onClick={secondaryAction}/>
                <Button text="Play Again" color onClick={action} />
            </div>
        </div>
    )
}
