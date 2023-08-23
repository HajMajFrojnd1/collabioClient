class FileObject {

    path: String;
    name: String;

    constructor(path: String){
        this.path = path;
        let parts = this.pathParts();
        this.name = parts[parts.length - 1];
    };

    pathParts(): String[]{
        return this.path.split('/');
    }

    static createFileObjects(paths: String[], level: number = 1): FileObject[] | null{
        console.log(paths);
        let splitPaths = paths.map(path => {
            return path.split('/');
        });
        
        let highestLevel = splitPaths.filter(sPath => sPath.length === level);
        let fos: FileObject[] | FileObject = highestLevel.map(hsPath => {
            let children = splitPaths.filter(sPath => sPath.length > hsPath.length && sPath[level - 1] === hsPath[level - 1]);
            
            let temp : FileObject =  hsPath[level - 1].split(".").length > 1 ? new File(hsPath.join("/")) : new Directory(hsPath.join("/"));
            
            if (temp instanceof Directory){
                temp.setChildren(children.map(child => child.join("/")), level + 1);
            }

            return temp;
        });

        return fos instanceof Array ? fos : [fos];
    } 

};

class Directory extends FileObject {

    children: FileObject[] | null;

    constructor(path: String){
        super(path);
        this.children = null;
    }

    setChildren(children: String[], level: number){
        this.children = FileObject.createFileObjects(children, level);
    };

    addDirectory(name: String, updateState: Function | null){
        let path = `${this.path}/${name}`;
        this.children ? this.children.push(new Directory(path)) : this.children = [new Directory(path)];
        if (updateState) updateState(path);
    }

}

class File extends FileObject {

    extension: String;

    constructor(path: String){
        super(path);
        try {
            this.extension = this.name.split('.')[1];
        } catch (error) {
            this.extension = "";
        }
    }

}

export {FileObject, Directory, File};