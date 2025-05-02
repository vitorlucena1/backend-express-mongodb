curl --request POST \
  --url 'https://backend-express-mongodb-two.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "email": "newuser@example",
    "password": "securepassword"
    }'