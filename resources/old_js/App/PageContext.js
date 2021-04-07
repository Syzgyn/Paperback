import React from "react";

const PageContext = React.createContext({
    isPopulated: true,
    setPopulated: () => {},
});

export default PageContext;
