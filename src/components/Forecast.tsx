import {
  getHumidityInfo,
  getRainProbability,
  getSunTime,
  getVisibilityInfo,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../types'
import Icon from './Icon'
import Image from './Image'
import Tile from './Tile'

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
      <Image reference={today.weather[0]} />
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
      <section className="flex overflow-x-auto my-5 w-4/5 pb-5">
        {forecast?.list.map((item, index) => (
          <div
            key={`${item.dt}_${index}`}
            className="flex flex-col items-center mx-0.5 sm:mx-1 flex-shrink-0 sm:flex-shrink w-[11vw] sm:w-[11vh]"
          >
            <p className="text-sm pl-1">
              {Weather(Math.round(item.main.temp))}
            </p>
            <div className="w-10 md:w-16">
              <Image reference={item.weather[0]} />
            </div>
            <p className="text-xs p-1">
              {index === 0
                ? 'Now'
                : `${new Date(item.dt * 1000).getHours()}:00`}
            </p>
          </div>
        ))}
      </section>
      <section className="flex w-[65vw] flex-wrap my-2 justify-between">
        <Tile type="sunrise" info={getSunTime(forecast.sunrise)} />
        <Tile type="sunset" info={getSunTime(forecast.sunset)} />
        <Tile
          type="wind"
          info={`${Math.round(today.wind.speed)}\u00A0km/h`}
          description={`Direction\u00A0${getWindDirection(
            Math.round(today.wind.deg)
          )}, \nSpeed ${today.wind.gust.toFixed(1)}\u00A0km/h`}
        />
        <Tile
          type="rain"
          info={`${Math.round(today.pop * 100)}%`}
          description={`${getRainProbability(today.pop)}, \nclouds at ${
            today.clouds.all
          }%`}
        />
        <Tile
          type="humidity"
          info={`${today.main.humidity}%`}
          description={getHumidityInfo(today.main.humidity)}
        />
        <Tile
          type="visibility"
          info={`${(today.visibility / 1000).toFixed()}km`}
          description={getVisibilityInfo(today.visibility)}
        />
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
