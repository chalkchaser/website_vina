var jsondata = null
var products
readJson()






// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}




function readJson() {
    $.ajax({
        url: "produktdata.json",
        //force to handle it as text
        dataType: "text",
        success: function (data) {

            jsondata = $.parseJSON(data);
            //now json variable contains data in json format
            //Now you can get your data like json.name, json.object
            products = jsondata["Produkte"]
            groups = jsondata["Gruppen"]
            build(products)
            generateHyperlinks(groups)
        }
    });

}

function generateHyperlinks(data) {
    var obj = data
    jQuery.each(data, function (key1, value) { //loop over groups
        var divelement = document.createElement('div')
        $(divelement).attr("id", key1)
        document.getElementById("hyperlinks").append(divelement)
        var element = document.createElement('button');//adds button for groups

        $(element).attr("onclick", "clicked(" + JSON.stringify(key1) + ")") //add click functionality
        element.innerHTML = key1

        document.getElementById(key1).append(element)


        jQuery.each(value, function (key2, value2) {//sublinks
            jQuery.each(value2, function (key3, value3) {

                var element2 = document.createElement('button')
                $(element2).attr("class", "button " + key1 + " sub")
                //$(element2).attr("display","none")//hides subgroups
                $(element2).attr("onclick", "clicked(" + JSON.stringify(value3) + ")")
                element2.innerHTML = value3

                document.getElementById(key1).append(element2)
                $(element2).hide()


            })
        })
    })

}

function clicked(key) {


    build(products, key)
    $("." + key).show()//reveals correlating buttons
}

function build(data, g1) {
    var obj = data
    var group = g1
    $(".button").hide()
    document.getElementById("itemdisplay").innerText = ""
    jQuery.each(data, function (key1, value) {
        items = document.getElementById("itemdisplay")
        single_item = document.createElement("li")
        single_item.className = "flex_item"
        if (value.G1 === group || value.G2 === group || g1 === undefined) {

            //ADD IMAGE
            var productImageDivider = document.createElement("div")
            productImageDivider.className = "productImages"
            var newPicture = document.createElement("img")

            $(newPicture).attr("src", "images/" + key1 + ".jpg")
            $(newPicture).attr("id", "img"+ key1)
            //$("#img"+key1).wrap("<a href='images/0000.jpg'></a>");


            productImageDivider.appendChild(newPicture)//adds a container for images resizing

            single_item.appendChild(productImageDivider)
            items.appendChild(single_item)
            addModal("img"+ key1);
            //IMAGE ADD FINISHED

            var nummer = document.createElement('div');
            nummer.innerHTML += "nr: " + key1;

            var name = document.createElement('div');
            name.innerHTML += value.Name;

            var preis = document.createElement('div');
            preis.innerHTML += "Preis: " + value.Preis + "€";

            var ve = document.createElement('div');
            ve.innerHTML += "VE: " + value.VE;

            var beschreibung = document.createElement('div');
            beschreibung.innerHTML += " " + value.Beschreibung;

            single_item.appendChild(nummer)
            single_item.appendChild(name)
            single_item.appendChild(preis)

            single_item.appendChild(ve)
            single_item.appendChild(beschreibung)

            if (g1 !== undefined) {
                document.getElementById("currentlocation").innerHTML = g1
            } else {
                document.getElementById("currentlocation").innerHTML = "Alle"
            }

        }


    });


}

function addModal(imgid){
    var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById(imgid);

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;

    }
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

}

