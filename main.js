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