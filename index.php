<?php
if ($_POST['payload']) {
    $data = json_decode($_POST['payload']);
    echo $data['status'];
}
?>
