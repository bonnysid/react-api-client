import React, {FC, useEffect, useRef} from "react";
import JSONEditor, {JSONEditorOptions} from "jsoneditor";
import ace from 'brace'
import 'brace/theme/monokai'
import 'brace/mode/json'
export type modes = 'tree' | 'view' | 'form' | 'code' | 'text'

export interface EditorProps {

    value: object | [] | string | boolean | number,
    mode?: modes
    name?: string,
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
    const containerRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<JSONEditor>()

    useEffect(() => {
        const options: JSONEditorOptions = {
            autocomplete: undefined,
            onChangeJSON: props.onChange,
            mode: 'code',
            enableSort: false,
            enableTransform: false,
            navigationBar: false,
            mainMenuBar: false,
            statusBar: false,
            search: false,
            ace: undefined
        }
        editorRef.current = new JSONEditor(containerRef.current!, options)
        return () => editorRef.current!.destroy()
    },[])

    useEffect(() => {
        editorRef.current!.update(props.value)
    }, [props.value])

    return (
        <div ref={containerRef}/>
    )
}

export default Editor