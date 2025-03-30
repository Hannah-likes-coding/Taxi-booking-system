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
	
	$booking_reference_number = $_POST['booking_reference_number'];
	// Checks if connection is successful
	if (!$conn) {
		// Displays an error message, avoid using die() or exit() as this terminates the execution
		// of the PHP script
		echo "<p>Database connection failure</p>";
	} else {
		$query = "UPDATE $sql_tbl SET booking_status = 'assigned' WHERE booking_reference_number = '$booking_reference_number'";
		// executes the query
		$result = @mysqli_query($conn, $query);
		$num = mysqli_affected_rows($conn);
		
		// checks if the execution was successful
		if (!$result) {
			echo "<p>Something is wrong with ",	$query, "</p>";
		} else {
			if ($num != 0){
				echo "Succeed";
			} else {
				echo "No affect";
			}
		}
		// close the database connection
		mysqli_close($conn);
	 // if successful database connection
	}
	
	
		