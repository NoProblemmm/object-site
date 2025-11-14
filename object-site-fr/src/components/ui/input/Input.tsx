import "./Input.css";

type TInput = React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
type TInputType = {
  Password: TInput;
  File: TInput;
} & TInput;

const _Input: TInput = ({ ...prop }) => {
  return <input className="input__style" {...prop} />;
};

const _Password: TInput = ({ ...prop }) => {
  return <input className="input__style" type="password" {...prop} />;
};

const _File: TInput = ({ ...prop }) => {
  return <input type="file" {...prop} />;
};

export const Input = _Input as TInputType;
Input.Password = _Password;
Input.File = _File;
