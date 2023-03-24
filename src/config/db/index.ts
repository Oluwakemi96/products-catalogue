import pgPromise from 'pg-promise';
import promise from 'bluebird';
import config from '../index';

const pg = pgPromise({ promiseLib: promise, noWarnings: true });
const db = pg(config.PRODUCT_CATALOGUE_URL);

export { db };