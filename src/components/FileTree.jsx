import SectionWrapper from "./SectionWrapper";
import {FileObject, File, Directory} from "../classes/FileSystem";
import { useMemo, useState, useRef, useEffect } from "react";
import { getTrimmedText } from "../utils/textWidth";
import { forwardRef } from "react";
import DarkModal from "./DarkModal";
import TwoButtonModal from "./TwoButtonModal";
import VerticalFormInput from "./VerticalFormInput";

const fileDirWrapper = (fd, ref, setCurrentPath) => {

    if(fd instanceof File){
        return (
            <FileWrapper 
                ref={ref} 
                file={fd}
                setCurrentPath={() => setCurrentPath(fd.path)}
            />
        );
    }

    return (
        <DirectoryWrapper
            ref={ref}
            directory={fd}
            setCurrentPath={() => setCurrentPath(fd.path)}
        >
            {fd.children &&
                fd.children.map((child) => fileDirWrapper(child, ref, setCurrentPath))
            }
        </DirectoryWrapper>
    );

};

const clickFileTreeItem = (ref, inRef, setCurrentPath) => {
    if (ref.current) {
        ref.current.style.backgroundColor = 'transparent';
    }
    ref.current = inRef.current;
    ref.current.style.backgroundColor = '#3b3e48';
    setCurrentPath();
}

const FileWrapper = forwardRef(({file, setCurrentPath}, ref) => {
    const [name, setName] = useState(null);
    const inRef = useRef(null);

    useEffect(() => {
        setName(file.name, inRef, false);
    }, []);
    return (
        <span 
            className="ml-1 w-full rounded-md pl-1 cursor-pointer"
            ref={inRef}
            onClick={(e) => {
                e.stopPropagation();
                clickFileTreeItem(ref,inRef,setCurrentPath);
            }}
        >
            {name}
        </span>
    );
});

const DirectoryWrapper = forwardRef(({directory, children, setCurrentPath}, ref) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const inRef = useRef(null);

    useEffect(() => {
        setName(getTrimmedText(directory.name, inRef, true));
    }, [inRef.current]);

    return (
        <div 
            className="flex flex-col items-start w-full"
            onClick={(e) => {
                e.stopPropagation();
                clickFileTreeItem(ref,inRef,setCurrentPath);
            }}
        >
            <div 
                className="flex items-center cursor-pointer w-full rounded-md"
                onClick={() => setOpen(state => !state)}
                ref={inRef}
            >
                <img 
                    src="/icons/caret-right-solid.svg" 
                    alt="arrow icon" 
                    className={open ? "h-4 w-4 mr-2 rotate-90" : "h-4 w-4 mr-2"}
                />
                <span className="w-full">{name}</span>
            </div>
            {children && open &&
                <div className="flex w-full">
                    <div className="h-full border-2 border-white ml-5 mr-1">
                    </div>
                    <div className="flex flex-col flex-1 items-start w-full justify-start">
                        {
                            children
                        }
                    </div>
                </div>
            }
        </div>
    );
});

const FileTreeManipulator = ({addFolder, addFile, remove, currentPath, fileStructure}) => {

    const [name, setName] = useState("");
    const [path, setPath] = useState(currentPath);
    const [visible, setVisible] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const options = fileStructure.filter((fd) => !fd.includes("."));

    return(
        <div className="flex gap-x-4">
            <img 
                src="/icons/folder-plus-solid.svg" 
                alt="Create folder icon" 
                className="h-5 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setName("");
                    setCurrentModal("folder");
                    setVisible(true);
                }}
            />
            <img 
                src="/icons/file-circle-plus-solid.svg" 
                alt="Create folder icon" 
                className="h-5 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setName("");
                    setCurrentModal("file");
                    setVisible(true);
                }}
            />
            <img 
                src="/icons/trash-solid.svg" 
                alt="Create folder icon" 
                className="h-5 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setName("");
                    setCurrentModal("remove");
                    setVisible(true);
                }}
            />
            {visible &&
                <DarkModal setVisible={setVisible}> 
                    {currentModal === "file" &&
                        <TwoButtonModal
                            onClickOne={() => {
                                const ret = addFile(path, name);
                                if(!ret.ok){
                                    setErrorMessage(ret.message);
                                }else{
                                    setErrorMessage(null);
                                    setVisible(false); 
                                }
                            }}
                            onClickTwo={() => {
                                setVisible(false); 
                            }}
                            textOne={"Add File"}
                            textTwo={"Cancel"}
                        >
                            <VerticalFormInput
                                type={"text"}
                                name={"File Name"}
                                placeholder={"example.html"}
                                value={name}
                                setValue={setName}
                            />
                            <VerticalFormInput
                                name={"File Path"}
                                placeholder={"File Path"}
                                options={[...options, ""]}
                                value={path}
                                setValue={setPath}
                            />
                        </TwoButtonModal>
                    }
                    {currentModal === "folder" &&
                        <TwoButtonModal
                            onClickOne={() => {
                                const ret = addFolder(path, name);
                                if(!ret.ok){
                                    setErrorMessage(ret.message);
                                }else{
                                    setErrorMessage(null);
                                    setVisible(false); 
                                }
                            }}
                            onClickTwo={() => {
                                setVisible(false); 
                            }}
                            textOne={"Add Folder"}
                            textTwo={"Cancel"}
                        >
                            <VerticalFormInput
                                type={"text"}
                                name={"Folder Name"}
                                placeholder={"example"}
                                value={name}
                                setValue={setName}
                            />
                            <VerticalFormInput
                                name={"Folder Path"}
                                placeholder={"Folder Path"}
                                options={[...options, ""]}
                                value={path}
                                setValue={setPath}
                            />
                            {errorMessage &&
                                <span className="text-error text-base">
                                    {errorMessage}
                                </span>
                            }
                        </TwoButtonModal>
                    }
                </DarkModal>
            }
        </div>
    );
}

const FileTree = ({project}) => {

    const [currentPath, setCurrentPath] = useState("");
    const [fileName, setfileName] = useState(null);

    const [fileStructure, setFileStructure] = useState([
        "project",
        "project/s.txt",
        "project/karel",
        "project/karel/s.txt",
        "project/karel/t.txt",
        "project/karel/marek",
        "project/barel",
        "karel",
        "karel/s.txt",
        "karel/t.txt",
        "karel/marek",
        "karel/marek/marek.txt",
        "marek.txt"
    ]);
    
    const projectFileStructure = useMemo(() => {
        return FileObject.createFileObjects(fileStructure);
    }, [fileStructure]);

    const ref = useRef(null);

    const updateFileStructure = (fullPath) => {
        setFileStructure((fs) => [...fs, fullPath]);
    }

    const updateCurrentPath = (path) => {
        if (path.includes(".")){
            const split = path.split("/");
            setfileName(split.pop());
            setCurrentPath(split.length > 0 ? split.join("/") + "/" : "");
            return;
        }
        setfileName("");
        setCurrentPath(path + "/");
    }

    const addFile = (path, name) => {
        const full = path === "" ? name : path + "/" + name;
        if (!name.includes(".")) return {message: "File must include extension", ok: false};
        if (fileStructure.includes(full)) return {message: "File already exists", ok: false};
        updateFileStructure(full);
        return {ok: true};
    }

    const addFolder = (path, name) => {
        const full = path === "" ? name : path + "/" + name;
        if (fileStructure.includes(full)) return {message: "Folder already exists", ok: false};
        updateFileStructure(full);
        return {ok: true};
    }

    return (
        <div 
            className="flex flex-col h-full bg-main p-4 rounded-md w-72 max:w-72 font-normal text-base"
            onClick={(e) => {
                if(ref.current){
                    setCurrentPath("");
                    ref.current.style.backgroundColor = "transparent";
                    ref.current = null;
                }
            }}
        >
            <SectionWrapper 
                name={"Explorer"} 
                sideElement={
                    <FileTreeManipulator
                        addFile={addFile}
                        addFolder={addFolder}
                        currentPath={currentPath}
                        fileStructure={fileStructure}
                    />
                }
            >
                <div className="h-2"></div>
                {projectFileStructure &&
                    projectFileStructure.map((fd) => fileDirWrapper(fd, ref, updateCurrentPath))
                }
            </SectionWrapper>
        </div>
    )
}

export default FileTree