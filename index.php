<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Loader\FilesystemLoader;

(new Program())->Main();

class Program
{
    private string $title = "Control App";
    private bool $debug = true;
    private int $error_level = E_ALL;
    private Environment $twig;

    private function Init(): void
    {
        require_once __DIR__ . '/vendor/autoload.php';

        error_reporting($this->error_level);
        ini_set('display_errors', $this->debug);

        $this->loadTwig();

        $this->loadDotEnv();
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function Main(): void
    {
        $this->Init();

        exit($this->renderView());
    }

    /**
     * @return string
     */
    public function getView(): string
    {
        $request_uri = strtok(trim($_SERVER['REQUEST_URI'], '/'),'?');
        if (!empty($request_uri)) {
            $view_path = __DIR__ . "/views/$request_uri.php";
            if (!file_exists(filename: $view_path)) {
                $request_uri .= '/index';
            }
        }
        return $request_uri;
    }

    /**
     * @return string
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function renderView(): string
    {
        try {
            $context = [
                'title' => $this->title,
                'view' => $this->getView()
            ];
            return $this->twig->render('index.twig', $context);
        } catch (LoaderError $e) {
            $response_code = 404;
        }

        $response_code = $response_code ?? 500;
        http_response_code($response_code);
        return $this->twig->render("errors/$response_code.twig", ['message' => $e->getMessage(), 'code' => $response_code]);
    }

    /**
     * @return void
     */
    public function loadTwig(): void
    {
        $disableCache = boolval($_GET['disable-twig-cache']??false);
        $loader = new FilesystemLoader([__DIR__ . '/templates/', __DIR__ . '/views/']);
        $this->twig = new Environment($loader, [
            'cache' => $disableCache ?false:__DIR__ . '/cache/',
            'debug' => $this->debug
        ]);
    }

    /**
     * @return void
     */
    public function loadDotEnv(): void
    {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->safeLoad();
    }
}

