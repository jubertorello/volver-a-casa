import { getSettings } from "./lib/services/settings.service.js";

async function run() {
  const logos = await getSettings("footer_logos");
  console.log(JSON.stringify(logos, null, 2));
}

run();
