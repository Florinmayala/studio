# Festiva AI - Célébrations d'Anniversaire Intelligentes

Ce projet est une application de carte d'anniversaire interactive propulsée par Next.js et Genkit.

## 🚀 Comment Déployer

Pour mettre votre site en ligne, nous utilisons **Firebase App Hosting**.

### Étapes de déploiement :

1. **Hébergement du code** : 
   Poussez l'intégralité de ce projet sur un dépôt **GitHub**.

2. **Configuration Firebase** :
   - Allez sur la [Console Firebase](https://console.firebase.google.com/).
   - Sélectionnez votre projet.
   - Dans le menu de gauche, allez dans **Build > App Hosting**.
   - Cliquez sur **Get Started** (Commencer).

3. **Connexion GitHub** :
   - Connectez votre compte GitHub à Firebase.
   - Sélectionnez le dépôt que vous venez de créer.
   - Suivez les instructions pour créer le "Backend".

4. **Variables d'environnement (Important)** :
   - Une fois le backend créé, allez dans ses paramètres dans la console Firebase.
   - Ajoutez la clé secrète `GOOGLE_GENAI_API_KEY` pour que l'IA fonctionne en production.

5. **Déploiement automatique** :
   À chaque fois que vous ferez un `git push` sur votre branche principale, Firebase redéploiera automatiquement votre site.

## 📸 Personnalisation de l'image

Pour changer la photo de Blessing :
1. Placez votre fichier image (ex: `IMG_1292.JPG`) dans le dossier `/public`.
2. Vérifiez que le nom du fichier dans `src/lib/placeholder-images.json` correspond exactement au nom de votre fichier.
