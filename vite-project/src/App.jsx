import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import PuppiesList from './PuppiesList';
import SinglePuppy from './SinglePuppy';
import NewPuppy from './NewPuppy';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await axios.get('https://fsa-puppy-bowl.herokuapp.com/api/2310/players');
        setPlayers(data.data.players);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  const addPlayer = async (newPlayer) => {
    setPlayers([...players, newPlayer]);
  };

  const deletePlayer = async (playerId) => {
    try {
      await axios.delete(`https://fsa-puppy-bowl.herokuapp.com/api/2310/players/${playerId}`);
      setPlayers(players.filter((player) => player.id !== playerId));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div>
      <h1>Puppy Bowl 2023!</h1>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllPuppies players={players} onDeletePlayer={deletePlayer} />} />
        <Route path="/singlepuppy/:id" element={<SinglePuppy players={players} onDeletePlayer={deletePlayer} />} />
        <Route path="/newpuppy" element={<NewPuppy onAddPlayer={addPlayer} />} />
      </Routes>
    </div>
  );
}

export default App;