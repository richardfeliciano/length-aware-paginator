var collection = [];

for (var i = 1; i <= 30; i++) {
    collection.push({"id": i, "name": "John Doe " + i});
}

import LengthAwarePaginator from "./main";

var Paginator = new LengthAwarePaginator(collection);


console.log(Paginator);

console.info("Total entries: " + Paginator.total());
console.info("Last Page: " + Paginator.lastPage());
console.info("From: " + Paginator.from());
console.info("To: " + Paginator.to());

for (var i = 1; i <= Paginator.lastPage(); i++) {
    console.info("-------------------------------")
    console.info("Page " + Paginator.currentPage)
    console.info("From " + Paginator.from() + " to " + Paginator.to())
    console.info("Items: ", Paginator.items())
    Paginator.navigate(i + 1);
}

Paginator.searchString = "28"

console.log("\nSearchString", Paginator.searchString)
console.log("SearchResults", Paginator.searchResults())

