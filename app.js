var searchBox = document.querySelector(".query");
var button = document.querySelector(".search-btn");
var contents = document.querySelector(".contents");
var form = document.getElementById('myform');


searchBox.addEventListener('focus', function(event) {
    searchBox.style.borderColor = "goldenrod";
    button.classList.add("move-inside");
    // console.log(searchBox);
});

searchBox.addEventListener('blur', function(event) {
    searchBox.style.border = "4px solid rgba(0,0,0,.4)";
    if (this.value == "") {
        button.classList.remove("move-inside");
    } else {
        searchBox.style.borderColor = "goldenrod";
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var searchItem = searchBox.value;
    contents.innerHTML = "";
    getEntries(searchItem);
});

function getEntries(Searchquery) {

    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        // headers: {
        //     'Api-User-Agent': 'c.bestmann@hotmail.com',
        //     "Accept": "application/json; charset=utf-8",
        //     "Content-Type": "application/javascript; charset=utf-8",
        //     "Access-Control-Allow-Origin": "*"
        // },
        // jsonpCallback: "displaySearch",
        data: {
            "action": "opensearch",
            "format": "json",
            "search": Searchquery,
            "namespace": "0",
            limit: "15",
            profile: "normal"
        },
        success: function(data) {
            data = data.filter(function (val, i, arr) {
                return (typeof val === "object");
            });

            for (var i = 0; i < data[0].length; i++) {

                var article = document.createElement('article');
                var h2 = document.createElement("h2");
                var para = document.createElement("p");
                var link = document.createElement("a");

                article.classList.add("article");
                para.classList.add("description");
                h2.innerText = data[0][i];

                para.innerText = ( !data[1][i] ) ? "No description to Display" : data[1][i];
                link.href = data[2][i];
                link.setAttribute("target","_blank");

                link.appendChild(h2);
                link.appendChild(para);
                article.appendChild(link);
                article.classList.add("animated");
                article.classList.add( (i%2) ? "slideInLeft" : "slideInRight");

                contents.appendChild(article);
                // console.log(article);
            }
        }
    });

}
