curl --request POST \
  --url 'https://backend-express-mongodb-two.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser2",
    "email":"newuser@example2.com",
    "password": "securepassword123"
    }'