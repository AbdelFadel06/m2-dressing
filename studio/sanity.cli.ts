import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "../sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // adresse de l'espace en ligne : https://m2-dressing.sanity.studio
  studioHost: "m2-dressing",
});
