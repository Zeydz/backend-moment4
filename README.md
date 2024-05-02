# API-projekt README

## Beskrivning
Det här API-projektet är en backend-applikation för att hantera användarautentisering och autentisering via JSON Web Tokens (JWT). Det tillåter användare att registrera sig, logga in och få åtkomst till skyddade resurser efter autentisering.

## Installation
1. Klona projektet från GitHub-repositoriet.
2. Navigera till rotkatalogen för projektet.
3. Kör `npm install` för att installera alla nödvändiga paket och beroenden.
4. Skapa en fil med namnet `.env` i rotkatalogen och konfigurera miljövariabler enligt instruktionerna i `.env.example`-filen.

## Användning
1. Starta servern genom att köra kommandot `npm start`.
2. Använd ett API-testverktyg som Thunderclient eller använd JavaScript Fetch API för att göra förfrågningar till API:et.
3. Registrera en användare med en POST-förfrågan till `/api/register` och skicka användarnamn och lösenord som JSON-data.
4. Logga in med en POST-förfrågan till `/api/login` och skicka användarnamn och lösenord som JSON-data i förfrågningskroppen. Ett JWT kommer att returneras om autentiseringen lyckas.
5. Använd det returnerade JWT för att autentisera efterföljande begäranden till skyddade resurser genom att inkludera det som ett Bearer-token i Authorization-headern.

## API-rutter
- `/api/register`: POST-förfrågan för att registrera en ny användare.
- `/api/login`: POST-förfrågan för att logga in och få en JWT.
- `/api/check-auth`: GET-förfrågan till en skyddad resurs som kräver giltig JWT-autentisering.

## Miljövariabler
- `PORT`: Porten som servern ska lyssna på.
- `DATABASE`: Adress till MongoDB-databasen.
- `JWT_SECRET_KEY`: Hemlig nyckel för att signera och verifiera JWT.

  
[Webbplats](https://friendly-zuccutto-5b42bc.netlify.app/)
