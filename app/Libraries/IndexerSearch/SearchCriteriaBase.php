<?php

namespace App\Libraries\IndexerSearch;

use App\Models\Comic;
use App\Models\Issue;

abstract class SearchCriteriaBase
{
        protected $patterns = [
            "/^the\s/i", //Beginning 'the'
            "/&/",       //Ampersand
            "/[`'\.]/i", //Special Characters
            "/[\W]/i",   //Non-words
        ];

        protected $replacements = [
            "",     //Beginning 'the'
            "and",  //Ampersand
            "",     //Special characters
            "+",    //Non-words
        ];

        public Comic $comic;
        public array $issues;
        public bool $monitoredEpisodesOnly;
        public bool $userInvokedSearch;
        public bool $interactiveSearch;

        public function getQueryTitle(): string
        {
            $title = $this->comic->title;
            if (empty($title)) {
                throw new \Exception("Cannot query comic with missing title");
            }

            $title = preg_replace($this->patterns, $this->replacements, $title);
            $title = rtrim($title, "+");

            return $title;
        }

        public function findIssueByNum(int $issueNumber): ?Issue
        {
            foreach($this->issues as $criteriaIssue) {
                if ($criteriaIssue->issue_num == $issueNumber) {
                    return $criteriaIssue;
                }
            }

            return null;
        }
}
