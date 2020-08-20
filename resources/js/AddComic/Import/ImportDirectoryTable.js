import React, { useEffect } from "react";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchItems,
    deleteItem,
    rootFoldersSelector,
} from "@/Store/Slices/rootFolders";
import { X } from "react-feather";
import { Link } from "react-router-dom";

const Import = () => {
    const dispatch = useDispatch();
    const { isLoading, items } = useSelector(rootFoldersSelector);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Path</th>
                    <th>Free Space</th>
                    <th>Unmapped Folders</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <Link to={"/add/import/" + item.id}>
                                {item.path}
                            </Link>
                        </td>
                        <td>{item.freeSpace}</td>
                        <td>{item.unmappedFoldersCount}</td>
                        <td>
                            <X
                                className="cursor-pointer"
                                onClick={() => dispatch(deleteItem(item.id))}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Import;
