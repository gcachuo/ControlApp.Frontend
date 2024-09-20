<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Loader\FilesystemLoader;

(new Program())->Main();

class Program
{
    private string $title = "Control App";
    private Environment $twig;

    private function Init(): void
    {
        require_once __DIR__ . '/vendor/autoload.php';

        error_reporting(E_ALL);
        ini_set('display_errors', '1');

        $loader = new FilesystemLoader([__DIR__ . '/templates/', __DIR__ . '/views/']);
        $this->twig = new Environment($loader, [
            'cache' => __DIR__ . '/cache/',
            'debug' => true
        ]);
    }

    public function Main(): void
    {
        $this->Init();

        $request_uri = trim($_SERVER['REQUEST_URI'], '/');

        $view_path = __DIR__ . "/views/$request_uri.php";
        if (!file_exists($view_path)) {
            $request_uri .= '/index';
        }

        try {
            echo $this->twig->render('index.twig', ['title' => $this->title, 'view' => $request_uri]);
        } catch (LoaderError $e) {
            http_response_code(404);
            echo $this->twig->render('error.twig', ['message' => $e->getMessage(), 'code' => 404]);
        }
    }
}

