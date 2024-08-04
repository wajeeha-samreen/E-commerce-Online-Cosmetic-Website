// search.php

<?php
include('db_connection.php');

$query = $_GET['query'];

// Prepare SQL statement
$sql = "SELECT * FROM products WHERE product_name LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%".$query."%";
$stmt->bind_param("s", $searchTerm);

// Execute and fetch results
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo "<div class='product'>";
    echo "<h3>" . htmlspecialchars($row['product_name']) . "</h3>";
    echo "<p>$" . htmlspecialchars($row['price']) . "</p>";
    echo "</div>";
}
?>
