module.exports = {
    route: '/',
    description: 'The main / page',
    method: 'get',
    execute: function(req, res)
    {
        res.send("balls!")
    }
}