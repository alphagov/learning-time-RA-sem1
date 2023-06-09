import * as fs from 'fs'


export const writeOutJson = async(dir: string, fileName:string,  file: string) => {
    try{
    fs.mkdirSync(dir,{recursive: true})
    fs.writeFileSync(`${dir}/${fileName}.JSON`, file)
    console.log(`Wrote file put to path ${dir}/${fileName}`)
    } catch (err){
        console.log(err)
    }
}
