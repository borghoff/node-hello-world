import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

import 'dotenv/config';
// const port = process.env.PORT || 3000;
// console.log(`Trying to run app on port ${port}`);

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

var app = express();

app.disable('x-powered-by');

app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			imgSrc : ["'self'", "https://" + process.env.AZURE_STORAGE_ACCOUNT_NAME + ".blob.core.windows.net", "data:"],
			"script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
			// "script-src": ["'self'", "cdn.jsdelivr.net", (req, res) => `'nonce-${res.locals.cspNonce}'`],
      		"style-src": ["'self'", "'unsafe-inline'"],
			"script-src-attr": ["'self'", "'unsafe-inline'"]
		},
	},
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


import exphbsInst from './config/view.js';
// view engine voodoo
app.engine( 'hbs', exphbsInst.engine);

app.set('view engine', 'hbs');

app.enabled('view cache');


import indexRouter from './routes/index.js';
app.use('/', indexRouter);

// error handler
app.use(function(error, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = error.message;
	res.locals.error = process.env.NODE_ENV === 'development' ? error : {};
  
	// render the error page
	res.status(error.status || 500);
	res.render('error');
  });
  
export {app};
