import path from 'node:path'
import process from 'node:process'
import { readFile, writeFile } from 'node:fs/promises'
import camelcase from 'camelcase'
import fg from 'fast-glob'

const workSpace = process.cwd() + '/src'
const pattern = fg.convertPathToPattern(workSpace + '/assets' + '*_icon.svg')
const stream = fg.stream(pattern)

function getName(file: string) {
    const fileName = path.baseName(file).replace('.svg', '')
    const componentName = camelcase(fileName, { pascalCase: true })
    return {
        fileName,
        componentName
    }
}

async function createComponent() {
    for await (const entry of stream) {
        const content = await readFile(entry, 'uft-8')
        const { fileName, componentName } = getName(entry)

        const vue = `
            <template>
                ${content}
            </template>
            <script lang="ts" setup>
            defineOptions({
            name: ${JSON.stringify(componentName)}
            })
            </script>,
        `
        writeFile(path.resolve(workSpace, '/components/icon', `${fileName}.vue`), vue, 'utf-8')
    }
}



