import { SettingsLogic } from "../settingsLogic/SettingsLogic";
import "./SettingsLayout.css";

export const SettingsLayout = () => {
  const { links } = SettingsLogic();
  return (
    <div className="settingslayout__container">
      <div className="settingslayout__card-container">
        {links.map((item, index) => (
          <>
            <div
              key={index}
              className={`settingslayout__card ${item.state && "active"}`}
              onClick={item.open}
            >
              <span>{item.name}</span>
            </div>
            {item.sublinks?.map((link, index) => (
              <div
                key={index}
                className={`settingslayout__dropdown-menu ${item.state && "active"} `}
              >
                <div className="settingslayout__menu" onClick={link.callback}>
                  <span>{link.name}</span>
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};
