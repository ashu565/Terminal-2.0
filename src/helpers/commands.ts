import { type } from "os";

export const commands = ["help",'ls','clear','echo','cd','mkdir','rmdir','pwd','reset','exit'];


type helpType = {
    help : string,
    ls : string,
    clear : string,
    reset : string,
    rmdir : string,
    pwd : string,
    cd : string,
    mkdir : string,
}

export const Help : helpType = {
    help : "Shows All The Commands that can be used",
    ls : "Shows all the files and folder in the current directory",
    clear : "Clears the Terminal",
    reset : "Reset the whole Terminal",
    rmdir : "remove the folder from the current directory (specify folder)",
    pwd : "Specifies the current directory",
    cd : "Change directory (specify folder)",
    mkdir : "Create Folder in current directory (specify folder)",
}