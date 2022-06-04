module.exports = {
    route: '/',
    description: 'Redirect back to main',
    method: 'get',
    execute: function(req, res)
    {
        res.redirect('https://protogen.lol')
    }
}