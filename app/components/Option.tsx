import { IOptionProps } from "../../types";

const Option: React.FC<IOptionProps> = ({ onClick, children }) => (
  <button
    className="border border-green hover:bg-green text-green hover:text-white py-2 px-4 rounded my-2 mr-2"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Option;
