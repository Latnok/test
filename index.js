const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { authenticateToken } = require('./middleware/auth');
const currencyRoutes = require('./routes/currencyRoutes');

const app = express();
const PORT = 3000;

// Маршрут для документации Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Маршруты для работы с валютой
app.use('/currency', authenticateToken, currencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
