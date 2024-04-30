import { forecastType } from '../types'
import Icon from './Icon'

type ForecastProps = {
  setForecast: React.Dispatch<React.SetStateAction<forecastType | null>>
  forecast: forecastType
}

const Forecast: React.FC<ForecastProps> = ({
  setForecast,
  forecast,
}: ForecastProps) => {
  const Weather = (temp: number): string => `${temp}°`

  const today = forecast.list[0]
  return (
    <>
      <Icon
        type="weather"
        alt={today.weather[0].description}
        id={today.weather[0].icon}
      />
      <h1 className="text-5xl font-extrabold pl-4 mb-2">
        {Weather(Math.round(today.main.temp))}
      </h1>
      <h2 className="font-bold text-xl">
        {`Feels like ${Weather(Math.round(today.main.feels_like))}`}
      </h2>
      <h2 className="mb-4">
        {`Max ${Weather(Math.ceil(today.main.temp))} / 
          Min ${Weather(Math.floor(today.main.temp_min))}`}
      </h2>
      <h2 className="text-2xl font-black mb-1">
        <span className="font-thin text-xl">in </span>
        {forecast.name}
        <span className="font-thin"> {forecast.country}</span>
      </h2>
      <p className="mb-2">{`${today.weather[0].main} (${today.weather[0].description})`}</p>
      <section className="flex flex-row overflow-x-auto my-5 w-4/5 pb-4">
        {forecast?.list.map((item, index) => (
          <div
            key={`${item.dt}_${index}`}
            className="p-2 flex flex-col justify-between"
          >
            <p className="text-xs">
              {index === 0
                ? 'Now'
                : `${new Date(item.dt * 1000).getHours()}:00`}
            </p>
            <Icon
              type="weather"
              alt={item.weather[0].description}
              id={item.weather[0].icon}
            />
            <p className="text-sm">{Weather(Math.round(item.main.temp))}</p>
          </div>
        ))}
      </section>
      <button
        onClick={() => {
          localStorage.removeItem('location')
          setForecast(null)
        }}
        aria-label={`Choose new location`}
        title={'Choose new location'}
      >
        <Icon type="location" color="coral" />
      </button>
    </>
  )
}

export default Forecast
