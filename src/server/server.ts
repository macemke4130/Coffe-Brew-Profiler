import * as express from 'express';
import routes from './routes/index';
import * as path from 'path';

import * as passport from 'passport';

import './middlewares/passport-strategies'; // File runs as import --

const app = express();

const p = path.join(__dirname, '../public');

app.use(express.static(p));
app.use(passport.initialize());
app.use(express.json());
app.use(routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\n\n ❤️ Server listening on port: ${port} ❤️ \n\n`));