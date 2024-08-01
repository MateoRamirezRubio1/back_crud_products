const express = require('express');
const helmet = require('helmet');
const productRoutes = require('./routers/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/v1', productRoutes);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});