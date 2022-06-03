const express = require("express")
const root = express()
const Log = require('./modules/Logging')
const Script = require('./modules/ScriptLoader')
const subdomain = require('express-subdomain')

// The main root is at the bottom of this script, this is because the subdomains need to have priority over loading static content
// Otherwise the root's static content will be loaded into the subdomains


// < api.* router >
const api = express.Router()
Script.Load(api, __dirname + "/subdomains/api/Routes/")
api.use(express.static(__dirname + "/subdomains/api/Static/", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))
root.use(subdomain('api', api))

// < Main root router >
Script.Load(root, __dirname + "/routes/")
root.use(express.static(__dirname + "/static", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))


root.listen(80, ()=>{
    Log.debug("Server started on port 80")
})