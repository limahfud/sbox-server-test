# Sayurbox Test Backend
This project is made to complete pre-employment skill testing from sayurbox

The implementation that I choose is using NodeJS as a server side scripting.

This project doesn't use any database management system. The data provided by
variable on javascript file. 

To run this project simply do this following step:
```
1. Make sure you had installed NodeJS on your computer
2. Run command : node index.js
3. App will run on port 8080
```

There are two endpoint on this project.

### 1. Select Endpoint 
URL : `/select`

Query : 

`customerId` (string)

`items` ( json formed string )

Example :
```
localhost:8080/select?customerId=theCustomerId&items={"item1":1, "item2":3}
```
On the example above, the customerId is `theCustomerId` and items is represented by this following json 

```
{
  "item1": 1, 
  "item2": 3 
}
```
Response :

the response will be presented as json string, and field `success` determine the process is success or not, if request is success the response should be like this
```
{
  "success": true,
  "message": "Success! Items successfully selected"
}
```
or if process is failed the output should be like this
```
{
  "success": false,
  "message": "Sorry! Items you selected is out of stock"
}
```

### 2. Order Endpoint 
URL : `/order`

Query : 

`customerId` (string)

`items` ( json formed string )

Example :
```
localhost:8080/order?customerId=theCustomerId&items={"apple":2, "mango":1}
```
On the example above, the customerId is `theCustomerId` and items is represented by this following json 

```
{
  "apple": 1, 
  "mango": 3 
}
```

Response :

the response will be presented as json string, and field `success` determine the process is success or not, if request is success the response should be like this
```
{
  "success": true,
  "message": "Success! Your order will be processed"
}
```
or if process is failed the output should be like this
```
{
  "success": false,
  "message": "Sorry! The item is out of stock'"
}
```



