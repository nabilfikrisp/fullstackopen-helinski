import config from "#utils/config.js";
import { connectToDatabase } from "#utils/db.js";

import app from "./app.js";

await connectToDatabase();

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${String(config.PORT)}`);
});
