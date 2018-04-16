# Feathers.js

## Requirements
- Node >= 8.0.0
- Install via nvm:
```
nvm install lts/carbon
```

## Prerequisites knowledge

### [ES6](http://es6-features.org/) - Arrow function, template literals, shorthand object property, object destructuring

### Node module system
- Mỗi file được xem như một module. VD, có thư mục:
```sh
module
├── circle.js
└── foo.js
```

```js
// foo.js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```
=> `foo.js` load module `circle.js` nằm trong cùng thư mục với `foo.js`

```js
// circle.js
const { PI } = Math; // Extract PI from Math.PI

exports.area = (r) => PI * (r ** 2);
```

Module `circle.js` export ra function `area()` bằng cách thêm thuộc tính vào object `exports` (một [object đặc biệt trong Node](https://nodejs.org/api/globals.html#globals_global_objects)).

Các variable khác trong module sẽ là private nếu không export.

Ngoài cách gán thuộc tính cho object `exports` chúng ta còn có thể gán một giá trị mới cho object `module.exports` (giá trị là có thể là function hoặc object) để export ra bên ngoài.
VD:
```js
// square.js
module.exports = class Square {
    constructor(width) {
        this.width = width;
    }

    area() {
        return this.width ** 2;
    }
};
```

```js
// foo.js
const Square = require('./square.js');
const mySquare = new Square(2);
console.log(`The area of mySquare is ${mySquare.area()}`);
```
- Node.js module khác ES6 module
  + Node.js module implement theo CommonJS spec
  + ES6 hay ES2015 là spec dành cho browser (ES6 module hay được sử dụng trong react với Babel)

### Promises
- [Reference](https://www.promisejs.org/)
- Async / Await: [1](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8), [2](https://blog.risingstack.com/mastering-async-await-in-nodejs/)
- Services:
  + Define service:
  ```
  class MyService {
    async find(params) {
      return [];
    }
    async get(id, params) {}
    async create(data, params) {}
    async update(id, data, params) {}
    async patch(id, data, params) {}
    async remove(id, params) {}
  }
  ```
  + Methods:
    + `find` - Find all data (potentially matching a query)
    + `get` - Get a single data entry by its unique identifier
    + `create` - Create new data
    + `update` - Update an existing data entry by completely replacing it
    + `patch` - Update one or more data entries by merging with the new data
    + `remove` - Remove one or more existing data entries

    The parameters for service methods are:

    + id - The unique identifier for the data
    + data - The data sent by the user (for creating and updating)
    + params (optional) - Additional parameters, for example the authenticated user or the query

  + Register service: `app.use('service_name', new MyService())`
  + Some method: `create`, `update`, `patch`, `remove` auto expose an event `created`, `updated`, `patched` or `removed`
