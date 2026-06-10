# cloudstore-frontend

Frontend för CloudStore, en e-handelsapplikation byggd som mikrotjänster. Det här är webbgränssnittet där användaren kan registrera sig, logga in, bläddra bland produkter och lägga beställningar. Den pratar med backend-tjänsterna över HTTP.

## Vad appen gör

- Visar produkter på startsidan och i butiken
- Registrering och inloggning av användare
- Kundvagn där man kan lägga till flera produkter
- Skapa beställningar och se sina tidigare beställningar
- Sparar favoriter lokalt i webbläsaren

## Teknik

- React 18
- React Router
- Context API för inloggning, kundvagn och notiser
- Axios för anrop mot backend
- Egen design med sage green-tema och typsnitten Cormorant Garamond och Jost
- Docker och nginx, driftsatt på Render

## Köra lokalt

Appen kan köras tillsammans med backend via docker-compose i huvud-repot:
docker-compose up --build

Frontend nås då på http://localhost:3000.

Vill man köra bara frontend separat under utveckling:
npm install
npm start

## Miljövariabler

Appen behöver veta var backend-tjänsterna finns. Dessa sätts som miljövariabler vid bygget.

| Variabel | Beskrivning |
|----------|-------------|
| `REACT_APP_USER_URL` | Adressen till user-order-service |
| `REACT_APP_PRODUCT_URL` | Adressen till product-service |

Lokalt pekar de mot localhost, i produktion mot de publika backend-adresserna.

## Struktur

- `src/api` innehåller anropen mot backend (auth, produkter, beställningar)
- `src/context` innehåller global state för inloggning, kundvagn och notiser
- `src/components` innehåller återanvändbara komponenter, uppdelade i layout, ui, product, auth och cart
- `src/pages` innehåller sidorna: startsida, butik, beställningar och favoriter

## Drift

Appen byggs och serveras via nginx och är driftsatt på Render, som automatiskt deployar vid varje push till GitHub.

Publik adress: https://cloudstore-frontend.onrender.com
