import React, { useEffect, useState } from "react";
import PageRow from "@/Components/Page/PageRow";
import ImportComicTable from "@/AddComic/Import/ImportComics/ImportComicTable";
import ImportComicFooter from "@/AddComic/Import/ImportComics/ImportComicFooter";

const Import = () => {
    return (
        <PageRow>
            <form>
                <ImportComicTable />
                <ImportComicFooter />
            </form>
        </PageRow>
    );
}

export default Import;

