import Search from './components/Search'
import Forecast from './components/Forecast'
import { forecastType } from './types'
import useForecast from './hooks/useForecast'

const App = () => {
  const {
    handleChangeInput,
    locationInput,
    handleClickLocation,
    locationOptions,
    handleClickSearch,
    forecast,
    setForecast,
    isLoading,
  } = useForecast()

  const locationStored = localStorage.getItem('location')

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-400 via-sky-200 to-teal-300 h-[100vh] w-full">
      {isLoading && (
        <div className="loader-container h-[60vh]">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && forecast && (
        <section className="main-section">
          <Forecast
            setForecast={setForecast}
            forecast={forecast as forecastType}
          />
        </section>
      )}
      {!locationStored && (
        <section className="main-section">
          <Search
            handleChangeInput={handleChangeInput}
            locationInput={locationInput}
            handleClickLocation={handleClickLocation}
            locationOptions={locationOptions}
            handleClickSearch={handleClickSearch}
          />
        </section>
      )}
    </main>
  )
}

export default App
