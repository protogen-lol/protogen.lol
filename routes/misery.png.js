module.exports = {
    route: '/misery.jpg',
    description: 'A funny meme yes',
    method: 'get',
    execute: function(req, res)
    {
        res.sendFile('/content/misery.html', {root: __dirname})
    }
}