<?php

namespace App\Traits;

trait TruncateHtml
{

    //Slightly modified from https://stackoverflow.com/a/1193598
    public function truncateHtml($html, $maxLength, $closingString = '', $isUtf8 = true)
    {
        if (strlen($html) <= $maxLength) {
            return $html;
        }

        $output = '';
        $printedLength = 0;
        $position = 0;
        $tags = [];

        // For UTF-8, we need to count multibyte sequences as one character.
        $re = $isUtf8
            ? '{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;|[\x80-\xFF][\x80-\xBF]*}'
            : '{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;}';

        while ($printedLength < $maxLength && preg_match($re, $html, $match, PREG_OFFSET_CAPTURE, $position)) {
            list($tag, $tagPosition) = $match[0];

            // Print text leading up to the tag.
            $str = substr($html, $position, $tagPosition - $position);
            if ($printedLength + strlen($str) > $maxLength) {
                $output .= substr($str, 0, $maxLength - $printedLength);
                $printedLength = $maxLength;
                break;
            }

            $output .= $str;
            $printedLength += strlen($str);
            if ($printedLength >= $maxLength) {
                break;
            }

            if ($tag[0] == '&' || ord($tag) >= 0x80) {
                // Pass the entity or UTF-8 multibyte sequence through unchanged.
                $output .= $tag;
                $printedLength++;
            } else {
                // Handle the tag.
                $tagName = $match[1][0];
                if ($tag[1] == '/') {
                    // This is a closing tag.

                    $openingTag = array_pop($tags);
                    assert($openingTag == $tagName); // check that tags are properly nested.

                    $output .= $tag;
                } elseif ($tag[strlen($tag) - 2] == '/') {
                    // Self-closing tag.
                    $output .= $tag;
                } else {
                    // Opening tag.
                    $output .= $tag;
                    $tags[] = $tagName;
                }
            }

            // Continue after the tag.
            $position = $tagPosition + strlen($tag);
        }

        // Print any remaining text.
        if ($printedLength < $maxLength && $position < strlen($html)) {
            $output .= substr($html, $position, $maxLength - $printedLength);
        }

        if ($printedLength == $maxLength) {
            $output .= $closingString;
        }

        // Close any open tags.
        while (! empty($tags)) {
            $output .= sprintf('</%s>', array_pop($tags));
        }

        return $output;
    }
}
