<?php 
use ElephantIO\Client,
    ElephantIO\Engine\SocketIO\Version1X;

include_once('vendor/autoload.php');

$client = new Client(new Version1X('http://192.168.10.10:9900/'));

$client->initialize();
$r = $client->read();
$client->close();

var_dump($r);
?>