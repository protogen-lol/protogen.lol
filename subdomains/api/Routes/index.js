module.exports = {
    route: '/',
    description: 'Index route for the api',
    method: 'get',
    execute: function(req, res)
    {
        res.redirect("https://docs.protogen.lol/")
    }
}