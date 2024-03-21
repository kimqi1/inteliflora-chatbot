import { IOptionProps } from "../../types";

const Option: React.FC<IOptionProps> = ({ onClick, children, isSelected = false }) => (
  <button
    className={`text-sm border p-2 rounded my-2 mr-2 text-start ${
      isSelected ? "bg-green text-white" : "border-green text-green hover:bg-green hover:text-white"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Option;