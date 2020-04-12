# Survivors Back-End

## Setup
Before building the back-end, you need to create a .env file containing the following information:
```
MONGODB_URL=<url-to-your-mongodb>
JWT_KEY=<your-jwt-key>
PORT=3001
```

After that you can build with:
```bash
docker build -t hack-corona-survivors .
```

And run it with
```bash
docker run --name hack-corona-survivors --env-file ./.env -p 3001:3001 -d hack-corona-survivors
```
