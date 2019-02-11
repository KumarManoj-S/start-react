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
        
        <!-- Object.keys() polyfill -->
        <script type="text/javascript">
          if (!Object.keys) {
            Object.keys = (function () {
              'use strict';
              var hasOwnProperty = Object.prototype.hasOwnProperty,
                  hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                  dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                  ],
                  dontEnumsLength = dontEnums.length;
    
              return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                  throw new TypeError('Object.keys called on non-object');
                }
    
                var result = [], prop, i;
    
                for (prop in obj) {
                  if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                  }
                }
    
                if (hasDontEnumBug) {
                  for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                      result.push(dontEnums[i]);
                    }
                  }
                }
                return result;
              };
            }());
          }
        </script>
      </body>
    </html>
  `
  );
};

export default renderFullPage;
