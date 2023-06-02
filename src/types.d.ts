interface Question {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

enum STEPS {
    'START',
    'QUESTIONS',
    'ENDQUIZ'
}