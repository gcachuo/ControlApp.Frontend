<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once __DIR__.'/vendor/autoload.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');

$loader = new FilesystemLoader(__DIR__.'/templates/');
$twig = new Environment($loader, [
    'cache' => __DIR__.'/cache/',
    'debug' => true
]);

echo $twig->render('index.twig', ['title' => 'Control App', 'go' => 'here']);