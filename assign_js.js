// assign_js.js file

var xHRObject = false;
if (window.XMLHttpRequest)
{
xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function validate_booking_reference_number() {
	var booking_reference_number = document.getElementById("booking_reference_number").value;
	
	if(booking_reference_number == "") {
		document.getElementById("booking_reference_number_error").innerHTML = "Empty! Please fill.";
		return false;
    } else if(!booking_reference_number.match(/^\d+$/)) {	
		document.getElementById("booking_reference_number_error").innerHTML = "Please enter number.";
		return false;
	} else {
		document.getElementById("booking_reference_number_error").innerHTML = "";
		return true;
	}
}

// call back function 
function getData() {
    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
        var serverResponse = xHRObject.responseText;
        var spantag = document.getElementById("targetDiv");
		spantag.innerHTML = "";

        if (serverResponse != null) {
			if (serverResponse == "Succeed") {
				spantag.innerHTML += "The booking request ";
				spantag.innerHTML += document.getElementById("booking_reference_number").value;
				spantag.innerHTML += " has been properly assigned.";
			} else {
				spantag.innerHTML += "The booking request ";
				spantag.innerHTML += document.getElementById("booking_reference_number").value;
				spantag.innerHTML += " is invalid.";
			}
        }
    }
}

var valid = true;
function assignTaxi(data) {
	validate_booking_reference_number();
	
    var booking_reference_number = document.getElementById("booking_reference_number").value;
    var requestBody = "booking_reference_number=" + encodeURIComponent(booking_reference_number) + "&value=" + Number(new Date);

	if(xHRObject && valid) {
		xHRObject.open("POST", data, true);
		xHRObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xHRObject.onreadystatechange = getData;
		xHRObject.send(requestBody);
	}
}