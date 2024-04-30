import { ChangeEvent, useState } from 'react'
import { forecastType, locationType } from '../types'
import toast, { Toaster } from 'react-hot-toast'

type SearchProps = {
  setForecast: React.Dispatch<React.SetStateAction<forecastType | null>>
}

const Search: React.FC<SearchProps> = ({ setForecast }) => {
  const [locationInput, setLocationInput] = useState('')
  const [locationOptions, setLocationOptions] = useState([])
  const [locationSelected, setLocationSelected] = useState<locationType | null>(
    null
  )
  const API_key = process.env.REACT_APP_API_KEY

  const getForecast = async () => {
    if (!locationInput) {
      return toast('Enter a location first', { position: 'bottom-center' })
    }
    if (!locationSelected) {
      return toast('Select a city from the dropdown list', {
        position: 'bottom-center',
      })
    }
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${locationSelected?.lat}&lon=${locationSelected?.lon}&units=metric&appid=${API_key}`
      )
      if (!response.ok) {
        throw new Error('failed to fetch')
      } else {
        let data = await response.json()
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }

        setForecast(forecastData)
      }
    } catch (error) {
      console.error('An error ocurred:', error)
    }
  }

  const getLocations = async (value: string) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_key}`
      )
      if (!response.ok) {
        throw new Error('failed to fetch')
      } else {
        let data = await response.json()
        setLocationOptions(data)
      }
    } catch (error) {
      console.error('An error ocurred:', error)
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setLocationInput(value)
    getLocations(value)
  }

  const handleClickLocation = (option: locationType) => {
    setLocationInput(option.name)
    setLocationSelected(option)
    setLocationOptions([])
  }

  return (
    <>
      <h1 className="font-thin text-4xl mb-5">
        Weather <span className="font-black">Forecast</span>
      </h1>

      <p className="font-light my-4">
        Enter a location and then select an option from dropdown list
      </p>

      <div className="flex relative mb-3">
        <label htmlFor="location" className={'screen-readers-only'}>
          Location
        </label>
        <input
          type="text"
          value={locationInput}
          className="flex-grow border-2 border-white rounded-l-md p-2 w-3/4"
          onChange={(e) => handleChangeInput(e)}
          name="location"
          id="location"
        />
        {locationInput !== '' && locationOptions.length > 0 && (
          <ul className="absolute left-0 top-11 bg-white ml-1 rounded-b-md">
            {locationOptions.map((option: locationType, index: number) => (
              <li
                key={`${option.name}_${index}`}
                className="text-left px-2 py-1 hover:bg-teal-100 w-full"
              >
                <button
                  onClick={() => handleClickLocation(option)}
                  aria-label={`Choose ${option.name}, ${option.country}`}
                >
                  {`${option.name}, ${option.country}`}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="font-bold rounded-r-md border-2 border-white p-2 hover:bg-teal-200"
          onClick={getForecast}
          aria-label={`Get weather forecast}`}
        >
          search
        </button>
      </div>
      <Toaster />
    </>
  )
}

export default Search
