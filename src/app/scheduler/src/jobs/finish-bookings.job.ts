import { httpClient } from "../http.client";

const URL_PATH = "booking/finish-bookings";

(async () => {
  await httpClient(URL_PATH);
})();
