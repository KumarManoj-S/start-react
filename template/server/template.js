const renderFullPage = (header, helmet, html, preloadedState, scripts) => {
  return (`
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <title>Profiles</title>
        <link rel="shortcut icon" href="/favicon.ico">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
        <style id="jss-server-side">${header.materialUiCss}</style>
        ${header.styledComponentCss}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      </head>
      <body style="margin:0" ${helmet.bodyAttributes.toString()}>
        <div id="root">${html}</div>
        ${scripts}
        <script>
          window.REDUX_DATA = ${JSON.stringify(preloadedState)}
        </script>
      </body>
    </html>
  `
  );
};

export default renderFullPage;
