import { useEffect } from 'react'
import { stickers } from './data/stickers.js'
import './App.css'

function App() {
  useEffect(() => {
    console.log('Figuritas:', stickers)
  }, [])

  return (
    <main>
      <h1>Álbum Mundial 2026</h1>
      <p>Revisa la consola para ver el array de figuritas.</p>
    </main>
  )
}

export default App
