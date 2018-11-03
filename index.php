<?php
if ($_POST['payload']) {
  $data = json_decode($_POST['payload']);
  if ($data->{"status"} == 0) {
    $fp = fopen("travis", "wb") or die ("can't open file for writing");
    fwrite($fp, "hello world");
    fclose($fp);
    chmod("travis", 660);
    echo "thanks for the fish";
  } else {
    echo "bye";
  }
} else {
  echo "bye";
}
?>
