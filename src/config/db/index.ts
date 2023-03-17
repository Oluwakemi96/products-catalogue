import pgPromise from 'pg-promise';
import promise from 'bluebird';
import config from '../index';

const pg:any = pgPromise({ promiseLib: promise, noWarnings: true });
const db:any = pg(config.PRODUCT_CATALOGUE_URL);