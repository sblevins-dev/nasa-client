import './App.css'
import './index.css'
import Hero from './components/Hero'
import Rover from './components/Rover'

function App() {

  return (
    <div className='w-full max-h-[100vh] overflow-y-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950 '>
      <div className='container m-auto flex flex-col gap-10 py-10 px-5'>
        <div>
          <h1 className='text-center font-bold text-5xl mb-2'>
            <span className='text-blue-400'>N</span>
            <span className='text-orange-400'>A</span>
            <span className='text-blue-400'>S</span>
            <span className='text-orange-400'>A</span> API
          </h1>
          <h2 className='text-xs text-center'>
            Picture of the day and photos from the Mars Curiousity Rover on 2-19-2024
            provided by the <a href="https://api.nasa.gov/" target="_blank" className='text-orange-400'>NASA API</a>
          </h2>
        </div>

        <Hero />
        <Rover />
      </div>

    </div>

  )
}

export default App
