const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { subscribeToChannel } = require('./services/message_bus');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const start = async function () {
    // Setup prometheus and metrics
    const promBundle = require('express-prom-bundle');
    const metricsMiddleware = promBundle({
        includePath: true,
        includeMethod: true,
        includeStatusCode: true,
        normalizePath: true,
        promClient: {
            collectDefaultMetrics: {}
        }
    });
    app.use(metricsMiddleware);
    app.use(bodyParser.json());
    // Setup routes
    const indexRouter = require('./routes/index');
    app.use('/', indexRouter);

    // Setup database
    await require('./services/database').connect();
    require('./models/user');
    require('./models/message');
    await require('./seeders/user.seeder').seedUsers();
    require('./services/message_bus');
    // Setup view engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // Setup config
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {
        next(createError(404));
    });

    app.use(function (err, req, res) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.render('error');
    });

    subscribeToChannel();
};

start();


module.exports = app;