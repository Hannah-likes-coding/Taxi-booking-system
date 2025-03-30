//js file: send request and validate user input
//<!--  author: Hannah   -->


var xHRObject = false;
if (window.XMLHttpRequest)
{
xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function getData() {
    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
        var serverResponse = xHRObject.responseXML;
        var spantag = document.getElementById("targetDiv");

        if (serverResponse != null) {
            var header = serverResponse.getElementsByTagName("booking");
            spantag.innerHTML = "";

            for (var i = 0; i < header.length; i++) {
                if (window.ActiveXObject) {
						spantag.innerHTML += "Thank you! Your booking reference number is ";
						spantag.innerHTML += header[i].firstChild.text;
						spantag.innerHTML += ". You will be picked up in front of your provided address at ";
						spantag.innerHTML += header[i].childNodes[8].text.substr(-5);
						spantag.innerHTML += " on ";
						spantag.innerHTML += header[i].childNodes[8].text.substr(0,10);
                } else {
                        spantag.innerHTML += "Thank you! Your booking reference number is ";
						spantag.innerHTML += header[i].firstChild.textContent;
						spantag.innerHTML += ". You will be picked up in front of your provided address at ";
						spantag.innerHTML += header[i].childNodes[8].textContent.substr(-5);
						spantag.innerHTML += " on ";
						spantag.innerHTML += header[i].childNodes[8].textContent.substr(0,10);
                }
            }
        }
    }
}

// call-back function
function sendRequest(data) {
    var customer_name = document.getElementById("customer_name").value;
    var contact_phone = document.getElementById("contact_phone").value;
    var pickup_unit_number = document.getElementById("pickup_unit_number").value;
    var pickup_street_number = document.getElementById("pickup_street_number").value;
    var pickup_street_name = document.getElementById("pickup_street_name").value;
    var pickup_suburb = document.getElementById("pickup_suburb").value;
    var destination_suburb = document.getElementById("destination_suburb").value;
    var pickup_time = document.getElementById("pickup_time").value;

    var requestBody = "customer_name=" + encodeURIComponent(customer_name) + "&contact_phone=" + encodeURIComponent(contact_phone) + "&pickup_unit_number=" + encodeURIComponent(pickup_unit_number) + "&pickup_street_number=" + encodeURIComponent(pickup_street_number) + "&pickup_street_name=" + encodeURIComponent(pickup_street_name) + "&pickup_suburb=" + encodeURIComponent(pickup_suburb) + "&destination_suburb=" + encodeURIComponent(destination_suburb) + "&pickup_time=" + encodeURIComponent(pickup_time) + "&value=" + Number(new Date);

	if(xHRObject) {
		xHRObject.open("POST", data, true);
		xHRObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xHRObject.onreadystatechange = getData;
		xHRObject.send(requestBody);
	}
}

// validate input
function validate_customer_name() {
	var customer_name = document.getElementById("customer_name").value;
	
	if(customer_name == "") {
		document.getElementById("customer_name_error").innerHTML = " Empty! Please fill.";
		return false;
    } else {
		document.getElementById("customer_name_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_contact_phone() {
	var contact_phone = document.getElementById("contact_phone").value;
	
	if(contact_phone == "") {
		document.getElementById("contact_phone_error").innerHTML = " Empty! Please fill.";
		return false;
    } else if(!contact_phone.match(/^\d+$/)){
		document.getElementById("contact_phone_error").innerHTML = " Please only use numbers.";
		return false;
	} else {
		document.getElementById("contact_phone_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_pickup_street_number() {
	var pickup_street_number = document.getElementById("pickup_street_number").value;
	
	if(pickup_street_number == "") {
		document.getElementById("pickup_street_number_error").innerHTML = " Empty! Please fill.";
		return false;
    } else {
		document.getElementById("pickup_street_number_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_pickup_street_name() {
	var pickup_street_name = document.getElementById("pickup_street_name").value;
	
	if(pickup_street_name == "") {
		document.getElementById("pickup_street_name_error").innerHTML = " Empty! Please fill.";
		return false;
    } else {
		document.getElementById("pickup_street_name_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_pickup_suburb() {
	var pickup_suburb = document.getElementById("pickup_suburb").value;
	
	if(pickup_suburb == "") {
		document.getElementById("pickup_suburb_error").innerHTML = " Empty! Please fill.";
		return false;
    } else {
		document.getElementById("pickup_suburb_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_destination_suburb() {
	var destination_suburb = document.getElementById("destination_suburb").value;
	
	if(destination_suburb == "") {
		document.getElementById("destination_suburb_error").innerHTML = " Empty! Please fill.";
		return false;
    } else {
		document.getElementById("destination_suburb_error").innerHTML = " Completed field!";
		return true;
	}
}

function validate_pickup_time() {
	var pickup_time = document.getElementById("pickup_time").value;
	var pickup_time_object = new Date(pickup_time);
	var current_time_object = new Date();
	
	if(pickup_time == "") {
		document.getElementById("pickup_time_error").innerHTML = " Imcompleted! Please fill.";
		return false;
    } else if(pickup_time_object < current_time_object) {
		document.getElementById("pickup_time_error").innerHTML = " The pick-up time must be no earlier than current time.";
		return false;
	} else {
		document.getElementById("pickup_time_error").innerHTML = " Completed field!";
		return true;
	}
}

function book_a_taxi() {
	var valid = true;
	valid = valid && validate_customer_name();
	valid = valid && validate_contact_phone();
	valid = valid && validate_pickup_street_number();
	valid = valid && validate_pickup_street_name();
	valid = valid && validate_pickup_suburb();
	valid = valid && validate_destination_suburb();
	valid = valid && validate_pickup_time();
	
	if(valid) {
		sendRequest('booking.php');
		document.getElementById("customer_name_error").innerHTML = "";
		document.getElementById("contact_phone_error").innerHTML = "";
		document.getElementById("pickup_street_number_error").innerHTML = "";
		document.getElementById("pickup_street_name_error").innerHTML = "";
		document.getElementById("pickup_suburb_error").innerHTML = "";
		document.getElementById("destination_suburb_error").innerHTML = "";
		document.getElementById("pickup_time_error").innerHTML = "";
	}
}