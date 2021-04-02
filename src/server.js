import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, BASE_PATH } = process.env;
const dev = NODE_ENV === 'development';

polka()
    .use(
        BASE_PATH ? `/${BASE_PATH}` : '/',
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sirv('data', { dev }),
        sapper.middleware(),
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
