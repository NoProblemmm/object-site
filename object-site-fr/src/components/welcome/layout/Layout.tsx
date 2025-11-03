import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="content">
      <div className="container">
        <main className="gallery">
          <div data-speed=".9" className="gallery__left">
            <img
              className="gallery__item"
              src="/static/retro-design.jpg"
              alt="alt"
            />
            <div className="text-block gallery__item">
              <h2 className="text-block__h">It's an easy matter.</h2>
              <p className="text-block__p">
                Everything is easier with music...
              </p>
            </div>
            <img
              className="gallery__item"
              src="/static/retro-design-1.jpg"
              alt="alt"
            />

            <div className="text-block gallery__item">
              <h2 className="text-block__h">Calm music.</h2>
              <p className="text-block__p">Find music for peace of mind.</p>
            </div>
            <img
              className="gallery__item"
              src="/static/retro-design-2.jpg"
              alt="alt"
            />
          </div>
          <div data-speed="1.1" className="gallery__right">
            <div className="text-block gallery__item">
              <h2 className="text-block__h">Your favorite artists.</h2>
              <p className="text-block__p">
                Immerse yourself in the work of your favorite artist.
              </p>
            </div>
            <img
              className="gallery__item"
              src="/static/retro-design-3.jpg"
              alt="alt"
            />
            <div className="text-block gallery__item">
              <h2 className="text-block__h">Modern classics.</h2>
              <p className="text-block__p">Modern art in melody.</p>
            </div>
            <img
              className="gallery__item"
              src="/static/retro-design-4.jpg"
              alt="alt"
            />
            <div className="text-block gallery__item">
              <h2 className="text-block__h">Sounding in reality.</h2>
              <p className="text-block__p">Live music...</p>
            </div>
            <img
              className="gallery__item"
              src="/static/retro-design-5.jpg"
              alt="alt"
            />
          </div>
        </main>
      </div>
    </div>
  );
};
