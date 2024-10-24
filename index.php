<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Loader\FilesystemLoader;

(new Program())->Main();

/**
 * @version 1.0.0
 */
class Program
{
    private string $title = "Control App";
    private bool $debug = true;
    private int $error_level = E_ALL;
    private Environment $twig;
    private $loader;

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
        $this->loadFile();

        exit($this->renderView());
    }

    public function getController()
    {
        $request_uri = strtok(trim($_SERVER['REQUEST_URI'], '/'), '?');
        $controller_class = strstr($request_uri, '/', true) ?: $request_uri;

        if (!empty($controller_class)) {
            $controller_path = __DIR__ . "/controllers/$controller_class.php";
            if (is_file($controller_path)) {
                include_once $controller_path;
                $full_class_name = "controllers\\$controller_class";
                if (class_exists($full_class_name)) {
                    return new $full_class_name();
                } else {
                    throw new Exception("Controller class '$full_class_name' not found.");
                }
            }
        }

        return null;
    }

    /**
     * @return string
     */
    public function getView(): string
    {
        $request_uri = trim(strtok($_SERVER['REQUEST_URI'], '?'), '/');

            $view_path = __DIR__ . "/views/$request_uri.html";
            if (!file_exists(filename: $view_path)) {
                $request_uri .= '/index';
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
                'view' => $this->getView(),
                'controller'=>$this->getControllerClass(),
                'get'=>$_GET,
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
        $disableCache = boolval($_GET['disable-twig-cache'] ?? false);
        $this->loader = new FilesystemLoader([__DIR__ . '/templates/', __DIR__ . '/views/']);
        $this->twig = new Environment($this->loader, [
            'cache' => $disableCache ? false : __DIR__ . '/cache/',
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

    /**
     * @return void
     */
    public function loadFile(): void
    {
        $request_uri = strtok(trim($_SERVER['REQUEST_URI'], '/'), '?');
        $file = basename($request_uri);
        $request_uri = strstr($request_uri, '/', true) ?: $request_uri;
        $view_path = __DIR__ . "/views/$request_uri/$file";
        if (is_file($view_path)) {
            include __DIR__ . "/tools/mime_type.php";
            $mimetype = get_mime_content_type($view_path);
            header("Content-Type: $mimetype");
            exit(file_get_contents($view_path));
        }
    }

    /**
     * @throws Exception
     */
    public function getControllerClass()
    {
        $controllerClass = $this->getController();
        if(!empty($controllerClass)) {
            return new $controllerClass();
        }
    }
}

