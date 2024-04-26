import { useState } from 'react'

const Search = () => {
  const [locationInput, setLocationInput] = useState('')
  return (
    <>
      <h1 className="font-thin text-4xl mb-5">
        Weather <span className="font-black">Forecast</span>
      </h1>

      <p className="text-sm font-light mb-5">
        Enter a location and then select a option from dropdown list
      </p>

      <div className="flex">
        <label htmlFor="location" className={'screen-readers-only'}>
          Location
        </label>
        <input
          type="text"
          value={locationInput}
          className="border-2 border-white rounded-l-md p-2 w-3/4"
          onChange={(e) => setLocationInput(e.target.value)}
          name="location"
        />
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
