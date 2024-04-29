import { ChangeEvent, useState } from 'react'
import { locationType } from '../types'

const Search = (): JSX.Element => {
  const [locationInput, setLocationInput] = useState('')
  const [locationOptions, setLocationOptions] = useState([])
  const [locationSelected, setLocationSelected] = useState<locationType | null>(
    null
  )
  const API_key = process.env.REACT_APP_API_KEY

  const getLocations = async (value: string) => {
    try {
      let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_key}`
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
    if (value === '') return
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

      <p className="text-sm font-light mb-5">
        Enter a location and then select a option from dropdown list
      </p>

      <div className="flex relative">
        <label htmlFor="location" className={'screen-readers-only'}>
          Location
        </label>
        <input
          type="text"
          value={locationInput}
          className="border-2 border-white rounded-l-md p-2 w-3/4"
          onChange={(e) => handleChangeInput(e)}
          name="location"
        />
        {locationOptions.length > 0 && (
          <ul className="absolute top-11 bg-white ml-1 rounded-b-md">
            {locationOptions.map((option: locationType, index: number) => (
              <li
                key={`${option.name}_${index}`}
                className="text-left px-2 py-1 hover:bg-teal-100 w-full"
              >
                <button onClick={() => handleClickLocation(option)}>
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="font-bold rounded-r-md border-2 border-white p-2 hover:bg-teal-200"
          onClick={() => alert('search')}
        >
          search
        </button>
      </div>
    </>
  )
}

export default Search
