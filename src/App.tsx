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
    <main className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-400 via-sky-200 to-teal-300 min-h-[100vh] min-w-full">
      {isLoading && (
        <div className="loader-container h-[60vh]">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && forecast && (
        <section className="main-section px-1 py-6 min-h-[90vh]">
          <Forecast
            setForecast={setForecast}
            forecast={forecast as forecastType}
          />
        </section>
      )}
      {!locationStored && !forecast && (
        <section className="main-section px-6 py-20">
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
