import cors from 'cors';
import express from 'express';

import bodyparser from 'body-parser';

// import * as product from './products/GET-productById/get-productById';
import { listProducts } from './products/GET-products/get-products';
// import * as users from './users/GET-users/get-users';
import { login, verify } from './shared/services/jwt.service';
import { bidOnProduct } from './bids/POST-bidByProductId/post-bidByProductId';
import { getProductWithId } from './products/GET-productById/get-productById';

const PORT = 3000;
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// AUTHENTICATION
app.post('/users/authenticate', (req, res) => {
  login(req, res);
});

// PRODUCTS
app.get('/products', verify, (req, res) => listProducts(res));
app.get('/products/:productId', verify, (req, res) => getProductWithId(req, res));
// Product BIDS
app.post('/products/:productId/bid', verify, (req, res) => bidOnProduct(req, res));
// app.get('/products/:id', (req, res) => res.json(product.getID(req.params.id)));


// USERS
// app.get('/users', (req, res) => {
//   // eslint-disable-next-line
//   res.json(users.get());
// });


// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Auction API is running at localhost: ${PORT}`));
