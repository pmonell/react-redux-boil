export const initHTML = (initialState, initialComponent) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ModernLend Application</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
      </head>
      <body>
        <div id="root">${initialComponent}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}
