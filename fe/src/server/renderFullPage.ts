
type WebExtractor = {
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


const loadClient = () => {
  gapi.load('client:auth2', start);
}

export const renderFullPage = (webExtractor: WebExtractor, html: Html) => `
  <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        ${webExtractor.helmet}
        ${webExtractor.link}
        ${webExtractor.style}
      </head>
      <body>
        <div id="root">${html}</div>
        <div id="mordal"></div>
        ${webExtractor.script}
        <script src="https://apis.google.com/js/api.js"></script>
      </body>
    </html>
`