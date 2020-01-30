import { writeFile } from 'fs';

const writeFileAsync = (file: string, fileContent: string): Promise<null> =>
    new Promise((resolve) => {
        writeFile(file, fileContent, () => {
            resolve()
        })
    })

export { writeFileAsync };