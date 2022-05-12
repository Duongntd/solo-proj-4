import React from 'react'

function Header({ render, handleClick }) {
  return (
		<>
    	{!render && <div className='header'>
      	<h3 onClick={handleClick}>Quizzical</h3>
				<span onClick={handleClick}>Home</span>
   	  </div>}
		</>
  )
}

export default Header