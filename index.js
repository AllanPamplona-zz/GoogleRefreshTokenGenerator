// https://developers.google.com/identity/protocols/OAuth2WebServer
require('dotenv').config()
const fetch = require("node-fetch")
const express = require('express')
const app = express()
const port = process.env.port

const clientId = process.env.client_id
const clientSecret = process.env.client_secret

app.use(express.static('public'))

app.get('/clientId', (req, res) => {
  res.send(JSON.stringify({ clientId }))
})

app.get('/redirect', handleOAuth2)
async function handleOAuth2(req, res) {
  const tokenResponse = await fetch(
    `https://www.googleapis.com/oauth2/v4/token`,
    {
      method: 'POST',
      body: JSON.stringify({
        code: req.query.code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: process.env.redirect_url,
        grant_type: 'authorization_code'
      })
    }
  )
  const tokenJson = await tokenResponse.json()
  res.send(tokenJson.refresh_token)
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

