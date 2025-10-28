import "./Input.css";

type TInput = React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
type TInputType = {
  Password: TInput;
} & TInput;

const _Input: TInput = ({ ...prop }) => {
  return <input className="input__style" {...prop} />;
};

const _Password: TInput = ({ ...prop }) => {
  return <input className="input__style" type="password" {...prop} />;
};

export const Input = _Input as TInputType;
Input.Password = _Password;
