# Parking Lot API (AWS Lambda & Serverless framework)
Parking lot API consists of two microservices:
- Service Tickets.
- Service Payments.

## API Documentation
API Documentation can be found in `openapi.yml` files inside service-xxx/v1 folders.

## How to run locally
1) Checkout master branch.
2) Start up the database and run migrations using `make start`
3) Run `npm install` in both service-tickets/v1 and service-payments/v1 folders.
4) Run `npm start` in both service-tickets/v1 and service-payments/v1 folders.
5) In folder service-tickets/v1 run `npm run sns`.

## To Do
- Get 100% unit test code coverage in both services.
