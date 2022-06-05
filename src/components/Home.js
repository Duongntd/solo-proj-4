import React from 'react'

function Home({ formData, handleChange, handleSubmit, render }) {
  const category = [
    {value:'', text: 'Any Category'},
    {value:'&category=9', text: 'General Knowledge'},
    {value:"&category=10", text: 'Entertainment: Books'},
    {value:"&category=12", text: 'Entertainment: Music'},
    {value:"&category=13", text: 'Entertainment: Musicals & Theatres'},
    {value:"&category=14", text: 'Television'},
    {value:"&category=15", text: 'Video Games'},
    {value:"&category=16", text: 'Boardgames'},
    {value:"&category=17", text: 'Science & Nature'},
    {value:"&category=18", text: 'Science: Computers'},
    {value:"&category=19", text: 'Science: Maths'},
    {value:"&category=20", text: 'Mythology'},
    {value:"&category=21", text: 'Sports'},
    {value:"&category=22", text: 'Geography'},
    {value:"&category=23", text: 'History'},
    {value:"&category=24", text: 'Politics'},
    {value:"&category=25", text: 'Art'},
    {value:"&category=26", text: 'Celebrities'},
    {value:"&category=27", text: 'Animals'},
    {value:"&category=28", text: 'Vehicles'},
    {value:"&category=29", text: 'Entertainment: Comics'},
    {value:"&category=30", text: 'Science: Gadgets'},
    {value:"&category=31", text: 'Entertainment: Anime & Manga'},
    {value:"&category=32", text: 'Entertainment: Cartoon & Animations'}
  ]
  const categoryMap = category.map(cat => {
    return <option value={cat.value}>{cat.text}</option>
  })
  
  const difficulty = [
    {value: '', text: 'Any Difficulty'},
    {value: '&difficulty=easy', text: 'Easy'},
    {value: '&difficulty=medium', text: 'Medium'},
    {value: '&difficulty=hard', text: 'Hard'}
  ]
  const difficultyMap = difficulty.map(diff => {
    return <option value={diff.value}>{diff.text}</option>
  })

  const type = [
    {value: '', text: 'Any Type'},
    {value: '&type=boolean', text: 'True / False'},
    {value: '&type=multiple', text: 'Multiple Choices'},
  ]
  const typeMap = type.map(typ => {
    return <option value={typ.value}>{typ.text}</option>
  })

  return (
    <>
      {render && 
      <div className='home'>
      <h1>Quizzical</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='amount'>Amount of questions (max. 50)</label>
        <input type="text" name='amountOfQues' value={formData.amountOfQues} className={'amount'} onChange={handleChange} />

        <label htmlFor="category">Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          {categoryMap}
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          {difficultyMap}
        </select>

        <label htmlFor="type">Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          {typeMap}
        </select>  
      </form>
      <button onClick={handleSubmit}>Create game</button>
      </div>}
    </>
  )
}

export default Home