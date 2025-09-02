import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AZURE_FONT_FUNCTION_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    code: import.meta.env.VITE_AZURE_FONT_FUNCTION_API_CODE,
  },
});

export const fetchFontStyles = async (surveySlogan) => {
  try {
    const response = await api.get("", { params: { slogan: surveySlogan } });
    if (response.data) {
      const fontStyles = response.data;
      console.log(fontStyles);
      const styleElement = document.createElement("style");
      const headElement = document.getElementsByTagName("head")[0];
      fontStyles.forEach((fontStyle) => {
        if (fontStyle.fontFamily) {
          if (fontStyle.type === "google") {
            const linkElement = document.createElement("link");
            linkElement.setAttribute(
              "href",
              `https://fonts.googleapis.com/css2?family=${fontStyle.fontFamily.replace(
                / /g,
                "+"
              )}`
            );
            linkElement.setAttribute("rel", "stylesheet");
            headElement.appendChild(linkElement);
          } else if (fontStyle.type === "cdn") {
            const linkElement = document.createElement("link");
            linkElement.setAttribute(
              "href",
              `https://fonts.cdnfonts.com/css/${fontStyle.fontFamily
                .replace(/ /g, "-")
                .toLowerCase()}`
            );
            linkElement.setAttribute("rel", "stylesheet");
            headElement.appendChild(linkElement);
          }
          var fontFamily =
            fontStyle.fontFamily.split(" ").length > 1
              ? `'${fontStyle.fontFamily}'`
              : fontStyle.fontFamily;
          const cssRule = `
          ${fontStyle.property} {
          font-family: ${fontFamily}, 'Open Sans' !important
          }`;
          console.log(`CSS rule: ${cssRule}`);
          styleElement.appendChild(document.createTextNode(cssRule));
        }
      });
      headElement.appendChild(styleElement);
    } else {
      console.warn("No font styles found");
    }
  } catch (error) {
    console.error("Error fetching font styles:", error);
    throw error;
  }
};
