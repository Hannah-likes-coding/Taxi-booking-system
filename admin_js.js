// admin_js.js file
// author: Hannah

var xHRObject = false;
if (window.XMLHttpRequest)
{
xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

var tBody = document.createElement("TBODY");

function displayBooking() {
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
        var serverResponse = xHRObject.responseXML;
		
		if(serverResponse != null) {
			var theTable = document.getElementById("table");
			//IE requires rows to be added to a tBody element
	        //IE automatically creates a tBody element - delete it and then manually create
			var header = serverResponse.getElementsByTagName("booking");	     
			if (theTable.firstChild != null){
				var badIEBody = theTable.childNodes[0];  
				theTable.removeChild(badIEBody);
			}			
			theTable.appendChild(tBody);
			tBody.innerHTML = "";

			var newRow = document.createElement("tr");
			var c1 = document.createElement("th");
			var v1 = document.createTextNode("Booking reference number");
			c1.appendChild(v1);
			newRow.appendChild(c1);
			
			var c2 = document.createElement("th");
			var v2 = document.createTextNode("Customer name");
			c2.appendChild(v2);
			newRow.appendChild(c2);
			
			var c3 = document.createElement("th");
			var v3 = document.createTextNode("Contact phone");
			c3.appendChild(v3);
			newRow.appendChild(c3);
			
			var c4 = document.createElement("th");
			var v4 = document.createTextNode("Pick-up suburb");
			c4.appendChild(v4);
			newRow.appendChild(c4);
			
			var c5 = document.createElement("th");
			var v5 = document.createTextNode("Destination suburb");
			c5.appendChild(v5);
			newRow.appendChild(c5);
			
			var c6 = document.createElement("th");
			var v6 = document.createTextNode("Pick-up date/time");
			c6.appendChild(v6);
			newRow.appendChild(c6);
			
			tBody.appendChild(newRow);
			
			for(var i = 0; i < header.length; i++) {
				var newRow2 = document.createElement("tr");
				
				if (window.ActiveXObject) {
					for(var k = 0; k < header[i].childNodes.length; k++) {
						var c = document.createElement("td");
						var v = document.createTextNode(header[i].childNodes[k].text);
						c.appendChild(v);
						newRow2.appendChild(c);
					}
                } else {
                    for(var k = 0; k < header[i].childNodes.length; k++) {
						var c = document.createElement("td");
						var v = document.createTextNode(header[i].childNodes[k].textContent);
						c.appendChild(v);
						newRow2.appendChild(c);
					}
                }
				tBody.appendChild(newRow2);
			}
		}
    }
}

function showBooking(data) {
    xHRObject.open("GET", data, true);
	xHRObject.onreadystatechange = displayBooking;
    xHRObject.send(tBody);
}