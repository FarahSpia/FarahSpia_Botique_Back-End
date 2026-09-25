## E-commerce FarahSpia-Clothing-botique (database:sqlite,no UI,with postman collection)

## resource of Database

--User
   |
   |  id : String @id @default(uuid())
   |  userName : String (contain fname or lname of the User)
   |  email : String (...@gmail.com)
   |  password : String 
   |  role : String ("user","admin") default : user
   |  images : Array (UserImage[]) --relation
   |  favorites : Array (Product[]) --relation
   ----------------------------------

--Product
   |
   |  id : String @id @default(uuid())
   |  title : String (text that contain name and brand of the product )
   |  description : String (text that contain specifications of the product)
   |  create_at : String (iso Date)
   |  price : Number (Integer)
   |  stock : Number (Integer)
   |  images : Array (ProductImage[])
   |  categories : Array (Category[])
   |  
   |
   ---------------------------------------

--UserImage
   |
   |  id : Int  @id @default(autoincrement())
   |  url : String 
   |  user_id : String (id of the User)
   |  user : object (User) --relation
   |  

--ProductImage
   |
   |  id : Int  @id @default(autoincrement())
   |  url : String 
   |  product_id : String (id of the Product)
   |  product : object (product) --relation
   |     
   ------------------------------------------

--Category
   |
   | id: Int  @id @default(autoincrement())
   | name : String
   | products : Array (Product[]) --relation
   |

--Favorite
   |
   | id : Int  @id @default(autoincrement())
   | user_id : String (id of the User)
   | product_id : String (id of the Product)
   | products : Array (Product[]) --relation


## project_structure :

|-controller (Logic)
|  |
|  |_user_Controller.js 
|  |_product_Controller.js 
|  |_image_Controller.js
|  |_category_Controller.js
|
|-data (database folder)
|  |
|  |_data.db
|
|-middleware
|   |
|   |_auth.js
|   |_error_Handling.js
|
|-prisma
|   |
|   |_schema.prsima (for adding resource model in database (user,product,...))
|    
|-routes (api`s route)
|  |
|  |_user_route.js 
|  |_product_route.js 
|  |_category_route.js
| 
| 
|
|-uploads
|  |
|  |__user
|  |    |_(images:png,jpg)
|  |
|  |__product
|        |_(images:png,jpg)
|
|-util
|   |
|   |_image.util.js (for saving image)
|   |_prisma.util.js 
|   |_hash.util.js
|   |_token.util.js
|
|-validation
|   |
|   |_user_Validate.js
|   |_product_Validate.js
|   |_category_Validate.js
|
|
|_app.js (main file for running server)



## api structure : 

--- document in Postman ---


## Technologies  
- **Express.js**  
- **Prisma + SQLite**  
      |_version:**npm i prisma@7.10.0 @prisma/client@7.10.0 @prisma/adapter-better-sqlite3**
                **npx  prisma init --datasource-provider sqlite --output ../prisma/generated**
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **Multer** for file uploads  
- **express-validator** for input validation  
- **dotenv**, **nodemon**  
