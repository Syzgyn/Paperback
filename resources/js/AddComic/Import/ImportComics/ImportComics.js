import React, { useEffect, useState } from "react";
import PageRow from "@/Components/Page/PageRow";
import ImportComicTable from "@/AddComic/Import/ImportComics/ImportComicTable";

const Import = ({match}) => {

    return (
        <PageRow>
            <ImportComicTable />
        </PageRow>
    );
}

export default Import;

