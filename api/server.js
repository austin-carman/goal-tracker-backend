const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./authentication/auth-router');
const goalsRouter = require('./goals/goals-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/goals', goalsRouter);

server.use((err, req, res, next) => {
    res.json({
        status: 500,
        message: err.message,
        error: err.stack
    });
});

module.exports = server;
