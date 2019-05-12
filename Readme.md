# Pricing sample

Introduction to architect design for standard Node.JS application

# Overall

![alt text](https://i.imgur.com/3mwgXEw.png)

Normal http request will go into Express.js and going through Routes, routes will pass that request to controller, and controller will handle http request. Normally, data validation, header, JWT token transformation will happened here.

The controller will pass that clean input into our internal system boundary, through service layer, where we will process input, mutate state in system, and response according to business requirement.

# Architect Definitions

### Connections

All long-lived connections to external party will be defined in folder "Connections". Now we have MongoDb and Sentry.

### Routes

The routes is where we define http route definitions of our whole system.

So if you ever wonder what kind of http endpoints do we have, always look in routes file.

### Controller

Controller is interface between HTTP protocol and our system. Controller is the first touch for REST API. It will validate input, combine JSON input with user session, send those data to services to perform business model.

This means that in service level, we do not have to care about authorization, security and input validation. We can assume in service level that input is already validated.

Also, controller in the future may handle logic related to web connection and request, such as rate limiting, circuit breaker, etc. Controller **must** not know anything about business.

### Services

Services is the layer which contain business flow. You can view services as a business logics integrator. Service will integrate data layer and other business logics, and every other components to create a valuable business use-case.

Examples: It will know about what type of data needed to execute business command, what kind of account can do what, and what type of response do we need to provide back to the users, what type of data needed to be logged in our system.

However, service do not know how to query or save any data. Services will completely on Data for internal data, and Provider for any 3rd party data.

### Data

Data is the state management module. Data will do the data operation. It will know how to talk with SQL, Redis, NoSQL, etc. It will know how shall we cache the data. It will know how query language work for different data store technologies stack.

This also mean we can connect to multiple data store as long as we have Data build on top of it. Data's consumer should not care what type of data store Data use, or what type of caching strategy did Data do.

### Domain

Domain are business logic functions. Every business knowledge and questions such as "How to apply coupon?", "Is this can be called Out of stock"?, "Is this promotion coupon still valid?" will be implemented as `applyCoupon`, `containStock`

Generally, this means that name every logic (comparison, data transformation) in term that make sense from business domain perspective, and put named functions insdie domain layer as much as possible. This would help fellow developers to look into domain first when they want to compare something, and reduce code duplication.

Common mistake is that it is easy to put bunch of logic in service layer without having a name.

Exmaple:

Bad
```
if (quantity < item.quantity) {
  throw new OutOfStockError()
}
```

Good
```
if (containStock(quantity, item.quantity)) {
  throw new OutOfStockError()
}
```

All domain functions must be **pure function** without touching any external system.

### Helper

Helpers are libraries. Should be self-contained and context-free.

Rule of thumb is that we should be able to copy whole helper folder and use in other Repo that do something completely different from pricing without any confusion.

Any business-context dependent function will not be classified as "Helper".

# Glossary

### Pure function

Pure function is function that do not have side-effect. Given same input, return same output. Pure functions does not connect with any external system. It just do some comparison or data processing.

You can look into it more [here](https://medium.freecodecamp.org/what-is-a-pure-function-in-javascript-acb887375dfe)

Main benefit of pure functions is that pure functions can be used any where. It is fully reuse able without any requirement of setting up.
