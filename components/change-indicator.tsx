import { FaCaretDown, FaCaretUp } from "react-icons/fa"

interface ChangeIndicatorProps {
  changeValue?: number
}
const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ changeValue }) => {
  return (
    <div className="flex">
      {changeValue ? (
        <>
          <span>{changeValue.toFixed(2)}</span>
          <div>
            {changeValue < 0 ? (
              <FaCaretDown className="text-red-500" />
            ) : (
              <FaCaretUp className="text-green-500" />
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}
export default ChangeIndicator
