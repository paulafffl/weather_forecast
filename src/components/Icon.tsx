import Humidity from './WeatherIcons/Humidity'
import Rain from './WeatherIcons/Rain'
import Sunrise from './WeatherIcons/Sunrise'
import Sunset from './WeatherIcons/Sunset'
import Visibility from './WeatherIcons/Visibility'
import Wind from './WeatherIcons/Wind'

type IconProps = {
  type: string
  color?: string
  condition?: 'humidity' | 'rain' | 'sunrise' | 'sunset' | 'wind' | 'visibility'
}

const weatherConditions = {
  humidity: Humidity,
  rain: Rain,
  sunrise: Sunrise,
  sunset: Sunset,
  visibility: Visibility,
  wind: Wind,
}

const Icon = ({ type, condition, color = 'white' }: IconProps) => {
  const iconToBeDisplayed = () => {
    if (type === 'weather' && condition) {
      const Icon = weatherConditions[condition]
      return <Icon />
    } else {
      let pathD = ''
      switch (type) {
        case 'close':
          pathD =
            'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
          break
        case 'location':
          pathD =
            'M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z'
          break
        default:
          break
      }
      return (
        <svg
          className="my-3 h-8 w-8 p-0 fill-orange-500 hover:fill-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d={pathD} />
        </svg>
      )
    }
  }

  return iconToBeDisplayed()
}

export default Icon
