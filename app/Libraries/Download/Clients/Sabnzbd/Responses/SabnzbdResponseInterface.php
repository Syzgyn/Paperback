<?php
namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

interface SabnzbdResponseInterface
{
    public static function getTransforms(): array;

    public static function getRoot(): string;
}