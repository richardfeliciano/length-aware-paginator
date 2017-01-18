let collection = [];

for (let i = 1; i <= 30; i++) {
    collection.push({"id": i, "name": "John Doe " + i})
}

let LengthAwarePaginator = require("./main"),
    Paginator = new LengthAwarePaginator(collection);


console.log(Paginator);

console.info("Total entries: " + Paginator.total());
console.info("Last Page: " + Paginator.lastPage());
console.info("From: " + Paginator.from());
console.info("To: " + Paginator.to());

for (let i = 1; i <= Paginator.lastPage(); i++) {
    console.info("-------------------------------")
    console.info("Page " + Paginator.currentPage)
    console.info("From " + Paginator.from() + " to " + Paginator.to())
    console.info("Items: ", Paginator.items())
    Paginator.navigate(i + 1);
}