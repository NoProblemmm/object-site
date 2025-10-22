import "./Hero.css";
export const Hero = () => {
  return (
    <>
      <header className="hero-container">
        <img
          data-lag=".5"
          data-speed=".6"
          className="hero"
          src="/static/white.png"
          alt="hero music"
        ></img>
        <div className="container">
          <div data-speed=".75" className="main-header">
            <h1 className="main-title">next track</h1>
          </div>
        </div>
      </header>
    </>
  );
};
