import { devEnv, prodEnv, testEnv } from './env/index';
 
const { PRODUCT_CATALOGUE_NODE_ENV } = process.env;

const config = PRODUCT_CATALOGUE_NODE_ENV === 'development' ? devEnv 
  : PRODUCT_CATALOGUE_NODE_ENV === 'production' ? prodEnv 
    : testEnv

export default config;