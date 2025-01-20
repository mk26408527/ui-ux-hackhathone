import product from './product';

import { SchemaTypeDefinition } from 'sanity';
import review from './reviwes';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, review] 
};
