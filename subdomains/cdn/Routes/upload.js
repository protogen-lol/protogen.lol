var fs = require("fs")

function Authenticate(key)
{
    if(fs.existsSync(__dirname+`/auth/${key}.json`))
    {
        var Auth = JSON.parse(fs.readFileSync(__dirname+`/auth/${key}.json`))
        return Auth
    }
    else
        return false
}

function randomString(len)
{
    var text = "";
    var possible = "abcdef1234567890";

    for(var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function ext(file) 
{
    return file.split('.').pop();
}

module.exports = {
    route: '/upload',
    description: 'Endpoint for uploading files to the host',
    method: 'post',
    execute: function(req, res)
    {
        var auth = req.headers["auth_key"] || null
        var authJS = Authenticate(auth)
        if(authJS.AllowedToUpload)
        {
            var file = req.files.file;
            var randName = randomString(10)
            var fext = ext(file.name)
            var newName = randName + "." + fext

            var color = req.headers["color"] || "#2F3136"
            var title = req.headers["title"] || "cdn.protogen.lol"
            var description = req.headers["description"] || `Uploaded by ${authJS.Owner}`
            var image_size = req.headers["image_size"] || "summary_large_image"

            var Design = {
                color: color,
                title: title,
                description: description,
                image_size: image_size
            }

            file.mv(`./subdomains/cdn/Routes/uploads/${newName}`, (err)=>{
                if(err)
                    console.log(err)
                else
                {
                    // Create metadata for the file
                    var meta = {
                        name: newName,
                        size: file.size,
                        type: file.type,
                        author: authJS,
                        ext: fext,
                        design: Design
                    }
                    fs.writeFile(__dirname + `/meta/${randName}.json`, JSON.stringify(meta), (d)=>{})

                    res.status(200).send({
                        type: "success",
                        message: "File uploaded successfully",
                        url: `https://cdn.protogen.lol/${randName}`
                    })
                }
            })
        } 
        else
        {
            res.status(401).send({
                type: "error",
                message: "Invalid auth key",
                code: 401
            })
        }
    }
}