import config from "../config/schema-routes.json";
import { handle } from "./worker.js";

export default {
  fetch(request) {
    return handle(request, fetch, config);
  },
};
