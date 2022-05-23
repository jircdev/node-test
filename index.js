const express = require('express');
const app = express();
const port = 3001;
const { join } = require('path');

app.use('/api/auth', userRouter);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'instructions.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
