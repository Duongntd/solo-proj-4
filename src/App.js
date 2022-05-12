import React from 'react'
import Quiz from './components/Quiz'
import Home from './components/Home'
import Header from './components/Header'

function App() {
  const [quizs, setQuiz] = React.useState([])
  const [chosenAnswers, setChosenAnswers] = React.useState([{name: '', value: ''}])
  const [gameOver, setGameOver] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [newGame, setNewGame] = React.useState(false)
  const [formData, setFormData] = React.useState({
    amountOfQues: 0,
    category: '',
    difficulty: '',
    type: ''
  })

  // fetch data
  React.useEffect(() => {
    async function getData() {
      console.log('data fetched!')
      const res = await fetch(`https://opentdb.com/api.php?amount=${formData.amountOfQues}${formData.category}${formData.difficulty}${formData.type}`);
      const data = await res.json();
      if (data.response_code == 1) {
        alert('No question found!')
        return
      }
      // suffle answers => array of answers (object with index and value)
      const suffled = data.results.map((result, index) => {
      let unsuffledAnswers = [result.correct_answer];
      result.incorrect_answers.forEach(answer => unsuffledAnswers.push(answer));
      const randomized = unsuffledAnswers
      .map(value => ({value, sort: Math.random()}))
      .sort((a,b) => a.sort -b.sort)
      .map(val => { return {index: index, val: val.value} })
      return randomized
      })
      // add suffledAnswer and result and answer props to data
      for (let i = 0; i < data.results.length; i++) {
        data.results[i].suffledAnswer = suffled[i];
        data.results[i].result = 'unanswered';
        data.results[i].answer= {index: i, val: ''}
      }
      setQuiz(data.results);
    }
    getData();
  }, [newGame])

  const quizsMap = quizs.map((quiz, index) => 
    <Quiz 
    key={index}
    name={index}
    question={quiz.question}
    correctAnswer={quiz.correct_answer}
    suffledAnswer={quiz.suffledAnswer}
    result={quiz.result}
    handleChange={(e) => chooseAnswer(e)}
    ans={quiz.answer}
    />
  )
    function chooseAnswer(e) {
      const index = e.target.name.slice(-1);
      setChosenAnswers(prev => {
        prev[index] = {name: index, value: e.target.value};
        return [...prev]
      })
      setQuiz(prev => {
        prev[index].answer = {index: index, val :e.target.value};
        prev[index].result = 'answered';
        return [...prev]
      })
    }
    function checkResult() {
      // get all correct answers
      const allCorrectAnswers = []; 
      quizsMap.forEach((quiz, index) => allCorrectAnswers.push({name: index.toString(), value: quiz.props.correctAnswer}));
      // find any unanswered question
      const found = quizs.find(quiz => quiz.result == 'unanswered');
      if (found) {
        alert('Please answer all questions')   
      } else {
        // set results
        for (let i = 0; i < chosenAnswers.length; i++) {
          if (chosenAnswers[i].value == allCorrectAnswers[i].value) {
            setQuiz(prev => {
              prev[i].result = 'correct';
              return [...prev]
            })
            setCorrectAnswers(prev => prev + 1)
          } else {
            setQuiz(prev => {
              prev[i].result = 'wrong';
              return [...prev]
            })
          }
        }
        setGameOver(true);
      }
    }

    function restartGame() {
      setNewGame(prev => !prev);
      setGameOver(false);
      setCorrectAnswers(0)
      setChosenAnswers([{name: '', value: ''}])
    }

    function changeQuestions(event) {
      const { name, value } = event.target
      setFormData(prev => {
        return {...prev, [name]: value}
      })
    }

    function returnHome() {
      setFormData(prev => {
        return {...prev, amountOfQues: 0}
      })
      restartGame()
    }
  return (
    <div>
      <Header render={quizs.length == 0} handleClick={returnHome} />
      <Home 
        formData={formData}
        handleChange={changeQuestions}
        handleSubmit={(e) => {
          e.preventDefault();
          restartGame();
         }
        }
        render={quizs.length == 0}
      />
      <div className='allquizs'>
        {quizsMap}
      </div>
      
      <div className='outer'>
        {gameOver && <span> You scored {correctAnswers}/{formData.amountOfQues} correct answers</span>}
        {!gameOver && quizs.length == 0 ? '' : !gameOver && quizs.length != 0 ? <button onClick={checkResult}>Check answers</button> : <button onClick={restartGame}>New game</button>} 
      </div>
    </div>
  )
}

export default App