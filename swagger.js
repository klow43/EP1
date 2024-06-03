const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info : {
        version : '1.0.0',
        title : 'EP1 Exam',
        description : 'documentation for Noroff EP - e-commerce'
    },
    host : 'localhost:3000',
    components : {
        securitySchemes : {
            bearerAuth : {
        type : "token",
        in : 'header',
        scheme : "bearer",
        bearerFormat : "JWT"
    }
        }
    },

    definitions : {

        login : { $name : "email or username", $password : 'YouS@feP@ssw0rd' },
        register : {
            $firstName : 'Shoresy',
            $lastName : 'Waffles',
            $email : 'shoresy69@sudbluebulldogs.com',
            $password : 'sodum',
            $phone : 69,
            $userName : 'neverLoose',
            $address : 'The ice rank 69'
        },

        postbrand : { $brands : 'Ontario sportswear' },
        alterbrand : { $id :  1, $brands : 'Ontario sportswear' },
        delete : { $id : 2 },

        addtocart : { $productid : 1, $quantity : 2, $unitPrice : 49.99 },
        altercart : { $productid : 1, $quantity : 1 },
        deletecart : { $productid : 1 },

        postcategory : { $categories : 'Hockey jerseys'},
        altercategory : { $categories : 'Hockey jerseys', $id : 69 },

        postmembership : {
            $membership : 'NOSHO',
            $minItems : 69,
            $maxItems : 100,
            $discount : 60
        },
        altermembership : {
            $id : 1,
            $membership : 'NOSHO',
            $minItems : 69,
            $maxItems : 100,
            $discount : 60
        },

        alterorder : { $orderid : 'HX6TQ123', $statusid : 1 },
        deleteorder : { $orderid : 'HX6TQ123'},

        postproduct : { 
            $name : 'Season tickets',
            $description : 'Hockey tickets for the NOSHO season',
            $price : 499.00,
            $quantity : 20,
            $imgurl : 'https://i0.wp.com/puckjunk.com/wp-content/uploads/2024/05/Shoresy-Poster.jpg?ssl=1'
        },
        alterproduct : {
            $id : 1,
            $name : 'Season tickets',
            $description : 'Hockey tickets for the NOSHO season',
            $price : 499.00,
            $quantity : 20,
            $imgurl : 'https://i0.wp.com/puckjunk.com/wp-content/uploads/2024/05/Shoresy-Poster.jpg?ssl=1'
        },

        search : { $type : 'brand', $item : 'Ontario sportswear' },

        alteruser : {
            $id : 2,
            $firstName : 'Shoresy',
            $lastName : 'Waffles',
            $phone : 69,
            $userName : 'neverLoose',
            $address : 'The ice rank 69',
        },

        usermembership : {
            $userid : 2,
            $membershipid : 2
        },

        userrole : {
            $userid : 2,
            $roleid : 1
        }

    }
};

const outputFile = './swagger-output.json';
const route = ['./app.js'];

swaggerAutogen(outputFile, route, doc).then(() => {
    require('./bin/www')
})