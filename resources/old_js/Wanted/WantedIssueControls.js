import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const WantedIssueControls = () => {
    return (
        <div className="m-2">
            <ButtonGroup>
                <Button className="border border-secondary" color="light">
                    Search Selected
                </Button>
                <Button className="border border-secondary" color="light">
                    Search All Missing
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default WantedIssueControls;
