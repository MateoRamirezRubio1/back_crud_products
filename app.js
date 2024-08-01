const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routers/productRoutes');

app.use(express.json());
app.use('/api/v1', productRoutes);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});