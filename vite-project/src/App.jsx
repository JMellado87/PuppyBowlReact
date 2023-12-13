import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import PuppiesList from './PuppiesList'
import SinglePuppy from './SinglePuppy'
import NewPuppy from './NewPuppy'
import SearchBar from './SearchBar'
import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {
  const [puppies, setPuppies] = useState([])
  const navigate = useNavigate()

  useEffect (() => {
    const fetchPuppies = async () => {
      const {data} = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2310/players')
      console.log(data.data.players)
      setPuppies(data.data.players)
    }
    fetchPuppies()
  }, [])

  const create = async (createdPuppy) => {
    const {data} = await axios.post('https://fsa-puppy-bowl.herokuapp.com/api/2310/players', createdPuppy)
    setPuppies([...puppies], data)
  }

  const deletePuppy = async (leavingPuppy) => {
    await axios.delete(`https://fsa-puppy-bowl.herokuapp.com/api/2310/players/${leavingPuppy.id}`)
    setPuppies(puppies.filter((stayingPuppies) => {return stayingPuppies.id !== leavingPuppy.id}))
    navigate('/puppies')
  }
  
  return (
    <div> 
      <Routes>
        <Route path='./puppies' element={<PuppiesList puppies={puppies} />} />
        <Route path='./puppies/:id' element={<SinglePuppy puppies={puppies} deletePuppy={deletePuppy} />} />
        <Route path='./puppies/newpuppy' element={<NewPuppy create={create} />} />
      </Routes>

      <h3>Search:</h3>
      <SearchBar puppies={puppies} />
    </div>

  )
}

export default App