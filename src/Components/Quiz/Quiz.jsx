import React, { useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data';


function Quiz() {
  const [index, setIndex] = useState(0);
  const question = data[index];
  // store per-question selection and reveal state
  // answers[q] = { selected: number|null, revealed: boolean }
  const [answers, setAnswers] = useState(() => data.map(() => ({ selected: null, revealed: false })));

  const checkAns = (ans) => {
    setAnswers(prev => {
      const next = prev.slice();
      // if already revealed for this question do nothing
      if (next[index].revealed) return prev;
      next[index] = { selected: ans, revealed: true };
      return next;
    });
  }

  const nextQuestion = () => {
    setIndex(i => (i < data.length - 1 ? i + 1 : i));
  }
  return (
    <div className='Container'>
        <h1>Quiz App</h1>
        <hr />
        <h2>{index+1}. {question?.question}</h2>
        <ul>
            {[question?.option1, question?.option2, question?.option3, question?.option4].map((opt, i) => {
              const optNum = i + 1;
              const qAns = answers[index] || { selected: null, revealed: false };
              const className = qAns.revealed
                ? (question.ans === optNum ? 'correct' : (qAns.selected === optNum ? 'wrong' : ''))
                : '';
              return (
                <li key={optNum} className={className} onClick={() => checkAns(optNum)}>{opt}</li>
              )
            })}
        </ul>
        <button onClick={nextQuestion}>Next</button>
        <div className="index">{index + 1} of {data.length} questions</div>

    </div>
  )
}

export default Quiz