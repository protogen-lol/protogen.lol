module.exports = {
    route: '/',
    description: 'The main / page',
    method: 'get',
    execute: function(req, res)
    {
        // Return the main.html file from the static folder
        res.sendFile('C:/Users/white/Documents/GitHub/protogen.lol/Static/main.html')
    }
}