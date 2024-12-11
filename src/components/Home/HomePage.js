import videoHompage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHompage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">{t("homepage.title2")}</div>
        {isAuthenticated === false ? (
          <div className="title-3">
            <button onClick={() => navigate("/login")}>
              {t("homepage.title3.login")}
            </button>
          </div>
        ) : (
          <div className="title-3">
            <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
