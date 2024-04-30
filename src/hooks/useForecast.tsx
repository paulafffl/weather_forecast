import { ChangeEvent, useEffect, useState } from 'react'
import { forecastType, locationType } from '../types'
import toast from 'react-hot-toast'

const useForecast = () => {
  const [locationInput, setLocationInput] = useState('')
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [locationOptions, setLocationOptions] = useState<[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [locationSelected, setLocationSelected] = useState<locationType | null>(
    null
  )

  const API_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const storedLocation = localStorage.getItem('location')
    if (storedLocation) {
      const option = JSON.parse(storedLocation)
      getForecast(option)
    }
  }, [])

  const getForecast = async (locationSelected: locationType) => {
    setIsLoading(true)
    localStorage.setItem('location', JSON.stringify(locationSelected))
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${locationSelected?.lat}&lon=${locationSelected?.lon}&units=metric&appid=${API_key}`
      )
      if (!response.ok) throw new Error('failed to fetch')
      let data = await response.json()
      const forecastData = {
        ...data.city,
        // hourly forecast for only the next 24h
        list: data.list.slice(0, 16),
      }
      setForecast(forecastData)
    } catch (error) {
      console.error('An error ocurred:', error)
    } finally {
      setLocationInput('')
      setIsLoading(false)
    }
  }

  const getLocations = async (value: string) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_key}`
      )
      if (!response.ok) throw new Error('failed to fetch')
      let data = await response.json()
      setLocationOptions(data)
    } catch (error) {
      console.error('An error ocurred:', error)
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocationInput(value)
    if (value !== '') getLocations(value.trim())
  }

  const handleClickLocation = (option: locationType) => {
    setLocationInput(`${option.name}, ${option.country}`)
    setLocationSelected(option)
    setLocationOptions([])
  }

  const handleClickSearch = () => {
    if (!locationInput) {
      return toast('Enter a location first', { position: 'bottom-center' })
    }
    if (!locationSelected) {
      return toast('Select a city from the dropdown list', {
        position: 'bottom-center',
      })
    }
    getForecast(locationSelected)
  }

  return {
    locationInput,
    locationOptions,
    locationSelected,
    handleChangeInput,
    handleClickLocation,
    handleClickSearch,
    forecast,
    setForecast,
    isLoading,
  }
}

export default useForecast
