# M2 Dressing — site vitrine + boutique (Next.js, sans backend)

Styliste à Parakou (Bénin). Catalogue des créations, boutique de pagnes, panier et commande via WhatsApp.

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # vérification avant mise en ligne
```

## Ce qu'il faut personnaliser (dans l'ordre)

1. **`lib/site.ts`** : numéro WhatsApp (`whatsapp`, format `22997000000`), lien TikTok, adresses des 2 ateliers, horaires.
2. **Vidéos TikTok** : dans `lib/site.ts` → `tiktok.videoIds`, ajoutez 1 ou 2 IDs de vidéos
   (le nombre à la fin du lien `.../video/7312345678901234567`).
3. **`lib/products.ts`** : remplacez les créations et pagnes d'exemple (noms, prix, catégories).
4. **Photos** : déposez les images dans `public/images/` et ajoutez `image: "/images/nom.jpg"`
   sur l'article. Sans `image`, un motif de pagne est affiché.
5. **Vidéos des créations** : déposez un MP4 dans `public/videos/` et ajoutez
   `video: "/videos/nom.mp4"` sur l'article. La vidéo démarre seule, sans son, en boucle,
   et la photo `image` sert d'aperçu pendant le chargement.
6. **Carrousel d'accueil** : `lib/site.ts` → `heroSlides` (image, texte, cadrage).
7. **Vidéo sous le carrousel** : déposez `public/videos/hero.mp4` (réglable dans
   `lib/site.ts` → `showcaseVideo`). Sans fichier, la section n'apparaît pas.

Conseils vidéo : MP4 (H.264), 5 à 15 secondes, moins de 5 Mo par vidéo (les visiteurs
sont souvent sur données mobiles). Exemple de compression :
`ffmpeg -i source.mov -vf scale=720:-2 -an -c:v libx264 -crf 28 -movflags +faststart sortie.mp4`

## Comment ça marche sans backend

- Le **panier** est stocké dans le navigateur (localStorage) : `lib/cart.ts`.
- Le bouton **« Envoyer ma commande sur WhatsApp »** ouvre WhatsApp avec le récapitulatif
  (articles, tailles, total, nom, téléphone, mode de réception) déjà écrit.
- Aucun paiement en ligne : M2 Dressing confirme prix et délais par WhatsApp.

## Mise en ligne

Le plus simple : [Vercel](https://vercel.com) (gratuit) — importer le dépôt GitHub, c'est tout.
Toutes les pages sont statiques.

## Évolutions possibles

- Paiement Mobile Money (KKiaPay / FedaPay) quand le besoin se confirme.
- Pages détail produit avec plusieurs photos.
- Petit back-office (Sanity, Supabase…) pour que le styliste gère lui-même le catalogue.

## Crédits des visuels d'exemple

Photos et vidéo libres de droits, utilisables gratuitement, y compris pour un usage commercial
(aucune attribution n'est obligatoire, mais elle est appréciée). À remplacer par vos propres
créations dès que possible.

- Photos (dossier `public/images/stock/`) : [Pexels](https://www.pexels.com/license/),
  photos n° 6109557, 34550150, 36445251, 36690235, 37283607, 31485660, 35100573,
  34821107, 37340989, 37331114, 9310866, 39972783, 35677043,
  et pour les tissus et catégories : 30805244, 30971566, 18359544, 30698866, 7629856,
  7676883, 13049903, 6276042, 19504690, 33968170, 33853777, 37884301,
  et pour les créations Femme, Enfant et Famille : 34625881, 11048042, 35714343, 29607147,
  31838344, 19275028
  (voir `https://www.pexels.com/photo/<numéro>/`).
- Vidéo `public/videos/atelier-couture.mp4` : [Mixkit](https://mixkit.co/license/#videoFree),
  vidéo n° 34239 « Man sewing a garment on a sewing machine », recadrée en vertical.
