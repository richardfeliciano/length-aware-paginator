(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _main = require("./main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = [];

for (var i = 1; i <= 30; i++) {
    collection.push({ "id": i, "name": "John Doe " + i });
}

var Paginator = new _main2.default(collection);

console.log(Paginator);

console.info("Total entries: " + Paginator.total());
console.info("Last Page: " + Paginator.lastPage());
console.info("From: " + Paginator.from());
console.info("To: " + Paginator.to());

for (var i = 1; i <= Paginator.lastPage(); i++) {
    console.info("-------------------------------");
    console.info("Page " + Paginator.currentPage);
    console.info("From " + Paginator.from() + " to " + Paginator.to());
    console.info("Items: ", Paginator.items());
    Paginator.navigate(i + 1);
}

Paginator.searchString = "28";

console.log("\nSearchString", Paginator.searchString);
console.log("SearchResults", Paginator.searchResults());

},{"./main":2}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LengthAwarePaginator = function () {
    /**
     * Length Aware Paginator Constructor
     *
     * @param data Collection to iterate
     */
    function LengthAwarePaginator() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, LengthAwarePaginator);

        this.data = data;
        // Default to 5 per page
        this.perPage = 5;
        // Defines current page
        this.currentPage = 1;
        // Defines Search Index
        this.searchIndex = "name";
        // Defines Search String
        this.searchString = "";
        // Sets page to current page
        this.page = this.currentPage;
    }

    /**
     * Change current data set
     *
     * @param data Collection to iterate
     */


    _createClass(LengthAwarePaginator, [{
        key: "setData",
        value: function setData(data) {
            this.data = data;
        }

        /**
         * Return the total number of records in the collection
         *
         * @returns {int} Total number of records
         */

    }, {
        key: "total",
        value: function total() {
            return this.data ? this.data.length : 0;
        }

        /**
         * Return the last page.
         *
         * @returns {int} Last Page
         */

    }, {
        key: "lastPage",
        value: function lastPage() {
            return parseInt(Math.ceil(this.total() / this.perPage));
        }

        /**
         * Is this the First Page?
         *
         * @returns {boolean}
         */

    }, {
        key: "isFirstPage",
        value: function isFirstPage() {
            return this.currentPage === 1;
        }

        /**
         * Is this the Last Page?
         *
         * @returns {boolean}
         */

    }, {
        key: "isLastPage",
        value: function isLastPage() {
            return this.currentPage === this.lastPage();
        }

        /**
         * Show the entry number it starts counting the current page
         *
         * @returns {int}
         */

    }, {
        key: "from",
        value: function from() {
            return (this.currentPage - 1) * this.perPage + 1;
        }

        /**
         * Show the entry number it ends counting the current page
         *
         * @returns {int}
         */

    }, {
        key: "to",
        value: function to() {
            var to = this.from() + this.perPage - 1;

            return to >= this.total() ? this.total() : to;
        }

        /**
         * Get current page items
         *
         * @returns {Array}
         */

    }, {
        key: "items",
        value: function items() {
            return this.data ? this.searchResults().slice(this.from() - 1, this.to()) : [];
        }

        /**
         * Remove item from collection using item ID
         *
         * @param item
         */

    }, {
        key: "removeItem",
        value: function removeItem(item) {
            this.data = this.data.filter(function (i) {
                return i.id !== item.id;
            });
        }

        /**
         * Return Search Results based on the Search String
         *
         * @returns {Array}
         */

    }, {
        key: "searchResults",
        value: function searchResults() {
            var _this = this;

            return this.data.filter(function (item) {
                return item[_this.searchIndex].toLowerCase().indexOf(_this.searchString.trim().toLowerCase()) >= 0;
            });
        }

        /**
         * Tell if records were found during search
         *
         * @returns {Number|boolean}
         */

    }, {
        key: "recordsFound",
        value: function recordsFound() {
            return this.searchResults().length && this.searchString !== "";
        }

        /**
         * Tell if no records were found during search
         *
         * @returns {boolean}
         */

    }, {
        key: "noMatchingRecords",
        value: function noMatchingRecords() {
            return this.searchResults().length === 0 && this.searchString !== "";
        }

        /**
         * Define Search Index.
         * Defaults to "name"
         *
         * @param {string} index
         */

    }, {
        key: "setSearchIndex",
        value: function setSearchIndex() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "name";

            this.searchIndex = index;
        }

        /**
         * Navigate to page number X
         *
         * @param page
         */

    }, {
        key: "navigate",
        value: function navigate(page) {

            switch (page) {
                case "first":
                    this.currentPage = 1;
                    break;
                case "previous":
                    this.currentPage--;
                    break;
                case "last":
                    this.currentPage = this.lastPage();
                    break;
                case "next":
                    this.currentPage++;
                    break;
                default:
                    if (Number.isInteger(parseInt(page))) {
                        if (page >= this.lastPage()) {
                            page = this.lastPage();
                        }
                        if (page <= 0) {
                            page = 1;
                        }
                        this.currentPage = page;
                    } else {
                        this.currentPage = 1;
                    }
            }
            this.page = this.currentPage;
        }

        /**
         * Change the number of items to show per page
         *
         * @param perPage
         */

    }, {
        key: "changePerPage",
        value: function changePerPage(perPage) {
            if (perPage === 0) {
                perPage = this.total();
            }

            this.perPage = perPage;
            if (this.to() >= this.total()) this.navigate("last");
        }
    }]);

    return LengthAwarePaginator;
}();

module.exports = LengthAwarePaginator;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxleGFtcGxlLmpzIiwic3JjXFxqc1xcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDTUE7Ozs7OztBQU5BLElBQUksYUFBYSxFQUFqQjs7QUFFQSxLQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLEtBQUssRUFBckIsRUFBeUIsR0FBekIsRUFBOEI7QUFDMUIsZUFBVyxJQUFYLENBQWdCLEVBQUMsTUFBTSxDQUFQLEVBQVUsUUFBUSxjQUFjLENBQWhDLEVBQWhCO0FBQ0g7O0FBSUQsSUFBSSxZQUFZLG1CQUF5QixVQUF6QixDQUFoQjs7QUFHQSxRQUFRLEdBQVIsQ0FBWSxTQUFaOztBQUVBLFFBQVEsSUFBUixDQUFhLG9CQUFvQixVQUFVLEtBQVYsRUFBakM7QUFDQSxRQUFRLElBQVIsQ0FBYSxnQkFBZ0IsVUFBVSxRQUFWLEVBQTdCO0FBQ0EsUUFBUSxJQUFSLENBQWEsV0FBVyxVQUFVLElBQVYsRUFBeEI7QUFDQSxRQUFRLElBQVIsQ0FBYSxTQUFTLFVBQVUsRUFBVixFQUF0Qjs7QUFFQSxLQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLEtBQUssVUFBVSxRQUFWLEVBQXJCLEVBQTJDLEdBQTNDLEVBQWdEO0FBQzVDLFlBQVEsSUFBUixDQUFhLGlDQUFiO0FBQ0EsWUFBUSxJQUFSLENBQWEsVUFBVSxVQUFVLFdBQWpDO0FBQ0EsWUFBUSxJQUFSLENBQWEsVUFBVSxVQUFVLElBQVYsRUFBVixHQUE2QixNQUE3QixHQUFzQyxVQUFVLEVBQVYsRUFBbkQ7QUFDQSxZQUFRLElBQVIsQ0FBYSxTQUFiLEVBQXdCLFVBQVUsS0FBVixFQUF4QjtBQUNBLGNBQVUsUUFBVixDQUFtQixJQUFJLENBQXZCO0FBQ0g7O0FBRUQsVUFBVSxZQUFWLEdBQXlCLElBQXpCOztBQUVBLFFBQVEsR0FBUixDQUFZLGdCQUFaLEVBQThCLFVBQVUsWUFBeEM7QUFDQSxRQUFR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SyxRQUFMLEVBQW5CO0FBQ0E7QUFDSixxQkFBSyxNQUFMO0FBQ0kseUJBQUssV0FBTDtBQUNBO0FBQ0o7QUFDSSx3QkFBSSxPQUFPLFNBQVAsQ0FBaUIsU0FBUyxJQUFULENBQWpCLENBQUosRUFBc0M7QUFDbEMsNEJBQUksUUFBUSxLQUFLLFFBQUwsRUFBWixFQUE2QjtBQUN6QixtQ0FBTyxLQUFLLFFBQUwsRUFBUDtBQUNIO0FBQ0QsNEJBQUksUUFBUSxDQUFaLEVBQWU7QUFDWCxtQ0FBTyxDQUFQO0FBQ0g7QUFDRCw2QkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0gscUJBUkQsTUFRTztBQUNILDZCQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDtBQXhCVDtBQTBCQSxpQkFBSyxJQUFMLEdBQVksS0FBSyxXQUFqQjtBQUNIOztBQUVEOzs7Ozs7OztzQ0FLYyxPLEVBQVM7QUFDbkIsZ0JBQUksWUFBWSxDQUFoQixFQUFtQjtBQUNmLDBCQUFVLEtBQUssS0FBTCxFQUFWO0FBQ0g7O0FBRUQsaUJBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxnQkFBSSxLQUFLLEVBQUwsTUFBYSxLQUFLLEtBQUwsRUFBakIsRUFBK0IsS0FBSyxRQUFMLENBQWMsTUFBZDtBQUNsQzs7Ozs7O0FBR0wsT0FBTyxPQUFQLEdBQWlCLG9CQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY29sbGVjdGlvbiA9IFtdO1xyXG5cclxuZm9yICh2YXIgaSA9IDE7IGkgPD0gMzA7IGkrKykge1xyXG4gICAgY29sbGVjdGlvbi5wdXNoKHtcImlkXCI6IGksIFwibmFtZVwiOiBcIkpvaG4gRG9lIFwiICsgaX0pO1xyXG59XHJcblxyXG5pbXBvcnQgTGVuZ3RoQXdhcmVQYWdpbmF0b3IgZnJvbSBcIi4vbWFpblwiO1xyXG5cclxudmFyIFBhZ2luYXRvciA9IG5ldyBMZW5ndGhBd2FyZVBhZ2luYXRvcihjb2xsZWN0aW9uKTtcclxuXHJcblxyXG5jb25zb2xlLmxvZyhQYWdpbmF0b3IpO1xyXG5cclxuY29uc29sZS5pbmZvKFwiVG90YWwgZW50cmllczogXCIgKyBQYWdpbmF0b3IudG90YWwoKSk7XHJcbmNvbnNvbGUuaW5mbyhcIkxhc3QgUGFnZTogXCIgKyBQYWdpbmF0b3IubGFzdFBhZ2UoKSk7XHJcbmNvbnNvbGUuaW5mbyhcIkZyb206IFwiICsgUGFnaW5hdG9yLmZyb20oKSk7XHJcbmNvbnNvbGUuaW5mbyhcIlRvOiBcIiArIFBhZ2luYXRvci50bygpKTtcclxuXHJcbmZvciAodmFyIGkgPSAxOyBpIDw9IFBhZ2luYXRvci5sYXN0UGFnZSgpOyBpKyspIHtcclxuICAgIGNvbnNvbGUuaW5mbyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIilcclxuICAgIGNvbnNvbGUuaW5mbyhcIlBhZ2UgXCIgKyBQYWdpbmF0b3IuY3VycmVudFBhZ2UpXHJcbiAgICBjb25zb2xlLmluZm8oXCJGcm9tIFwiICsgUGFnaW5hdG9yLmZyb20oKSArIFwiIHRvIFwiICsgUGFnaW5hdG9yLnRvKCkpXHJcbiAgICBjb25zb2xlLmluZm8oXCJJdGVtczogXCIsIFBhZ2luYXRvci5pdGVtcygpKVxyXG4gICAgUGFnaW5hdG9yLm5hdmlnYXRlKGkgKyAxKTtcclxufVxyXG5cclxuUGFnaW5hdG9yLnNlYXJjaFN0cmluZyA9IFwiMjhcIlxyXG5cclxuY29uc29sZS5sb2coXCJcXG5TZWFyY2hTdHJpbmdcIiwgUGFnaW5hdG9yLnNlYXJjaFN0cmluZylcclxuY29uc29sZS5sb2coXCJTZWFyY2hSZXN1bHRzXCIsIFBhZ2luYXRvci5zZWFyY2hSZXN1bHRzKCkpXHJcblxyXG4iLCJjbGFzcyBMZW5ndGhBd2FyZVBhZ2luYXRvciB7XHJcbiAgICAvKipcclxuICAgICAqIExlbmd0aCBBd2FyZSBQYWdpbmF0b3IgQ29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBDb2xsZWN0aW9uIHRvIGl0ZXJhdGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICAgIC8vIERlZmF1bHQgdG8gNSBwZXIgcGFnZVxyXG4gICAgICAgIHRoaXMucGVyUGFnZSA9IDVcclxuICAgICAgICAvLyBEZWZpbmVzIGN1cnJlbnQgcGFnZVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxXHJcbiAgICAgICAgLy8gRGVmaW5lcyBTZWFyY2ggSW5kZXhcclxuICAgICAgICB0aGlzLnNlYXJjaEluZGV4ID0gXCJuYW1lXCJcclxuICAgICAgICAvLyBEZWZpbmVzIFNlYXJjaCBTdHJpbmdcclxuICAgICAgICB0aGlzLnNlYXJjaFN0cmluZyA9IFwiXCJcclxuICAgICAgICAvLyBTZXRzIHBhZ2UgdG8gY3VycmVudCBwYWdlXHJcbiAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5jdXJyZW50UGFnZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIGN1cnJlbnQgZGF0YSBzZXRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBDb2xsZWN0aW9uIHRvIGl0ZXJhdGVcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVjb3JkcyBpbiB0aGUgY29sbGVjdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtpbnR9IFRvdGFsIG51bWJlciBvZiByZWNvcmRzXHJcbiAgICAgKi9cclxuICAgIHRvdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgPyB0aGlzLmRhdGEubGVuZ3RoIDogMFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBsYXN0IHBhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2ludH0gTGFzdCBQYWdlXHJcbiAgICAgKi9cclxuICAgIGxhc3RQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLmNlaWwodGhpcy50b3RhbCgpIC8gdGhpcy5wZXJQYWdlKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoaXMgdGhlIEZpcnN0IFBhZ2U/XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzRmlyc3RQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlID09PSAxXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB0aGlzIHRoZSBMYXN0IFBhZ2U/XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzTGFzdFBhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UgPT09IHRoaXMubGFzdFBhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgZW50cnkgbnVtYmVyIGl0IHN0YXJ0cyBjb3VudGluZyB0aGUgY3VycmVudCBwYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2ludH1cclxuICAgICAqL1xyXG4gICAgZnJvbSgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMucGVyUGFnZSArIDFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgdGhlIGVudHJ5IG51bWJlciBpdCBlbmRzIGNvdW50aW5nIHRoZSBjdXJyZW50IHBhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7aW50fVxyXG4gICAgICovXHJcbiAgICB0bygpIHtcclxuICAgICAgICBsZXQgdG8gPSB0aGlzLmZyb20oKSArIHRoaXMucGVyUGFnZSAtIDFcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvID49IHRoaXMudG90YWwoKSA/IHRoaXMudG90YWwoKSA6IHRvXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgY3VycmVudCBwYWdlIGl0ZW1zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBpdGVtcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhXHJcbiAgICAgICAgICAgID8gdGhpcy5zZWFyY2hSZXN1bHRzKCkuc2xpY2UodGhpcy5mcm9tKCkgLSAxLCB0aGlzLnRvKCkpXHJcbiAgICAgICAgICAgIDogW11cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBpdGVtIGZyb20gY29sbGVjdGlvbiB1c2luZyBpdGVtIElEXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihpID0+IGkuaWQgIT09IGl0ZW0uaWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gU2VhcmNoIFJlc3VsdHMgYmFzZWQgb24gdGhlIFNlYXJjaCBTdHJpbmdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHNlYXJjaFJlc3VsdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiBpdGVtW3RoaXMuc2VhcmNoSW5kZXhdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTdHJpbmcudHJpbSgpLnRvTG93ZXJDYXNlKCkpID49IDApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxsIGlmIHJlY29yZHMgd2VyZSBmb3VuZCBkdXJpbmcgc2VhcmNoXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge051bWJlcnxib29sZWFufVxyXG4gICAgICovXHJcbiAgICByZWNvcmRzRm91bmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoUmVzdWx0cygpLmxlbmd0aCAmJiB0aGlzLnNlYXJjaFN0cmluZyAhPT0gXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVsbCBpZiBubyByZWNvcmRzIHdlcmUgZm91bmQgZHVyaW5nIHNlYXJjaFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBub01hdGNoaW5nUmVjb3JkcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHRzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuc2VhcmNoU3RyaW5nICE9PSBcIlwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgU2VhcmNoIEluZGV4LlxyXG4gICAgICogRGVmYXVsdHMgdG8gXCJuYW1lXCJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5kZXhcclxuICAgICAqL1xyXG4gICAgc2V0U2VhcmNoSW5kZXgoaW5kZXggPSBcIm5hbWVcIikge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoSW5kZXggPSBpbmRleFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmF2aWdhdGUgdG8gcGFnZSBudW1iZXIgWFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYWdlXHJcbiAgICAgKi9cclxuICAgIG5hdmlnYXRlKHBhZ2UpIHtcclxuXHJcbiAgICAgICAgc3dpdGNoIChwYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmaXJzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDFcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2aW91c1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZS0tXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMubGFzdFBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UrK1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlSW50KHBhZ2UpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlID49IHRoaXMubGFzdFBhZ2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlID0gdGhpcy5sYXN0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5jdXJyZW50UGFnZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSBudW1iZXIgb2YgaXRlbXMgdG8gc2hvdyBwZXIgcGFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwZXJQYWdlXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVBlclBhZ2UocGVyUGFnZSkge1xyXG4gICAgICAgIGlmIChwZXJQYWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBlclBhZ2UgPSB0aGlzLnRvdGFsKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGVyUGFnZSA9IHBlclBhZ2VcclxuICAgICAgICBpZiAodGhpcy50bygpID49IHRoaXMudG90YWwoKSkgdGhpcy5uYXZpZ2F0ZShcImxhc3RcIilcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMZW5ndGhBd2FyZVBhZ2luYXRvclxyXG4iXX0=
