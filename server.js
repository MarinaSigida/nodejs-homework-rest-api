const mongoose = require('mongoose');

const app = require('./app')

const { DB_HOST } = process.env;

const PORT = process.env.PORT || 5001;

mongoose.set('strictQuery',true);


mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log (`Connected on port : ${PORT}`);
      console.log (`Database connection successful`)
    })
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  });

