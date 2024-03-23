# Assistant de mobilité à Montpellier
Dois-je prendre le vélo aujourd'hui ? L'interface indique si un vélo est disponible et qu'il fait beau pour le prendre.

## Utilisation du projet
Il peut être lié à un assistant personnel pour prévoir l'heure de réveil d'une personne en fonction de l'utilisation du vélo ou non.

## Lancer le projet 
Lancer la commande *npm run dev* dans le terminal.

## Données utilisées
- Disponiblité des vélos en libre service de la métropole de Montpellier. [https://portail-api-data.montpellier3m.fr/bikestation](https://portail-api-data.montpellier3m.fr/bikestation)
- Météo en temps réelle disponible sur Weatherapi.
- Service Openrouter qui utilise le modèle Mistral AI.

## Récupération des clés API
- API_METEO_KEY : Créer un compte sur [https://www.weatherapi.com/](https://www.weatherapi.com/) et générer une clé API.
- OPENROUTER_API_KEY : Créer un compte sur [https://openrouter.ai/](https://openrouter.ai/) et générer une clé API.
Intégrer ensuite ces clés API dans un fichier environnement.

## Contributions
Thomas Ayrivié et Dina El Hijjawi, étudiants à l'Université Paul Valéry.
Un spécial remerciement à Hugo et Thomas ayant apporté l'enseignement d'Intégration de données connectées.

## Statut du Projet
API et DevWeb : En développement.