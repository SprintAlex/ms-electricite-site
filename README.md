# Site vitrine — MS Électricité

Site statique (HTML/CSS/JS pur) pour **MS Électricité**, électricien à Bagnac-sur-Célé (46).
Objectif : générer des demandes de devis. Prévu pour **GitHub Pages**.
Design re-skinné depuis la maquette Abrasive (« Précision & courant » : charbon/acier + accent ambre, Space Grotesk).

## Pages
`index.html` · `prestations.html` · `a-propos.html` · `contact.html` · `mentions-legales.html` · `confidentialite.html`
+ `css/style.css` · `js/main.js` · `assets/` · `robots.txt` · `sitemap.xml` · `.nojekyll`

## 1. Brancher le formulaire (obligatoire pour recevoir les leads)
Web3Forms. Sur https://web3forms.com récupérer l'**Access Key** (gratuit), puis dans `contact.html`
remplacer `value="WEB3FORMS_ACCESS_KEY"` par la clé. C'est tout.

## 2. Remplacer les placeholders photos
Zones « Photo à venir » = textures sombres provisoires. À remplacer par de vraies photos
(tableaux, chantiers, borne IRVE, fourgon) ou des visuels IA. Voir `PROMPTS_IMAGES_IA.md`.
Blocs concernés : `.hero-visual` (index), `.split-visual` (a-propos), `.gph` (galeries).

## 3. À compléter avant prod
- [ ] Clé Web3Forms — sinon 0 lead.
- [ ] Remplacer `https://REMPLACER-DOMAINE` par l'URL réelle (canonical, OG, sitemap, robots, schema).
- [ ] Repasser les pages en `index, follow` (le preview est en `noindex`).
- [ ] **Nom du gérant, forme juridique, SIREN/SIRET, adresse exacte, e-mail** (mentions légales — « MS » = initiales, à confirmer).
- [ ] Horaires réels.
- [ ] Confirmer les prestations réellement proposées (IRVE, domotique… à valider avec le client).

## 4. Déploiement
Repo public GitHub → Settings → Pages → branche `main`, dossier `/`.
Redéployer : `git add -A && git commit -m "..." && git push`.
