import { IOptionProps } from "../../types";

const Option: React.FC<IOptionProps> = ({ onClick, children }) => (
  <button
    className="text-sm border border-green hover:bg-green text-green hover:text-white p-2 rounded my-2 mr-2 text-start"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Option;
