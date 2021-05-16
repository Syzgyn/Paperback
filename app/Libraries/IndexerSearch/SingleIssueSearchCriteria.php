<?php

namespace App\Libraries\IndexerSearch;

class SingleIssueSearchCriteria extends SearchCriteriaBase
{
    public int $issueNumber = -1;

    public function __toString(): string 
    {
        return sprintf("%s %02d", $this->getQueryTitle(), $this->issueNumber);
    }
}
