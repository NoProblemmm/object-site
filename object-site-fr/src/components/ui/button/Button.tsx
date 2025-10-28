import "./Button.css";

export const Button = ({ ...prop }) => {
  return <button className="button__style" {...prop} />;
};

// exp!!!
export const AsyncButton = ({ ...prop }) => {
  return <button className="button__style async__button" {...prop} />;
};
