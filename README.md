# :globe_with_meridians: Product Management System

### [Setup](#rocket-setup) • [Technologies](#gear-technologies) • [Endpoints](#door-endpoints) • [Schemas](#bricks-schemas) • [Screenshots](#camera_flash-screenshots) • [Author](#star2-author)

## :information_source: About The App

Fullstack application developed for a simple product management system. The app offers the registration of new products and the listing of existing ones as the main functionality, and also provides all CRUD (Create, Read, Update, Delete) basic methods. It also has an automatic promotional pricing of products according to their category, following the table below:

|    Category    |  Discount (%) | 
|----------------|:-------------:|
| Smartphones    | 2.55          |
| Furniture      | 3             |
| Electronics    | 4.3           |
| Appliances     | 5             |
| Refrigerators  | 7.5           |

Built using [TypeScript](https://www.typescriptlang.org/), the application has a **backend** powered by [Node](https://nodejs.org/en) and [NestJS](https://nestjs.com/), and employs [SQLite](https://www.sqlite.org/) for data storage. It also counts with [GraphQL](https://graphql.org/) for queries. The **frontend**, on the other hand, is constructed using [React](https://react.dev/) and [MaterialUI](https://mui.com/), ensuring a great user experience with a simple and intuitive interface, along with a fast **API communication** provided by [Axios](https://axios-http.com/).

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
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## :door: Endpoints

### GraphQL Embedded Playground
|       Route         |    Method    |                   Description                    |                                                                         
|   ---------------   | :----------: |  ----------------------------------------------  |                                                                           
|  `/graphql`         |    GET      |  Queries   | 
|  `/graphql`         |    POST      |  Mutations   | 

### Products Endpoints
|       Route         |    Method    |                   Description                    |                                                                         
|   ---------------   | :----------: |  ----------------------------------------------  |                                                                           
|  `/products`        |    POST      |  Creates a new product                           | 
|  `/products`        |    GET       |  Gets all products                               |   
|  `/products/:id`    |    GET       |  Gets a specific product by its ID               |   
|  `/products/:id`    |    PUT       |  Updates a specific product by its ID            |                                                        
|  `/products/:id`    |    DELETE    |  Deletes a specific product by its ID            |                 

## :bricks: Schemas

### Product Entity
|    FieldName   |    Type   | Required |
|----------------|:---------:|:--------:|
| `id`           | Number    |   true   |
| `name`         | String    |   true   |
| `description`  | String    |   true   |
| `color`        | String    |   true   |
| `category`     | String    |   true   |
| `price`        | Number    |   true   |
| `promoPrice`   | Number    |   true   |

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

## :star2: Author
| <img src="https://avatars.githubusercontent.com/camilafbarcellos" width=115>
|--
| <a href="https://github.com/camilafbarcellos">Camila Barcellos</a>

<p align="right">
    <a href="#globe_with_meridians-product-management-system">↑ Back to top</a>
</p>
