<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitea5793d580f38693a1f3b5d2760094de
{
    public static $files = array (
        '10e2bd795825f9abb125ae7cc3251364' => __DIR__ . '/..' . '/webdevstudios/cmb2/init.php',
    );

    public static $classMap = array (
        'WPAZ_Plugin_Base\\V_2_5\\Abstract_Plugin' => __DIR__ . '/..' . '/wordpress-phoenix/abstract-plugin-base/src/abstract-plugin.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInitea5793d580f38693a1f3b5d2760094de::$classMap;

        }, null, ClassLoader::class);
    }
}
