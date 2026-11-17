/**
 * Configuration de l'espace de saisie (Sanity Studio).
 *   - en local :  npx sanity dev      → http://localhost:3333
 *   - en ligne :  npx sanity deploy   → https://<nom>.sanity.studio
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { dataset, projectId } from "../sanity/env";

const SINGLETON = "accueil";

export default defineConfig({
  name: "m2-dressing",
  title: "M2 Dressing",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // la page d'accueil est unique : on ne peut pas en créer une deuxième
    templates: (templates) => templates.filter((t) => t.schemaType !== SINGLETON),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === SINGLETON ? actions.filter((a) => a.action !== "duplicate" && a.action !== "delete") : actions,
  },
  plugins: [
    structureTool({
      title: "Contenu",
      structure: (S) =>
        S.list()
          .title("Contenu du site")
          .items([
            S.listItem()
              .title("Page d'accueil")
              .id(SINGLETON)
              .child(S.document().schemaType(SINGLETON).documentId(SINGLETON).title("Page d'accueil")),
            S.divider(),
            S.documentTypeListItem("creation").title("Nos créations"),
            S.documentTypeListItem("tissu").title("Pagnes & tissus"),
          ]),
    }),
  ],
});
