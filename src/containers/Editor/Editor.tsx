import React, {FC, useRef} from "react";
import JSONEditor from "jsoneditor";
export type modes = 'tree' | 'view' | 'form' | 'code' | 'text'

export interface EditorProps {

    value: object | [] | string | boolean | number,
    mode?: modes
    name: string,
    schema?: object,
    schemaRefs?: object,
    sortObjectKeys?: boolean,
    onChange: (props?: any) => void,
    onError?: (props?: any) => void,
    onModeChange?: (props?: any) => void,
    ace?: object,
    ajv?: object,
    theme?: string,
    history?: boolean,
    navigationBar?: boolean,
    statusBar?: boolean,
    search?: boolean,
    allowedModes?: Array<modes>,
    //  custom props
    tag?: string,
    htmlElementProps?: object,
    innerRef?: (props?: any) => void

}

const Editor: FC<EditorProps> = (props) => {
    const ref = useRef(null)
    const jsoneditor = new JSONEditor(ref.current!, {

    })
    return (
        <div ref={ref}></div>
    )
}