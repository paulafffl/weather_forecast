import { useState } from 'react'
import Search from './components/Search'
import Forecast from './components/Forecast'
import { forecastType } from './types'

const App = () => {
  const [forecast, setForecast] = useState<forecastType | null>(null)

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-400 via-sky-200 to-teal-300 h-[100vh] w-full">
      <section className="bg-white bg-opacity-40 w-[80vw] px-6 py-16 h-auto flex flex-col items-center justify-center text-center rounded drop-shadow-lg">
        {forecast ? (
          <Forecast forecast={forecast as forecastType} />
        ) : (
          <Search setForecast={setForecast} />
        )}
      </section>
    </main>
  )
}

export default App
