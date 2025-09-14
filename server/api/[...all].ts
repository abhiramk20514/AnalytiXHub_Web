import { createServer } from "../index";
import serverless from "serverless-http";

const app = createServer();
export default serverless(app);
