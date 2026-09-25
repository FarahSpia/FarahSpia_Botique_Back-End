## installing project packages:
first : `npm install` (once for installing packages node_modules & ...)

## runing project :
 *npm run dev* (for development with nodemon)
 *npm start* (for running without nodemon)
 
## for database :

*1. generate prisma client :*

`npx prisma generate`

model User{
  id String @id @default(uuid())
  userName String
  email String @unique
  password String 
  role  Role @default(user)
  images UserImage[]
  favorites Favorite[]

}

after you write model you must run this order to database add this model :

you must run this order:

`npx prisma migrate dev --name User` *(for adding all model in one order write init rather than name of the model)*

if you change code of prisma you must run this order:
`npx prisma generate`
