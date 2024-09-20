<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Loader\FilesystemLoader;

require_once __DIR__.'/vendor/autoload.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');

$loader = new FilesystemLoader([__DIR__.'/templates/',__DIR__.'/views/']);
$twig = new Environment($loader, [
    'cache' => __DIR__.'/cache/',
    'debug' => true
]);

$request_uri = trim($_SERVER['REQUEST_URI'], '/');

try{
echo $twig->render('index.twig', ['title' => 'Control App', 'view' => $request_uri]);
}catch(LoaderError $e){
    http_response_code(404);
    echo $twig->render('error.twig', ['message' => $e->getMessage(), 'code'=>404]);
}