# :brain: Apollo Tech Test
<p align="center">Jr Web Developer • FullStack • 2023</p>
<p align="center">
  <img src="https://apollosolutionsdev.com/wp-content/uploads/2022/06/Versoes-do-Logo.png" width="500" height="250"/>
</p>

## :bookmark_tabs: Table of Contents
### [Setup](#rocket-setup) • [Technologies](#gear-technologies) • [Questions](#question-questions) • [Endpoints](#door-endpoints) • [Schemas](#bricks-schemas) • [Screenshots](#camera_flash-screenshots)

## :information_source: About The App

Fullstack application developed for the **[Apollo Solutions Dev](https://apollosolutionsdev.com/)** technical test that implements a simple product management system. The app offers the registration of new products and the listing of existing ones as the main functionality, and also provides all CRUD (Create, Read, Update, Delete) basic methods.

Built using [TypeScript](https://www.typescriptlang.org/), the application has a **backend** powered by [Node](https://nodejs.org/en) and [NestJS](https://nestjs.com/), and employs [SQLite](https://www.sqlite.org/) for data storage. The **frontend**, on the other hand, is constructed using [React](https://react.dev/) and [MaterialUI](https://mui.com/), ensuring a great user experience with a simple and intuitive interface, along with a fast **API communication** provided by [Axios](https://axios-http.com/).

### Features
- **Product management:** Users can read, register, modify, and delete products.
- **Automatic pricing:** The application dynamically calculates promotional prices based on the product category.
    > When a price is changed, the promotional price will be recalculated.
    
    > When the category is changed, the promotional price will be recalculated based on it.
- **Sorting and filtering:** Easily sort and filter the product list to find exactly what you need.

## :rocket: Setup
- Download or clone the repository
- In the project directory, open two terminals and follow the instructions below to setup both back and frontend
    - Both terminals must be active to correctly run the application

### Backend
- In the first terminal, access the backend directory
```
cd backend/
```
- Download all required dependencies
```
npm i
```
- Run the API locally at [localhost:3100](http://localhost:3100)
```
npm start
```

### Frontend
- In the second terminal, access the frontend directory
```
cd frontend/
```
- Download all required dependencies
```
npm i
```
- Run the application locally at [localhost:3000](http://localhost:3000)
```
npm start
```

### SQLite Database
This project operates with an **SQLite database**, offering a simple and straightforward backend setup. There's no need to configure anything manually, as the **API**, constructed using **NestJS** and **TypeORM**, takes care of everything. It automatically generates a `db.sqlite` database file within the backend folder's root directory, which stores all the data managed by the application. If you need to restart the API, the database remains consistent, and it can also be deleted at anytime to a fresh restart along with the API if wanted so.

> **Obs.:* in some Linux environments, it may be necessary to install the `sqlite3` package!

## :gear: Technologies
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## :question: Questions
**1. What would be your first improvements if you had more implementation time?**

I would carefully review and refactor all the code to make it cleaner and more reusable, which would allow me to easily implement the CRUD of new object types in the backend, as well as their registration and visualization screens in the frontend. Having this concrete and functional base, I could adopt other types of databases, such as PostgreSQL or MongoDB, and deploy all parts of the application in order to run it more easily.

**2. Thinking about your solution, how would maintenance be in case of adding new product categories? What would need to be changed?**

In my implementation, the product categories work like `enums`. Therefore, it's easy to add or remove categories by just modifying the [ProductCategory](backend/src/util/ProductCategory.ts) file on the backend and the [productCategory](frontend/src/types/productCategory.ts) file on the frontend. In addition, you would also change the [CategoryDiscounts](backend/src/util/CategoryDiscounts.ts) file in the backend to update the category discount percentages.

**3. What changes would need to be made to support updates in the product category's discount percentage so that whenever the discount percentage was changed, the new price would be reflected in all products of the same category?**

In this case, it would be interesting to create a new entity in the database that represents categories, which allows us to store the discount percentage information. By having two separate entities, we could establish a one-to-many relationship between Product and Category, since each category can have multiple products. Then, when implementing Category endpoints in the API, the update route should check if there has been any change to the discount percentage. If so, it triggers a method to recalculate the promotional price of all products belonging to that category. This can be done by retrieving all products with a specific category through a new `GET` route on the Product endpoints, using a specific method to recalculate the prices, and then sending the modified products to be updated through the Product's `PUT` route.

[↑ Back to top](#brain-apollo-tech-test)

## :door: Endpoints

### Products Endpoints
|       Route         |    Method    |                   Description                    |                                                                         
|   ---------------   | :----------: |  ----------------------------------------------  |                                                                           
|  `/products`        |    POST      |  Creates a new product                           | 
|  `/products`        |    GET       |  Gets all products                               |   
|  `/products/:id`    |    GET       |  Gets a specific product by its ID               |   
|  `/products/:id`    |    PUT       |  Updates a specific product by its ID            |                                                        
|  `/products/:id`    |    DELETE    |  Deletes a specific product by its ID            |                 

## :bricks: Schemas

### User Entity
|    FieldName   |    Type   | Required |
|----------------|:---------:|:--------:|
| `id`           | Number    |   true   |
| `name`         | String    |   true   |
| `description`  | String    |   true   |
| `category`     | String    |   true   |
| `price`        | Number    |   true   |
| `promoPrice`   | Number    |   true   |

[↑ Back to top](#brain-apollo-tech-test)

## :camera_flash: Screenshots
### List page
![List](/github/list-table.png)

- Sorting table by name, category or price

![Order](/github/table-order.gif)

- Filtering by name or category

![Filter](/github/table-filter.gif)

- Modifying a product with automatic price calculator

![Modify](/github/table-modify.gif)

- Removing a product

![Remove](/github/table-remove.gif)

### Register page
![Register](/github/register-form.png)

- Submitting an invalid form

![Invalid](/github/invalid-form.gif)

- Submitting a valid form

![Valid](/github/valid-form.gif)

[↑ Back to top](#brain-apollo-tech-test)
