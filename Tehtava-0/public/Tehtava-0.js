var browser = new XMLHttpRequest()

browser.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.responseText) {
        console.log(this.responseText);
        console.log(this.status);
        
        const data = JSON.parse(this.responseText);
        console.log(data)

        var ul = document.createElement("ul");
        ul.setAttribute("class", "notes")

        data.forEach(function(note) {
            var li = document.createElement("li");

            ul.appendChild(li);
            li.appendChild(document.createTextNode(note.content));
        })

        document.getElementById("notes").appendChild(ul);
    }
}

browser.open("GET", "Tehtava-0.json", true);
browser.send()

