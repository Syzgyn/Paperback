import React, { useEffect } from "react";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { Folder, CornerUpLeft } from "react-feather";
import {
    fetchPaths,
    setCurrentPath,
    pathsSelector,
} from "@/Store/Slices/paths";

const FileBrowserModalContent = () => {
    const dispatch = useDispatch();
    const {
        currentPath,
        isLoading,
        directories,
    } = useSelector(pathsSelector);

    useEffect(() => {
        dispatch(fetchPaths());
    }, [dispatch, currentPath]);

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <>
            <p>{currentPath}</p>
            <table className="table file-browser-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPath !== "" ? (
                        <tr onClick={() => dispatch(setCurrentPath(".."))}>
                            <td className="text-center file-type-cell">
                                <CornerUpLeft />
                            </td>
                            <td className="file-name-cell">..</td>
                        </tr>
                    ) : null}
                    {directories.map((dir) => (
                        <tr
                            key={dir.name}
                            onClick={() => dispatch(setCurrentPath(dir.path))}
                        >
                            <td className="text-center file-type-cell">
                                <Folder />
                            </td>
                            <td className="file-name-cell">{dir.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default FileBrowserModalContent;
