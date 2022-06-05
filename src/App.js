import React from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Header from './components/Header';
import ReactHtmlParser from 'react-html-parser';

function App() {
	const [quizs, setQuiz] = React.useState([]);
	const [chosenAnswers, setChosenAnswers] = React.useState([]);
	const [gameOver, setGameOver] = React.useState(false);
	const [correctAnswers, setCorrectAnswers] = React.useState(0);
	const [newGame, setNewGame] = React.useState(false);
	const [formData, setFormData] = React.useState({
		amountOfQues: 0,
		category: '',
		difficulty: '',
		type: '',
	});
	async function getData() {
		console.log('data fetched!');
		const res = await fetch(
			`https://opentdb.com/api.php?amount=${formData.amountOfQues}${formData.category}${formData.difficulty}${formData.type}`
		);
		const data = await res.json();
		if (data.response_code == 1) {
			alert('No question found!');
			return;
		}
		// suffle answers => array of answers (object with index and value)
		const suffled = data.results.map((result, index) => {
			let unsuffledAnswers = [ReactHtmlParser(result.correct_answer)];
			result.incorrect_answers.forEach((answer) =>
				unsuffledAnswers.push(ReactHtmlParser(answer))
			);
			const randomized = unsuffledAnswers
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map((val) => {
					return { index: index, val: val.value };
				});
			return randomized;
		});
		// add suffledAnswer and result and answer props to data
		for (let i = 0; i < data.results.length; i++) {
			data.results[i].suffledAnswer = suffled[i];
			data.results[i].result = 'unanswered';
			data.results[i].answer = { index: i, val: '' };
		}
		setQuiz(data.results);
	}
	// fetch data
	React.useEffect(() => {
		getData();
	}, [newGame]);

	const quizsMap = quizs.map((quiz, index) => {
		const firstLetterToCap = quiz.difficulty.slice(0, 1).toUpperCase();
		const difficulty = firstLetterToCap.concat(quiz.difficulty.substring(1));
		return (
			<Quiz
				key={index}
				name={index}
				question={ReactHtmlParser(quiz.question)}
				category={quiz.category}
				difficulty={difficulty}
				correctAnswer={ReactHtmlParser(quiz.correct_answer)[0]}
				suffledAnswer={quiz.suffledAnswer}
				result={quiz.result}
				handleChange={(e) => chooseAnswer(e)}
				ans={quiz.answer}
			/>
		);
	});
	// set chosen answers to be an array of answers
	function chooseAnswer(e) {
		const index = e.target.id;
		const value = e.target.value;
		setChosenAnswers((prev) => {
			prev[index] = value;
			return [...prev];
		});
		setQuiz((prev) => {
			prev[index].answer = { index: index, val: value };
			prev[index].result = 'answered';
			return [...prev];
		});
	}
	function checkResult() {
		// put all correct answers into an array
		const allCorrectAnswers = [];
		quizsMap.forEach((quiz) =>
			allCorrectAnswers.push(quiz.props.correctAnswer)
		);
		// find any unanswered question
		const found = quizs.find((quiz) => quiz.result == 'unanswered');
		if (found) {
			alert('Please answer all questions');
		} else {
			// compare chosen answers array and correct answers array
			for (let i = 0; i < chosenAnswers.length; i++) {
				if (chosenAnswers[i] == allCorrectAnswers[i]) {
					// set results
					setQuiz((prev) => {
						prev[i].result = 'correct';
						return [...prev];
					});
					setCorrectAnswers((prev) => prev + 1);
				} else {
					setQuiz((prev) => {
						prev[i].result = 'wrong';
						return [...prev];
					});
				}
			}
			setGameOver(true);
		}
	}

	function restartGame() {
		setNewGame((prev) => !prev);
		setGameOver(false);
		setCorrectAnswers(0);
		setChosenAnswers([]);
	}
	// change type of questions in form
	function changeQuestions(event) {
		const { name, value } = event.target;
		setFormData((prev) => {
			return { ...prev, [name]: value };
		});
	}

	function returnHome() {
		setFormData((prev) => {
			return { ...prev, amountOfQues: 0 };
		});
		restartGame();
	}

	return (
		<div>
			<Header render={quizs.length == 0} handleClick={returnHome} />
			<Home
				render={quizs.length == 0}
				formData={formData}
				handleChange={changeQuestions}
				handleSubmit={(e) => {
					e.preventDefault();
					restartGame();
				}}
			/>
			<div className='allquizs'>{quizsMap}</div>

			<div className='outer'>
				{gameOver && (
					<span className='score'>
						{' '}
						You scored {correctAnswers}/{formData.amountOfQues} correct answers
					</span>
				)}
				{!gameOver && quizs.length == 0 ? (
					''
				) : !gameOver && quizs.length != 0 ? (
					<button onClick={checkResult}>Check answers</button>
				) : (
					<button onClick={restartGame}>New game</button>
				)}
			</div>
		</div>
	);
}

export default App;
