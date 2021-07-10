import escapeForHtmlAttribute from "@utils/escapeForHtmlAttribute";
import { ReducedStore } from "@store/u";

export interface WebExtractor {
  helmet: string,
  script: string,
  style: string,
  link: string
}

type Html = string;

const scopes = 'profile';

const start = () => {
  gapi.client.init({
    clientId: process.env.CLIENT_ID,
    scope: scopes,
  })
}

interface RenderFullPageParams {
  collectedWeb: WebExtractor;
  html: string;
  stores: ReducedStore;
}

type RenderFullPage = (param: RenderFullPageParams) => Html;

export const renderFullPage: RenderFullPage = ({
  collectedWeb,
  html,
  stores
}) => {
  return (`
  <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        ${collectedWeb.helmet}
        ${collectedWeb.link}
        ${collectedWeb.style}
        <link rel="shortcut icon" href="favicon.ico"></link>
        <script src="https://apis.google.com/js/api.js"></script>
      </head>
      <body>
        <div 
          id="root"
          data-initial-state="${escapeForHtmlAttribute(JSON.stringify(
    { ...stores }
  ))}"
        >
          ${html}
        </div>
        <div id="mordal"></div>
        ${collectedWeb.script}
      </body>
    </html>
`)
}