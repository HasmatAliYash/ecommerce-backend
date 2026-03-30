import { app } from "./app";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

// Start the server only after DB Connection
AppDataSource.initialize()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`App listening at http://localhost:${env.port}`);
    });
  })
  .catch(console.error);
