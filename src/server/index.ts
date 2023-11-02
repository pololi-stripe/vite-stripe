import express from 'express';
import path from 'path';

export const app = express();

app.get('/api/test', (_, res) => res.json({greeting: 'test, world!'}));

app.get('/success', (_, res) => {
  res.sendFile(path.join(process.cwd(), '/success.html'));
});

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}
