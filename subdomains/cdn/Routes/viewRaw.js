var fs = require("fs")

module.exports = {
    route: '/raw/:imageId',
    description: 'View raw uploaded file',
    method: 'get',
    execute: function(req, res)
    {
        var imgId = req.params.imageId
        if(fs.existsSync(__dirname+`/uploads/${imgId}`))
        {
            res.status(200).sendFile(__dirname+`/uploads/${imgId}`)
        }
        else
        {
            res.status(404).send("Not found")
        }
    }
}