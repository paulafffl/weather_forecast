import Icon from './Icon'

type Props = {
  type: 'humidity' | 'rain' | 'sunrise' | 'sunset' | 'wind' | 'visibility'
  info: string | JSX.Element
  description?: string | JSX.Element
}

const Tile = ({ type, info, description }: Props): JSX.Element => {
  return (
    <article className="w-[30vw] h-[auto] lg:w-[10vw] bg-white/20 rounded-md border-white border-2 p-6 flex flex-col justify-top pt-6 mb-6 lg:mb-0 items-center">
      <div className="h-2 mb-4">
        <Icon type="weather" condition={type} color="coral" />
      </div>
      <h4 className="ml-1 capitalize">{type}</h4>
      <h3 className="mt-2 text-lg font-bold">{info}</h3>
      <p className="mt-1 text-xs whitespace-pre-line">{description}</p>
    </article>
  )
}
export default Tile
