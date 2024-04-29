import { forecastType } from '../types'

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
      <img
        alt={`weather-icon-${today.weather[0].description}`}
        src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
        className="my-0"
      />
      <h1 className="text-5xl font-extrabold pl-4 mb-2">
        {Weather(Math.round(today.main.temp))}
      </h1>
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
      <section className="flex flex-row overflow-x-auto my-5 w-4/5">
        {forecast?.list.map((item, index) => (
          <div className="p-2 flex flex-col justify-between">
            <p className="text-xs">
              {index === 0
                ? 'Now'
                : `${new Date(item.dt * 1000).getHours()}:00`}
            </p>
            <img
              alt={`weather-icon-${item.weather[0].description}`}
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
            <p className="text-sm">{Weather(Math.round(item.main.temp))}</p>
          </div>
        ))}
      </section>
      <button
        onClick={() => setForecast(null)}
        aria-label={`Choose new location`}
        title={'Choose new location'}
      >
        <svg
          className="my-3 h-7 w-7 p-0"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
            fill="cornflowerblue"
          />
        </svg>
      </button>
    </>
  )
}

export default Forecast
