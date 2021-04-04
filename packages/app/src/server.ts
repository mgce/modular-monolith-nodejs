import * as express from "express";
import { getTestName } from "@travelhoop/my-test";

const app = express();
const port = 3005;

app.listen(port, () => {
  console.log(`Listen to port ${port}`);
  console.log("xdsss ssaasss kdddkk");
  console.log(getTestName());
});
