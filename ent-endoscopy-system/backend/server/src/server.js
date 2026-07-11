const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  ENT Endoscopy System Simulator Server is running`);
  console.log(`  Local Address: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
