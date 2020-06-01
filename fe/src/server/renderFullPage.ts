type WebExtractor = {
  helmet: string,
  script: string,
  style: string, 
  link: string
}
type Html = string; 
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
        ${webExtractor.script}
      </body>
    </html>
`