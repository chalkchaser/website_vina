
    var jsondata = null
    var products
    readJson()




    function readJson(){
    $.ajax({
        url: "produktdata.json",
        //force to handle it as text
        dataType: "text",
        success: function(data) {

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

    function generateHyperlinks(data){
    var obj = data
        jQuery.each(data, function (key1, value){
            var divelement = document.createElement('div')
            $(divelement).attr("id", key1)
            document.getElementById("hyperlinks").append(divelement)
            var element = document.createElement('button');

            $(element).attr("onclick", "clicked("+ JSON.stringify(key1)+ ")")
            element.innerHTML = key1

            document.getElementById(key1).append(element)


            jQuery.each(value, function (key2, value2){//sublinks
                var element2 = document.createElement('button')
                $(element2).attr("class" ,"button "+ key1)
                //$(element2).attr("display","none")//hides subgroups
                $(element2).attr("onclick", "clicked("+ JSON.stringify(value2)+ ")")
                element2.innerHTML = value2

                document.getElementById(key1).append(element2)
                $(element2).hide()
            })

        })

}

    function clicked(key) {
       // alert((key))
        $(".button").hide() //hides all other buttons first

        build(products, key)
        $("."+key).show()//reveals correlating buttons
    }

    function build(data,g1){
    var obj = data
    var group = g1
    document.getElementById("itemdisplay").innerText = ""
    jQuery.each(data, function(key1,value){
    items = document.getElementById("itemdisplay")

    if(value.G1 === group ||value.G2 === group || g1 === undefined) {
    var nummer = document.createElement('div');
    nummer.innerHTML += "nr: " + key1;

    var name = document.createElement('div');
    name.innerHTML += value.Name;

    var ve = document.createElement('div');
    ve.innerHTML += "VE: " + value.VE;

    var beschreibung = document.createElement('div');
    beschreibung.innerHTML += " " + value.Beschreibung;

    items.appendChild(nummer)
    items.appendChild(name)
    items.appendChild(ve)
    items.appendChild(beschreibung)
    var newPicture = document.createElement("img")

    $(newPicture).attr("src", "images/" + key1 + ".jpg")
    //$("#img"+key1).wrap("<a href='images/0000.jpg'></a>");

    items.appendChild(newPicture)
}


});




}
