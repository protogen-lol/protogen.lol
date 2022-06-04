var fs = require("fs")

function createMetaTag(name, content)
{
    return `<meta name="${name}" content="${content}">\n`
}
module.exports = {
    route: '/:imageId',
    description: 'View uploaded file',
    method: 'get',
    execute: function(req, res)
    {
        var imgId = req.params.imageId
        if(fs.existsSync(__dirname+`/meta/${imgId}.json`))
        {
            var ImageMeta = JSON.parse(fs.readFileSync(__dirname+`/meta/${imgId}.json`))
            var UserAgent = req.headers["user-agent"] || "null"
            UserAgent = UserAgent.toLowerCase()

            var EmbedExt = ["png", "jpg", "jpeg", "gif", 'webp']
            if((UserAgent.includes("discord") || UserAgent.includes("twitter")) && EmbedExt.includes(ImageMeta.ext))
            {
                res.status(200).send(
                    createMetaTag("og:image", `https://cdn.protogen.lol/raw/${ImageMeta.name}`)+
                    createMetaTag("theme-color", ImageMeta.design.color)+
                    createMetaTag("og:title", ImageMeta.design.title)+
                    createMetaTag("og:description", ImageMeta.design.description)+
                    createMetaTag("twitter:card", ImageMeta.design.image_size)
                )
            }
            else
            {
                res.sendFile(__dirname+`/uploads/${ImageMeta.name}`)
            }
        }
        else
        {
            res.status(404).send("Not found")
        }
    }
}