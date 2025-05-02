curl --request POST \
  --url 'https://backend-express-mongodb-two.vercel.app/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "password": "securepassword123"
    }'