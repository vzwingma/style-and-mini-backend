import { cp } from 'fs';
import app from './app';
import { BACKEND_PORT } from './constants/AppConstants';

const port = BACKEND_PORT;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://0.0.0.0:${port}`);
  /* eslint-enable no-console */
});
