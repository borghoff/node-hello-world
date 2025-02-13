// view engine: handlebars via express-handlebars
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// bb_console('/config/view.js - __dirname: ' + __dirname, 0);

var exphbsInst = exphbs.create({
	extname: 'hbs',
	defaultLayout: 'index',
	layoutsDir: './views/layouts',
	partialsDir: './views/partials',
	restrictLayoutsTo: './views/layouts',
	helpers: {
		eq: (v1, v2) => v1 === v2,
		neq: (v1, v2) => v1 !== v2,
		lt: (v1, v2) => v1 < v2,
		gt: (v1, v2) => v1 > v2,
		lte: (v1, v2) => v1 <= v2,
		gte: (v1, v2) => v1 >= v2,
		and() {
			return Array.prototype.every.call(arguments, Boolean);
		},
		or() {
			return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
		}
	} 
});

export default exphbsInst;

export function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    exphbsInst.getTemplates('./public/tpl/', {
        precompiled: true
    }).then(function (templates) {
        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(exphbsInst.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

		// bb_console('req.path: ' + req.path + ' | req.baseUrl: ' + req.baseUrl);

        if (req.baseUrl === '/checks') {
            // Filter templates to only include those with "check", "global", or "user" in the name.
            const filterKeywords = ['check', 'global', 'user'];
            templates = templates.filter(template => 
                filterKeywords.some(keyword => template.name.includes(keyword))
            );
        }

        // Exposes the templates during view rendering.
        if (templates.length) {
			bb_console('Number of public templates/partials: ' + templates.length, 2);
            res.locals.templates = templates;
        }
        setImmediate(next);
    })
    .catch(next);
};

