import { locationType } from '../types'
import { Toaster } from 'react-hot-toast'

type SearchProps = {
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  locationInput: string
  handleClickLocation: (option: locationType) => void
  locationOptions: []
  handleClickSearch: () => string | undefined
}

const Search = ({
  handleChangeInput,
  locationInput,
  handleClickLocation,
  locationOptions,
  handleClickSearch,
}: SearchProps) => {
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
          onClick={handleClickSearch}
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
