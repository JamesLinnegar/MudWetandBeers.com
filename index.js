var Metalsmith = require('metalsmith'),
    Handlebars = require('handlebars'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    sass	   = require('metalsmith-sass'),
    watch      = require('metalsmith-watch'),
    serve      = require('metalsmith-serve'),
    fs         = require('fs');


Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/templates/partials/head.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
   .use(serve())
   .use(watch({
   		paths: {
        "**/*": true,
        "templates/**/*": "**/*.md",
      },
      livereload: true}))
   .use(sass({
   	  outputStyle: "expanded",
   	  outputDir: 'css/'
   }))
   .use(markdown())
   .use(templates('handlebars'))
   .destination('./build')
   .build(function(err, files) {
        if (err) { throw err; }
    });