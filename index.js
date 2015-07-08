var Metalsmith = require('metalsmith'),
    Handlebars = require('handlebars'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    sass	   = require('metalsmith-sass'),
    watch      = require('metalsmith-watch'),
    serve      = require('metalsmith-serve'),
    Sitemap    = require('metalsmith-sitemap')
    permalinks = require('metalsmith-permalinks'),
    collections = require('metalsmith-collections'),
    fs         = require('fs');


Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/templates/partials/head.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
   .use(serve({
   	verbose:true
   }))
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
   .use(permalinks({
   	relative: false
   }))
   .destination('./build')
   .use(Sitemap({
   		output: 'sitemap.xml', // The location where the final sitemap should be placed
    	hostname: 'http://www.mudwetandbeers.com', // hostname to use for URL, if needed
    	modifiedProperty: 'modified', // Key for last modified property
    	defaults: { // You can provide default values for any property in here
        	priority: 0.5,
        	changefreq: 'daily'
    	}
    }))
   .build(function(err, files) {
        if (err) { throw err; }
    });