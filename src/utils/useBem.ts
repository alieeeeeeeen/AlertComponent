const bemClassName = (
    block: string,
    element: string,
    modifier: string
) => {
    let cls = ''
    if(block) {
        cls += block
    }

    if(element) {
        cls += `__${element}`
    }

    if(modifier) {
        cls += `--${modifier}`
    }
    
    return cls
}

export const useBem = (block: string) => {
    const b = () => bemClassName(block, '', '')

    const e = (elementSuffix = '') => bemClassName(block, elementSuffix, '')

    const m = (modiferSuffix = '') => bemClassName(block, '', modiferSuffix)

    return {
        b,
        e,
        m
    }
}
