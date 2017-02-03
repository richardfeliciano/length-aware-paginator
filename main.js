(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    /**
     * Length Aware Paginator Constructor
     *
     * @param data Collection to iterate
     */
    function _class() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, _class);

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


    _createClass(_class, [{
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

    return _class;
}();

exports.default = _class;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNDSTs7Ozs7QUFLQSxzQkFBdUI7QUFBQSxZQUFYLElBQVcsdUVBQUosRUFBSTs7QUFBQTs7QUFDbkIsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBO0FBQ0EsYUFBSyxPQUFMLEdBQWUsQ0FBZjtBQUNBO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLENBQW5CO0FBQ0E7QUFDQSxhQUFLLFdBQUwsR0FBbUIsTUFBbkI7QUFDQTtBQUNBLGFBQUssWUFBTCxHQUFvQixFQUFwQjtBQUNBO0FBQ0EsYUFBSyxJQUFMLEdBQVksS0FBSyxXQUFqQjtBQUNIOztBQUVEOzs7Ozs7Ozs7Z0NBS1EsSSxFQUFNO0FBQ1YsaUJBQUssSUFBTCxHQUFZLElBQVo7QUFDSDs7QUFFRDs7Ozs7Ozs7Z0NBS1E7QUFDSixtQkFBTyxLQUFLLElBQUwsR0FBWSxLQUFLLElBQUwsQ0FBVSxNQUF0QixHQUErQixDQUF0QztBQUNIOztBQUVEOzs7Ozs7OzttQ0FLVztBQUNQLG1CQUFPLFNBQVMsS0FBSyxJQUFMLENBQVUsS0FBSyxLQUFMLEtBQWUsS0FBSyxPQUE5QixDQUFULENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7c0NBS2M7QUFDVixtQkFBTyxLQUFLLFdBQUwsS0FBcUIsQ0FBNUI7QUFDSDs7QUFFRDs7Ozs7Ozs7cUNBS2E7QUFDVCxtQkFBTyxLQUFLLFdBQUwsS0FBcUIsS0FBSyxRQUFMLEVBQTVCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OytCQUtPO0FBQ0gsbUJBQU8sQ0FBQyxLQUFLLFdBQUwsR0FBbUIsQ0FBcEIsSUFBeUIsS0FBSyxPQUE5QixHQUF3QyxDQUEvQztBQUNIOztBQUVEOzs7Ozs7Ozs2QkFLSztBQUNELGdCQUFJLEtBQUssS0FBSyxJQUFMLEtBQWMsS0FBSyxPQUFuQixHQUE2QixDQUF0Qzs7QUFFQSxtQkFBTyxNQUFNLEtBQUssS0FBTCxFQUFOLEdBQXFCLEtBQUssS0FBTCxFQUFyQixHQUFvQyxFQUEzQztBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUTtBQUNKLG1CQUFPLEtBQUssSUFBTCxHQUNELEtBQUssYUFBTCxHQUFxQixLQUFyQixDQUEyQixLQUFLLElBQUwsS0FBYyxDQUF6QyxFQUE0QyxLQUFLLEVBQUwsRUFBNUMsQ0FEQyxHQUVELEVBRk47QUFHSDs7QUFFRDs7Ozs7Ozs7bUNBS1csSSxFQUFNO0FBQ2IsaUJBQUssSUFBTCxHQUFZLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUI7QUFBQSx1QkFBSyxFQUFFLEVBQUYsS0FBUyxLQUFLLEVBQW5CO0FBQUEsYUFBakIsQ0FBWjtBQUNIOztBQUVEOzs7Ozs7Ozt3Q0FLZ0I7QUFBQTs7QUFDWixtQkFBTyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWtCLFVBQUMsSUFBRDtBQUFBLHVCQUFVLEtBQUssTUFBSyxXQUFWLEVBQXVCLFdBQXZCLEdBQXFDLE9BQXJDLENBQy9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixHQUF5QixXQUF6QixFQUQrQixLQUNZLENBRHRCO0FBQUEsYUFBbEIsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7Ozt1Q0FLZTtBQUNYLG1CQUFPLEtBQUssYUFBTCxHQUFxQixNQUFyQixJQUErQixLQUFLLFlBQUwsS0FBc0IsRUFBNUQ7QUFDSDs7QUFFRDs7Ozs7Ozs7NENBS29CO0FBQ2hCLG1CQUFPLEtBQUssYUFBTCxHQUFxQixNQUFyQixLQUFnQyxDQUFoQyxJQUFxQyxLQUFLLFlBQUwsS0FBc0IsRUFBbEU7QUFDSDs7QUFFRDs7Ozs7Ozs7O3lDQU0rQjtBQUFBLGdCQUFoQixLQUFnQix1RUFBUixNQUFROztBQUMzQixpQkFBSyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0g7O0FBRUQ7Ozs7Ozs7O2lDQUtTLEksRUFBTTs7QUFFWCxvQkFBUSxJQUFSO0FBQ0kscUJBQUssT0FBTDtBQUNJLHlCQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQTtBQUNKLHFCQUFLLFVBQUw7QUFDSSx5QkFBSyxXQUFMO0FBQ0E7QUFDSixxQkFBSyxNQUFMO0FBQ0kseUJBQUssV0FBTCxHQUFtQixLQUFLLFFBQUwsRUFBbkI7QUFDQTtBQUNKLHFCQUFLLE1BQUw7QUFDSSx5QkFBSyxXQUFMO0FBQ0E7QUFDSjtBQUNJLHdCQUFJLE9BQU8sU0FBUCxDQUFpQixTQUFTLElBQVQsQ0FBakIsQ0FBSixFQUFzQztBQUNsQyw0QkFBSSxRQUFRLEtBQUssUUFBTCxFQUFaLEVBQTZCO0FBQ3pCLG1DQUFPLEtBQUssUUFBTCxFQUFQO0FBQ0g7QUFDRCw0QkFBSSxRQUFRLENBQVosRUFBZTtBQUNYLG1DQUFPLENBQVA7QUFDSDtBQUNELDZCQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDSCxxQkFSRCxNQVFPO0FBQ0gsNkJBQUssV0FBTCxHQUFtQixDQUFuQjtBQUNIO0FBeEJUO0FBMEJBLGlCQUFLLElBQUwsR0FBWSxLQUFLLFdBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3NDQUtjLE8sRUFBUztBQUNuQixnQkFBSSxZQUFZLENBQWhCLEVBQW1CO0FBQ2YsMEJBQVUsS0FBSyxLQUFMLEVBQVY7QUFDSDs7QUFFRCxpQkFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGdCQUFJLEtBQUssRUFBTCxNQUFhLEtBQUssS0FBTCxFQUFqQixFQUErQixLQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ2xDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIC8qKlxyXG4gICAgICogTGVuZ3RoIEF3YXJlIFBhZ2luYXRvciBDb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhIENvbGxlY3Rpb24gdG8gaXRlcmF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0gW10pIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgLy8gRGVmYXVsdCB0byA1IHBlciBwYWdlXHJcbiAgICAgICAgdGhpcy5wZXJQYWdlID0gNVxyXG4gICAgICAgIC8vIERlZmluZXMgY3VycmVudCBwYWdlXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDFcclxuICAgICAgICAvLyBEZWZpbmVzIFNlYXJjaCBJbmRleFxyXG4gICAgICAgIHRoaXMuc2VhcmNoSW5kZXggPSBcIm5hbWVcIlxyXG4gICAgICAgIC8vIERlZmluZXMgU2VhcmNoIFN0cmluZ1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyaW5nID0gXCJcIlxyXG4gICAgICAgIC8vIFNldHMgcGFnZSB0byBjdXJyZW50IHBhZ2VcclxuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgY3VycmVudCBkYXRhIHNldFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhIENvbGxlY3Rpb24gdG8gaXRlcmF0ZVxyXG4gICAgICovXHJcbiAgICBzZXREYXRhKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2ludH0gVG90YWwgbnVtYmVyIG9mIHJlY29yZHNcclxuICAgICAqL1xyXG4gICAgdG90YWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSA/IHRoaXMuZGF0YS5sZW5ndGggOiAwXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGxhc3QgcGFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7aW50fSBMYXN0IFBhZ2VcclxuICAgICAqL1xyXG4gICAgbGFzdFBhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGguY2VpbCh0aGlzLnRvdGFsKCkgLyB0aGlzLnBlclBhZ2UpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgdGhpcyB0aGUgRmlyc3QgUGFnZT9cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNGaXJzdFBhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2UgPT09IDFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHRoaXMgdGhlIExhc3QgUGFnZT9cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNMYXN0UGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZSA9PT0gdGhpcy5sYXN0UGFnZSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IHRoZSBlbnRyeSBudW1iZXIgaXQgc3RhcnRzIGNvdW50aW5nIHRoZSBjdXJyZW50IHBhZ2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7aW50fVxyXG4gICAgICovXHJcbiAgICBmcm9tKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5wZXJQYWdlICsgMVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvdyB0aGUgZW50cnkgbnVtYmVyIGl0IGVuZHMgY291bnRpbmcgdGhlIGN1cnJlbnQgcGFnZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtpbnR9XHJcbiAgICAgKi9cclxuICAgIHRvKCkge1xyXG4gICAgICAgIGxldCB0byA9IHRoaXMuZnJvbSgpICsgdGhpcy5wZXJQYWdlIC0gMVxyXG5cclxuICAgICAgICByZXR1cm4gdG8gPj0gdGhpcy50b3RhbCgpID8gdGhpcy50b3RhbCgpIDogdG9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBjdXJyZW50IHBhZ2UgaXRlbXNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGl0ZW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFcclxuICAgICAgICAgICAgPyB0aGlzLnNlYXJjaFJlc3VsdHMoKS5zbGljZSh0aGlzLmZyb20oKSAtIDEsIHRoaXMudG8oKSlcclxuICAgICAgICAgICAgOiBbXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGl0ZW0gZnJvbSBjb2xsZWN0aW9uIHVzaW5nIGl0ZW0gSURcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICByZW1vdmVJdGVtKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGkgPT4gaS5pZCAhPT0gaXRlbS5pZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBTZWFyY2ggUmVzdWx0cyBiYXNlZCBvbiB0aGUgU2VhcmNoIFN0cmluZ1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgc2VhcmNoUmVzdWx0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbHRlciggKGl0ZW0pID0+IGl0ZW1bdGhpcy5zZWFyY2hJbmRleF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKFxyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFN0cmluZy50cmltKCkudG9Mb3dlckNhc2UoKSkgPj0gMClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlbGwgaWYgcmVjb3JkcyB3ZXJlIGZvdW5kIGR1cmluZyBzZWFyY2hcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfGJvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHJlY29yZHNGb3VuZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHRzKCkubGVuZ3RoICYmIHRoaXMuc2VhcmNoU3RyaW5nICE9PSBcIlwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxsIGlmIG5vIHJlY29yZHMgd2VyZSBmb3VuZCBkdXJpbmcgc2VhcmNoXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIG5vTWF0Y2hpbmdSZWNvcmRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFJlc3VsdHMoKS5sZW5ndGggPT09IDAgJiYgdGhpcy5zZWFyY2hTdHJpbmcgIT09IFwiXCJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSBTZWFyY2ggSW5kZXguXHJcbiAgICAgKiBEZWZhdWx0cyB0byBcIm5hbWVcIlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbmRleFxyXG4gICAgICovXHJcbiAgICBzZXRTZWFyY2hJbmRleChpbmRleCA9IFwibmFtZVwiKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hJbmRleCA9IGluZGV4XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYXZpZ2F0ZSB0byBwYWdlIG51bWJlciBYXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhZ2VcclxuICAgICAqL1xyXG4gICAgbmF2aWdhdGUocGFnZSkge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHBhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcImZpcnN0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcInByZXZpb3VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLS1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5sYXN0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSsrXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIocGFyc2VJbnQocGFnZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2UgPj0gdGhpcy5sYXN0UGFnZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLmxhc3RQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2UgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgdGhlIG51bWJlciBvZiBpdGVtcyB0byBzaG93IHBlciBwYWdlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBlclBhZ2VcclxuICAgICAqL1xyXG4gICAgY2hhbmdlUGVyUGFnZShwZXJQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBlclBhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgcGVyUGFnZSA9IHRoaXMudG90YWwoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wZXJQYWdlID0gcGVyUGFnZVxyXG4gICAgICAgIGlmICh0aGlzLnRvKCkgPj0gdGhpcy50b3RhbCgpKSB0aGlzLm5hdmlnYXRlKFwibGFzdFwiKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
