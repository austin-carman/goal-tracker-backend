const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./authentication/auth-router');
const goalsRouter = require('./goals/goals-router');
const relationshipRouter = require('./relationships/relationships.router');
const likesRouter = require('./likes/likes-router');
const commentsRouter = require('./comments/comments-router');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/goals', goalsRouter);
server.use('/api/following', relationshipRouter);
server.use('/api/likes', likesRouter);
server.use('/api/comments', commentsRouter);

server.get('/', (req, res) => {
    res.status(200).json('api up')
})

server.use((err, req, res, next) => {
    res.json({
        status: 500,
        message: err.message,
        error: err.stack
    });
});

module.exports = server;
