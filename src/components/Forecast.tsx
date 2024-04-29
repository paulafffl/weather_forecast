import { forecastType } from '../types'

type ForecastProps = {
  forecast: forecastType
}

const Forecast: React.FC<ForecastProps> = ({ forecast }: ForecastProps) => {
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
        <span className="font-thin">at </span>
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
    </>
  )
}

export default Forecast
