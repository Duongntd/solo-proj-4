import React from 'react'

function Home({ formData, handleChange, handleSubmit, render }) {

  return (
    <>
      {render && <div className='home'>
      <h1>Quizzical</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='amount'>Amount of questions</label>
        <input type="text" name='amountOfQues' value={formData.amountOfQues} className={'amount'} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value=''>Any Category</option>
          <option value='&category=9'>General Knowledge</option>
          <option value="&category=10">Entertainment: Books</option>
          <option value="&category=11">Entertainment: Film</option>
          <option value="&category=12">Entertainment: Music</option>
          <option value="&category=13">Entertainment: Musicals & Theatres</option>
          <option value="&category=14">Television</option>
          <option value="&category=15">Video Games</option>
          <option value="&category=16">Boardgames</option>
          <option value="&category=17">Science & Nature</option>
          <option value="&category=18">Science: Computers</option>
          <option value="&category=19">Science: Maths</option>
          <option value="&category=20">Mythology</option>
          <option value="&category=21">Sports</option>
          <option value="&category=22">Geography</option>
          <option value="&category=23">History</option>
          <option value="&category=24">Politics</option>
          <option value="&category=25">Art</option>
          <option value="&category=26">Celebrities</option>
          <option value="&category=27">Animals</option>
          <option value="&category=28">Vehicles</option>
          <option value="&category=29">Entertainment: Comics</option>
          <option value="&category=30">Science: Gadgets</option>
          <option value="&category=31">Entertainment: Anime & Manga</option>
          <option value="&category=32">Entertainment: Cartoon & Animations</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value=''>Any Difficulty</option>
          <option value='&difficulty=easy'>Easy</option>
          <option value='&difficulty=medium'>Medium</option>
          <option value='&difficulty=hard'>Hard</option>
        </select>

        <label htmlFor="type">Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value=''>Any Type</option>
          <option value='&type=boolean'>True / False</option>
          <option value='&type=multiple'>Multiple Choices</option>
        </select>  
      </form>
      <button onClick={handleSubmit}>Create game</button>
      </div>}
    </>
  )
}

export default Home