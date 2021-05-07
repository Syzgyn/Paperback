<?php

namespace App\Libraries\IndexerSearch;

class SingleIssueSearchCriteria extends SearchCriteriaBase
{
    public int $issueNumber;

    public function __toString()
    {
        return sprintf("%s %02d", $this->getQueryTitle(), $this->issueNumber);
    }
}
