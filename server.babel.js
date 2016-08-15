require('babel-register');
require('babel-polyfill');
app = require('./src/server').app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("I'm listening on %d", PORT);
})
