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
   
	// Checks if connection is successful
	if (!$conn) {
		// Displays an error message, avoid using die() or exit() as this terminates the execution
		// of the PHP script
		echo "<p>Database connection failure</p>";
	} else {
	    //echo "<p> Sucessful</p>";
		// Upon successful connection
		
		// Get data from the form if needed
		$customer_name = $_POST['customer_name'];
        $contact_phone = $_POST['contact_phone'];
        $pickup_unit_number = $_POST['pickup_unit_number'];
        $pickup_street_number = $_POST['pickup_street_number'];
        $pickup_street_name = $_POST['pickup_street_name'];
        $pickup_suburb = $_POST['pickup_suburb'];
        $destination_suburb = $_POST['destination_suburb'];
        $pickup_time = $_POST['pickup_time'];
		$booking_time = date("Y-m-d H:i:s");

	    do{
		    $booking_reference_number = rand(000000, 999999);
		    $query_by_booking_reference_number = "SELECT * FROM $sql_tbl WHERE booking_reference_number = '$booking_reference_number'";
		    $query_by_booking_reference_number_result = @mysqli_query($conn, $query_by_booking_reference_number);
	    } while(@mysqli_num_rows($query_by_booking_reference_number_result) != 0);
		
	    // a initial booking status 'unassigned'
	    $booking_status = "unassigned";
	
	    $sql_tbl = "cabsonline";
	    // Set up the SQL command to add the data into the table
	    $query = "INSERT INTO $sql_tbl"
            . "(customer_name, contact_phone, pickup_unit_number, pickup_street_number, pickup_street_name, pickup_suburb, destination_suburb, pickup_time, booking_reference_number, booking_time, booking_status)VALUES"
            . "('$customer_name','$contact_phone','$pickup_unit_number', '$pickup_street_number', '$pickup_street_name', '$pickup_suburb', '$destination_suburb', '$pickup_time', '$booking_reference_number', '$booking_time', '$booking_status')";
		
		// executes the query
		$result = @mysqli_query($conn, $query);
			
		// checks if the execution was successful
		if (!$result) {
			echo "<p>Something is wrong with ",	$query, "</p>";
		} else {
				// successful query operation, and return information
		     echo (toXML($booking_reference_number, $customer_name, $contact_phone, $pickup_unit_number, $pickup_street_number, $pickup_street_name, $pickup_suburb, $destination_suburb, $pickup_time, $booking_time, $booking_status));
        }
		// close the database connection
		mysqli_close($conn);
	 // if successful database connection
	}
    $input = trim($input);
    $input = stripcslashes($inut);
    $input = htmlspecialchars($input);

	// XML to return to client
function toXML($bookingreferencenumber, $customername, $contactphone, $pickupunitnumber, $pickupstreetnumber, $pickupstreetname, $pickupsuburb, $destinationsuburb, $pickuptime, $bookingtime, $bookingstatus) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

    $booking = $doc->createElement('booking');
    $bookings->appendChild($booking);

    $booking_reference_number = $doc->createElement('booking_reference_number');
    $booking->appendChild($booking_reference_number);
    $value1 = $doc->createTextNode($bookingreferencenumber);
    $booking_reference_number->appendChild($value1);

    $customer_name = $doc->createElement('customer_name');
    $booking->appendChild($customer_name);
    $value2 = $doc->createTextNode($customername);
    $customer_name->appendChild($value2);

    $contact_phone = $doc->createElement('contact_phone');
    $booking->appendChild($contact_phone);
    $value3 = $doc->createTextNode($contactphone);
    $contact_phone->appendChild($value3);
    
	$pickup_unit_number = $doc->createElement('pickup_unit_number');
    $booking->appendChild($pickup_unit_number);
    $value4 = $doc->createTextNode($pickupunitnumber);
    $pickup_unit_number->appendChild($value4);
	
	$pickup_street_number = $doc->createElement('pickup_street_number');
    $booking->appendChild($pickup_street_number);
    $value5 = $doc->createTextNode($pickupstreetnumber);
    $pickup_street_number->appendChild($value5);
	
	$pickup_street_name = $doc->createElement('pickup_street_name');
    $booking->appendChild($pickup_street_name);
    $value6 = $doc->createTextNode($pickupstreetname);
    $pickup_street_name->appendChild($value6);
	
    $pickup_suburb = $doc->createElement('pickup_suburb');
    $booking->appendChild($pickup_suburb);
    $value7 = $doc->createTextNode($pickupsuburb);
    $pickup_suburb->appendChild($value7);

    $destination_suburb = $doc->createElement('destination_suburb');
    $booking->appendChild($destination_suburb);
    $value8 = $doc->createTextNode($destinationsuburb);
    $destination_suburb->appendChild($value8);

    $pickup_time = $doc->createElement('pickup_time');
    $booking->appendChild($pickup_time);
    $value9 = $doc->createTextNode($pickuptime);
    $pickup_time->appendChild($value9);
	
	$booking_time = $doc->createElement('booking_time');
    $booking->appendChild($booking_time);
    $value10 = $doc->createTextNode($bookingtime);
    $booking_time->appendChild($value10);
	
	$booking_status = $doc->createElement('booking_status');
    $booking->appendChild($booking_status);
    $value11 = $doc->createTextNode(bookingstatus);
    $booking_status->appendChild($value11);

    $strXml = $doc->saveXML();

    echo $strXml;
}
?>
