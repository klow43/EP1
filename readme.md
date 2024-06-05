
# Noroff Back-end Development Year 1
## EP - Course Assignment Karen Beate Røstvik Høiskar aka klow43
<br>

### .env file variables
<hr/>
ADMIN_USERNAME<br>
ADMIN_PASSWORD<br>
DATABASE_NAME<br>
DIALECT<br>
DIALECTMODEL<br>
TOKEN_SECRET<br>
COOKIE_SECRET<br>
ADMIN_USER_PASSWORD<br>
-this variable is needed for testing user login<br>
--------<br>
PORT<br>
HOST<br>
<br>

### Packages/Dependencies and versions : 
<hr/>
node : 18.16.0<br>

axios : 1.6.8<br>
bcrypt : 5.1.1<br>
bootstrap : 5.3.3<br>
bootstrap-icons : 1.11.3<br>
cookie-parser : 1.4.4<br>
debug : 2.6.9<br>
dotenv : 16.4.5<br>
ejs : 3.1.10<br>
express : 4.19.2<br>
http-errors : 1.6.3<br>
jest : 29.7.0<br>
jsonwebtoken : 9.0.2<br>
morgan : 1.9.1<br>
mysql : 2.18.1<br>
mysql2 : 3.9.4<br>
randomstring : 1.3.0<br>
sequelize : 6.37.3<br>
supertest : 6.3.4<br>
swagger-autogen : 2.23.7<br>
swagger-ui-express : 5.0.0<br>


### Installation and usage of app :
<hr/>
Setup a .env file for variables needed to run this app.(see above .env variables)<br>
run "npm i" in terminal to download all packages required to run this application.<br>
when all packages are downloaded, run "npm start" to launch app.<br>
use a POST request to endpoint "your url here" /init to populate database with initial data. <br>


### Swagger
To run swagger documentation run "npm run swagger" in terminal, app will automatically run<br>
NOTICE!! using /doc remember to put "Bearer " in front of token for endpoints requiring authentication!! <br>
-notice no quotationmarks in example, space after Bearer <br>
Example : <br>
Bearer token <br>

### Testing
Running tests: <br>
-Do not run npm test alone, as requirements set category name to "TEST_CATEGORY" in both category and product test<br>

To run user login test, in terminal : <br>
npm test user.test<br>

To run CRUD on category test, in terminal  :<br>
npm test category.test<br>

To run CRUD on products test, in terminal : <br>
npm test product.test<br>
-test on products with only softdelete product, test_category = restrict<br>
run 'npm productcleanup.test' to delete TEST_PRODUCT and TEST_CATEGORY from product.test run.


### References :

manipulating array to get only unique values :<br>
- [...new Set(data.map(item => item.group))]<br>
https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript

specificly work with signed cookies to avoid using JWT token (security issue) in frontend:<br>
- Create/access signed cookie<br>
https://stackoverflow.com/questions/11897965/what-are-signed-cookies-in-connect-expressjs

Documentation comparing axios vs fetch<br>
https://apidog.com/blog/axios-vs-fetch/#error-handling-axios-vs-fetch

Update multiple records through service file with .update : <br>
 - [Op.in] : [] (OrderServices, update all orders with OrderId, cannot bulkUpdate with update) <br>
https://stackoverflow.com/questions/49643047/update-multiple-rows-in-sequelize-with-different-conditions

Trigger hooks when bulkUpdate(normally ignore if not specified individualHooks : true)<br>
https://github.com/sequelize/sequelize/issues/4501

Stop endpoint after error statuscode sendt (return) :<br> 
https://github.com/sequelize/sequelize/issues/4501

Models index.js file : <br>
Noroff 

Sequelize documentation : v6 and v7<br>
Notes from school, Noroff.