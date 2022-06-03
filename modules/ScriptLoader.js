var fs = require("fs")
var Logging = require('../modules/Logging')

// Allows for loading Node.JS scripts from a directory

module.exports.Load = function(app, root)
{
    Logging.debug("Loading routes...")
    fs.readdir(root, (err,files)=>{
        if(err)
        {
            Logging.error(err)
            return
        }

        files.forEach(file=>{
            if(file.endsWith(".js"))
            {
                var route = require(root + file)
                app[route.method](route.route, route.execute)
                Logging.info(`Load ${route.method}[${route.route}] : ${route.description}`)
            }
            
        })
        Logging.success("Routes loaded!")
    })
}