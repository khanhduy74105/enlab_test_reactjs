interface ButtonProps {
  text: string,
  color?: boolean,
  w_full?: boolean,
  onClick?: () => void,
  disable?: boolean
}

export const Button = ({ text, w_full, onClick, disable }: ButtonProps) => {
  return (
    <button className={`px-6 py-2 text-lg rounded-l-full rounded-r-full text-white ${!disable ? 'bg-red-700' : 'bg-neutral-500 cursor-not-allowed'} ${w_full ? 'w-full' : ''}`}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </button>
  )
}
