/* eslint-disable @typescript-eslint/no-empty-function */


export abstract class Component {
    protected parent: Component;
    public name: string;
    
    public setParent(parent: Component) {
        this.parent = parent;
    }

    public getParent(): Component {
        return this.parent;
    }

    /**
     * Вы можете предоставить метод, который позволит клиентскому коду понять,
     * может ли компонент иметь вложенные объекты.
     */
    public isComposite(): boolean {
        return false;
    }

    public abstract getInfo(): string;
    public abstract getSize(): number;
}



abstract class File extends Component{
    public size: number;
    public createDate: Date;

    constructor(fileName: string, fileSize: number, date: Date){
        super();
        this.name = fileName;
        this.size = fileSize;
        this.createDate = date;
    }

    public getInfo(): string{
        return this.getFullName() + " - " + this.size + " - " + this.createDate.toLocaleString();
    }

    public getSize(): number{
        return this.size;
    }

    public abstract getFullName(): string;
}



export class TextFile extends File {
    public getFullName(){
        return this.name + ".txt";
    }
}


export class ImgFile extends File {
    public getFullName(){
        return this.name + ".img";
    }
}




export class Folder extends Component {
    protected children: Component[] = [];

    constructor(folderName: string){
        super();
        this.name = folderName;
    }

    
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }


    public getInfo(): string {
        const results = [];
        let i = 1;
        
        for (const child of this.children) {
            results.push(i++ + ". " + child.getInfo());
        }

        return `Folder(${results.join('||||')})`;
    }

    public getSize():number{
        let value = 0;
        for (const child of this.children){
            value += child.getSize(); 
        }

        return value;
    }
}

