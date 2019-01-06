

module.exports = function (express_app) {
    express_app.get('/:path', (req, res) => {
        console.log(req.params.path)
        req.params.page = 'layouts/' + req.params.path;
        req.params.style = '/assets/stylesheets/layouts/' + req.params.path + '.less';
        req.params.script = '/assets/scripts/' + req.params.path + '.js';
        res.render('index', req.params);
    })
    express_app.get('/', (req, res) => res.redirect('/home'))
}