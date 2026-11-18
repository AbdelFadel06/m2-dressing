/**
 * Configuration de l'espace de saisie (Sanity Studio).
 *   - en local :  npx sanity dev      → http://localhost:3333
 *   - en ligne :  npx sanity deploy   → https://<nom>.sanity.studio
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { dataset, projectId } from "../sanity/env";

const SINGLETONS = ["accueil", "reglages"];

export default defineConfig({
  name: "m2-dressing",
  title: "M2 Dressing",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // la page d'accueil est unique : on ne peut pas en créer une deuxième
    templates: (templates) => templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter((a) => a.action !== "duplicate" && a.action !== "delete") : actions,
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
              .id("accueil")
              .child(S.document().schemaType("accueil").documentId("accueil").title("Page d'accueil")),
            S.listItem()
              .title("Réglages du site")
              .id("reglages")
              .child(S.document().schemaType("reglages").documentId("reglages").title("Réglages du site")),
            S.divider(),
            S.documentTypeListItem("creation").title("Nos créations"),
            S.documentTypeListItem("tissu").title("Pagnes & tissus"),
            S.documentTypeListItem("avis").title("Avis clients"),
          ]),
    }),
  ],
});
