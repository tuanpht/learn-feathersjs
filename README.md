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
