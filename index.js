var Metalsmith = require('metalsmith'),
    Handlebars = require('handlebars'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    fs         = require('fs');

Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/templates/partials/head.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
   .use(markdown())
   .use(templates('handlebars'))
   .destination('./build')
   .build(function(err, files) {
        if (err) { throw err; }
    });