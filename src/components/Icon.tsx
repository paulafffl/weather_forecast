type IconProps = {
  type: string
  alt?: string
  id?: string
  color?: string
}

const Icon = ({ type, alt, id, color = 'white' }: IconProps) => {
  const iconToBeDisplayed = () => {
    if (type === 'weather') {
      return (
        <img
          alt={`weather-icon-${alt}`}
          src={`http://openweathermap.org/img/wn/${id}@2x.png`}
        />
      )
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
