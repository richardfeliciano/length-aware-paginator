# length-aware-paginator

[![npm version](https://badge.fury.io/js/length-aware-paginator.svg)](https://badge.fury.io/js/length-aware-paginator)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/brunowerneck/length-aware-paginator/blob/master/README.md)

A Node.js Paginator for collections based on Laravel Illuminate LengthAwarePaginator class.

## Usage

First, install the package using npm:

```bash
npm install length-aware-paginator --save
```

Then, require the package and use it like so:

```js
import LengthAwarePaginator from 'length-aware-paginator'

let Paginator = new LengthAwarePaginator(collection)
```    

Refer to the file `src/js/example.js` for more usage examples, or run `npm run test` in the root folder for a demonstration.

## License

MIT

Copyright (c) 2017 Bruno Vaula Werneck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.