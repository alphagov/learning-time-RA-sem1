import * as fs from 'fs'


export const writeOutJson = (dir: string, fileName:string,  file: string) => {
    fs.mkdir(dir,{recursive: true}, (err) => {
        if(err) return console.log(err)
    })
    fs.writeFile(`${dir}/${fileName}.JSON`, file, (err) => {
        if(err) return console.log(err)
    })
    console.log(`Wrote file put to path ${dir}/${fileName}`)
} 
