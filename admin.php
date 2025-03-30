<?php
session_start();
header('Content-Type: text/xml');
?>
<?php
    // sql info or use include 'file.inc'
    require_once('../../conf/sqlinfo.inc.php');
	
	// The @ operator suppresses the display of any error messages
	// mysqli_connect returns false if connection failed, otherwise a connection value
	$conn = @mysqli_connect($sql_host,
		$sql_user,
		$sql_pass,
		$sql_db
	);
    $sql_tbl = "cabsonline";
   
	// Checks if connection is successful
	if (!$conn) {
		// Displays an error message, avoid using die() or exit() as this terminates the execution
		// of the PHP script
	} else {
		//echo "<p>Database succeed</p>";
		$query = "SELECT * FROM  $sql_tbl WHERE pickup_time > NOW() AND pickup_time < NOW() + INTERVAL 2 HOUR AND booking_status = 'unassigned'";
	    
		// executes the query
		$result = @mysqli_query($conn, $query);
			
		// checks if the execution was successful
		if (!$result) {
			echo "<p>Something is wrong with ",	$query, "</p>";
		} else {
				// successful query operation, and return information
			echo (toXML($result));
		}
		
		// close the database connection
		mysqli_close($conn);
	 // if successful database connection
	}
	
// Construct XML to return to the client
function toXML($result) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

	$row = mysqli_fetch_assoc($result);
	
	while ($row) {
		$booking = $doc->createElement('booking');
		$bookings->appendChild($booking);
		
		$booking_reference_number = $doc->createElement('booking_reference_number');
		$booking->appendChild($booking_reference_number);
		$value1 = $doc->createTextNode($row["booking_reference_number"]);
		$booking_reference_number->appendChild($value1);
	
		$customer_name = $doc->createElement('customer_name');
		$booking->appendChild($customer_name);
		$value2 = $doc->createTextNode($row["customer_name"]);
		$customer_name->appendChild($value2);
	
		$contact_phone = $doc->createElement('contact_phone');
		$booking->appendChild($contact_phone);
		$value3 = $doc->createTextNode($row["contact_phone"]);
		$contact_phone->appendChild($value3);
	
		$pickup_suburb = $doc->createElement('pickup_suburb');
		$booking->appendChild($pickup_suburb);
		$value4 = $doc->createTextNode($row["pickup_suburb"]);
		$pickup_suburb->appendChild($value4);
	
		$destination_suburb = $doc->createElement('destination_suburb');
		$booking->appendChild($destination_suburb);
		$value5 = $doc->createTextNode($row["destination_suburb"]);
		$destination_suburb->appendChild($value5);
	
		$pickup_time = $doc->createElement('pickup_time');
		$booking->appendChild($pickup_time);
		$value6 = $doc->createTextNode($row["pickup_time"]);
		$pickup_time->appendChild($value6);
		
		$row = mysqli_fetch_assoc($result);
	}

    $strXml = $doc->saveXML();

    echo $strXml;
}
?>	