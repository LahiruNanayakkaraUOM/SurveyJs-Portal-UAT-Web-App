import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SurveyRenderer from "./SurveyRenderer";
import { fetchSurveyInfo } from "../api/fetchSurveyInfo";
import { fetchLicenseBlocks } from "../api/fetchLicenseBlocks";
import { api } from "../api/fetchScheme";

const Home = () => {
  const [surveyJson, setSurveyJson] = useState(null);
  const [surveyInfo, setSurveyInfo] = useState(null);
  const [surveyQuestions, setSurveyQuestions] = useState(null);
  const [originUrl, setOriginUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slogan } = useParams();
  const navigate = useNavigate();

  // const newOrigin =
  //   "https://survey-portal-uat-gxchbpcrc4fkbze3.uksouth-01.azurewebsites.net/survey/lahiru-training-bc";
  const newOrigin = window.location.href;

  useEffect(() => {
    const getSchema = async () => {
      try {
        const response = await api.get("", { params: { slogan } });
        if (response.data) {
          const data = response.data;
          const schema = data?.content;
          setSurveyJson(schema);
          setOriginUrl(data?.originUrl);
        } else if (response.status === 404) {
          return navigate("/not-found");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          return navigate("/not-found");
        }
        setError(error);
      }
    };

    const getSurveyInfo = async () => {
      try {
        const surveyInfo = await fetchSurveyInfo(newOrigin);
        if (surveyInfo) {
          console.log(surveyInfo);
          setSurveyInfo(surveyInfo);
        } else {
          console.warn("No survey info found");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const getLicenseBlocks = async () => {
      try {
        const surveyQuestions = await fetchLicenseBlocks(newOrigin);
        if (surveyQuestions) {
          console.log(surveyQuestions);
          setSurveyQuestions(surveyQuestions);
        } else {
          console.warn("No survey questions found");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getSchema();
    getSurveyInfo();
    getLicenseBlocks();
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <p></p>
      ) : surveyJson && originUrl && surveyInfo && surveyQuestions ? (
        <SurveyRenderer
          schema={surveyJson}
          originURL={originUrl}
          surveySlogan={slogan}
          surveyInfo={surveyInfo}
          surveyQuestionJSON={surveyQuestions}
        />
      ) : (
        error && <div className="error">{error}</div>
      )}
    </>
  );
};

export default Home;
