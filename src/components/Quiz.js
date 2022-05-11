import React from 'react'

function Quiz({ name, question, suffledAnswer, correctAnswer, result, handleChange, ans }) {
	// map answers to radio input
	const answers = suffledAnswer.map(answer => {
		// change answers colors
		let color = 'white';
		if (ans.val == answer.val && ans.index == ans.index && result == 'correct') {
			color = 'green';
		} else if (ans.val == answer.val && ans.index == answer.index && result == 'wrong') {
			color = 'red'
		} else if (ans.val == answer.val && ans.index == answer.index) {
			color = 'blue';
		} else if (answer.val == correctAnswer && result == 'wrong') {
			color = 'green'
		} else {
			color ='white'
		}
		return <div>
			<label className={`container ${color}`}>
					<input 
						type='radio' 
						checked={ans.index == answer.index && ans.val == answer.val}
						onChange={handleChange} 
						value={answer.val} 
						name={`question_${name}`} 
						index={answer.index}
					/>
						{answer.val}
			</label>
			<br />
		</div>
	})
	// display results
  return (
    <div className='quiz'>
			<div className='question'>
				<h2>{question}</h2>
			</div>
			<div  className='answer'>
				<div className='field'>
				{answers}
				</div>
			</div>
			<hr />
		</div>
  )
}

export default Quiz