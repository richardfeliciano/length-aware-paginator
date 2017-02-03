module.exports = class LengthAwarePaginator {
    /**
     * Length Aware Paginator Constructor
     *
     * @param data Collection to iterate
     */
    constructor(data = []) {
        this.data = data
        // Default to 5 per page
        this.perPage = 5
        // Defines current page
        this.currentPage = 1
        // Defines Search Index
        this.searchIndex = "name"
        // Defines Search String
        this.searchString = ""
        // Sets page to current page
        this.page = this.currentPage
    }

    /**
     * Change current data set
     *
     * @param data Collection to iterate
     */
    setData(data) {
        this.data = data
    }

    /**
     * Return the total number of records in the collection
     *
     * @returns {int} Total number of records
     */
    total() {
        return this.data ? this.data.length : 0
    }

    /**
     * Return the last page.
     *
     * @returns {int} Last Page
     */
    lastPage() {
        return parseInt(Math.ceil(this.total() / this.perPage))
    }

    /**
     * Is this the First Page?
     *
     * @returns {boolean}
     */
    isFirstPage() {
        return this.currentPage === 1
    }

    /**
     * Is this the Last Page?
     *
     * @returns {boolean}
     */
    isLastPage() {
        return this.currentPage === this.lastPage()
    }

    /**
     * Show the entry number it starts counting the current page
     *
     * @returns {int}
     */
    from() {
        return (this.currentPage - 1) * this.perPage + 1
    }

    /**
     * Show the entry number it ends counting the current page
     *
     * @returns {int}
     */
    to() {
        let to = this.from() + this.perPage - 1

        return to >= this.total() ? this.total() : to
    }

    /**
     * Get current page items
     *
     * @returns {Array}
     */
    items() {
        return this.data
            ? this.searchResults().slice(this.from() - 1, this.to())
            : []
    }

    /**
     * Remove item from collection using item ID
     *
     * @param item
     */
    removeItem(item) {
        this.data = this.data.filter(i => i.id !== item.id)
    }

    /**
     * Return Search Results based on the Search String
     *
     * @returns {Array}
     */
    searchResults() {
        return this.data.filter( (item) => item[this.searchIndex].toLowerCase().indexOf(
            this.searchString.trim().toLowerCase()) >= 0)
    }

    /**
     * Tell if records were found during search
     *
     * @returns {Number|boolean}
     */
    recordsFound() {
        return this.searchResults().length && this.searchString !== ""
    }

    /**
     * Tell if no records were found during search
     *
     * @returns {boolean}
     */
    noMatchingRecords() {
        return this.searchResults().length === 0 && this.searchString !== ""
    }

    /**
     * Define Search Index.
     * Defaults to "name"
     *
     * @param {string} index
     */
    setSearchIndex(index = "name") {
        this.searchIndex = index
    }

    /**
     * Navigate to page number X
     *
     * @param page
     */
    navigate(page) {

        switch (page) {
            case "first":
                this.currentPage = 1
                break
            case "previous":
                this.currentPage--
                break
            case "last":
                this.currentPage = this.lastPage()
                break
            case "next":
                this.currentPage++
                break
            default:
                if (Number.isInteger(parseInt(page))) {
                    if (page >= this.lastPage()) {
                        page = this.lastPage()
                    }
                    if (page <= 0) {
                        page = 1
                    }
                    this.currentPage = page
                } else {
                    this.currentPage = 1
                }
        }
        this.page = this.currentPage
    }

    /**
     * Change the number of items to show per page
     *
     * @param perPage
     */
    changePerPage(perPage) {
        if (perPage === 0) {
            perPage = this.total()
        }

        this.perPage = perPage
        if (this.to() >= this.total()) this.navigate("last")
    }
}
