const express = require("express")
const root = express()
const Log = require('./modules/Logging')
const Script = require('./modules/ScriptLoader')
const subdomain = require('express-subdomain')
const fs = require('fs')
const chalk = require('chalk')
const { send } = require("process")

// The main root is at the bottom of this script, this is because the subdomains need to have priority over loading static content
// Otherwise the root's static content will be loaded into the subdomains

// log files
root.use((req, res, next) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var Time = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

    Log.info(`${chalk.green(req.ip)} ${chalk.yellow(req.method)} ${chalk.cyan(req.url)}`)
    fs.appendFile('./Security/log.txt', `[${Time}] ${req.ip} ${req.method} ${req.url}\n`, ()=>{})
    next()
})

// TODO: Make this more efficient cause most of it is repeated

// < api.* router >
const api = express.Router()
Script.Load(api, __dirname + "/subdomains/api/Routes/")
api.use(express.static(__dirname + "/subdomains/api/Static/", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))
root.use(subdomain('api', api))

// < cdn.* router >
const cdn = express.Router()
Script.Load(cdn, __dirname + "/subdomains/cdn/Routes/")
cdn.use(express.static(__dirname + "/subdomains/cdn/Static/", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))
root.use(subdomain('cdn', cdn))

// < misako.* router > This is owned by Rexi
const misako = express.Router()
Script.Load(misako, __dirname + "/subdomains/misako/Routes/")
misako.use(express.static(__dirname + "/subdomains/misako/Static/", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))
root.use(subdomain('misako', misako))

// < Main root router >
Script.Load(root, __dirname + "/routes/")
root.use(express.static(__dirname + "/static", {extensions:['html', 'css', 'js', 'htm', 'jpg', 'png', 'gif', 'svg']}))

root.listen(80, ()=>{
    Log.debug("Server started on port 80")
})