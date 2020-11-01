const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: '6b750152f84f4e0a9f539eab6d2130ce'
   });

const handleClarifai = (req, res) => {
const {inputURL} = req.body
app.models.initModel({id: Clarifai.DEMOGRAPHICS_MODEL})
.then(Model => {
  return Model.predict(inputURL);
}).then(response => res.json(response))
}

module.exports = {
    handleClarifai: handleClarifai
}