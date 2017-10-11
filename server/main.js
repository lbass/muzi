import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

import api from './routes';

const app = express();

const port = 3000;
const devPort = 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(port, () => {
    console.info('Express is listening on port', port);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


if(process.env.NODE_ENV == 'development') {
    console.info('Server is running on development mode');
    const config = require('../webpack.config.dev');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.info('webpack-dev-server is listening on port', devPort);
        }
    );
}
