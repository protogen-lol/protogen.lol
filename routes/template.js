module.exports = {
    route: '/template',
    description: 'A template for how to create a route',
    method: 'get', // can be 'get', 'post', 'put', 'delete', 'patch'
    execute: function(req, res)
    {
        //                                                   Teapot
        res.header("Content-Type", "application/json").status(418).send("{\"message\": \"Hello World!\"}")
    }
}