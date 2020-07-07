import React from "react";
import { Spinner } from "reactstrap";

function generateStyle(delay) {
    return {
        animationDelay: delay,
    };
}

function LoadingIndicator() {
    return (
        <div className="text-center">
            <Spinner
                color="secondary"
                type="grow"
                style={generateStyle("0.1s")}
            />
            <Spinner
                color="secondary"
                type="grow"
                style={generateStyle("0.2s")}
            />
            <Spinner
                color="secondary"
                type="grow"
                style={generateStyle("0.3s")}
            />
            <Spinner
                color="secondary"
                type="grow"
                style={generateStyle("0.4s")}
            />
            <Spinner
                color="secondary"
                type="grow"
                style={generateStyle("0.5s")}
            />
        </div>
    );
}

export default LoadingIndicator;
