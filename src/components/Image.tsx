type ImageProps = {
  reference: {
    main: string
    icon: string
    description: string
  }
}

const Image = ({ reference }: ImageProps) => {
  return (
    <img
      alt={`weather-icon-${reference.description}`}
      src={`http://openweathermap.org/img/wn/${reference.icon}@2x.png`}
    />
  )
}

export default Image
