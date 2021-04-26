import React, {FC, useEffect, useRef, useState} from "react";
import JSONEditor, {JSONEditorOptions} from "jsoneditor";
import s from './Editor.module.css'
import 'jsoneditor/dist/jsoneditor.css';

export type modes = 'tree' | 'view' | 'form' | 'code' | 'text'

export interface EditorProps {

    value: object | [] | string | boolean | number,
    formattedValue?: string,
    mode?: modes
    name?: string,
    schema?: object,
    schemaRefs?: object,
    sortObjectKeys?: boolean,
    onChange: (dataObj: any, dataStr: string) => void,
    onFormat?: () => string,
    onError?: (error: Error) => void,
    onModeChange?: (props?: any) => void,
    ace?: AceAjax.Ace,
    theme?: string,
    history?: boolean,
    navigationBar?: boolean,
    statusBar?: boolean,
    search?: boolean,
    //  custom props
    tag?: string,
    htmlElementProps?: object,
    innerRef?: (props?: any) => void

}

const Editor: FC<EditorProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<JSONEditor>()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const {
            innerRef,
            htmlElementProps,
            tag,
            onChange,
            ...rest
        } = props;

        createEditor(props);
        return () => {
            editorRef.current!.destroy()
        }
    }, [])

    useEffect(() => {
        const currentJson = editorRef.current!.get()
        if(JSON.stringify(props.value) !== '{}' && JSON.stringify(props.value) !== JSON.stringify(currentJson)) {
            editorRef.current!.update(props.value)
        }
    }, [props.value])

    useEffect(() => {
        if(props.formattedValue) editorRef.current!.updateText(props.formattedValue)
    }, [props.formattedValue])

    const handleError = (error: Error) => {
        props.onError!(error)
        setIsError(true)
    }

    // eslint-disable-next-line react/sort-comp

    const createEditor = ({value, onChange, tag, htmlElementProps, innerRef, ...rest}: EditorProps) => {
        if (editorRef.current) {
            editorRef.current.destroy();
        }

        editorRef.current = new JSONEditor(containerRef.current!, {
            onChange: handleChange,
            onError: handleError,
            ...rest
        });

        editorRef.current.set(value);
    }

    const getText = () => editorRef.current!.getText()

    const updateText = (text: string) => editorRef.current!.updateText(text)

    const handleChange = () => {
        if (props.onChange) {
            try {
                const text = editorRef.current!.getText();
                if (text === '') {
                    props.onChange(null, '');
                }
                const currentJson = editorRef.current!.get();
                props.onChange(currentJson, getText())
                if (JSON.stringify(props.value) !== JSON.stringify(currentJson)) {
                    editorRef.current!.updateText(editorRef.current!.getText())
                    props.onChange(currentJson, editorRef.current!.getText());
                }
                if(getText() !== JSON.stringify(currentJson)) {
                    updateText(getText())
                }
                setIsError(false)
            } catch (err) {
                props.onError!(err)
                setIsError(true)
            }
        }
    }

    const collapseAll = () => {
        if (editorRef.current) {
            editorRef.current.collapseAll();
        }
    }

    const expandAll = () => {
        if (editorRef.current) {
            editorRef.current.expandAll();
        }
    }

    const focus = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }

    return (
        <div className={`${s.container} ${isError ? 'error-field' : ''}`} ref={containerRef}/>
    )
}

export default Editor

//
// const Editor: FC<EditorProps> = (props) => {
//     const containerRef = useRef<HTMLDivElement>(null)
//     const editorRef = useRef<JSONEditor>()
//
//     useEffect(() => {
//         const options: JSONEditorOptions = {
//             mode: "code",
//             enableTransform: false,
//             enableSort: false,
//             search: false,
//             statusBar: false,
//             mainMenuBar: false,
//             navigationBar: false,
//             onChange: props.onChange,
//             history: false,
//             colorPicker: false,
//             escapeUnicode: false,
//             sortObjectKeys: false
//         }
//         editorRef.current = new JSONEditor(containerRef.current!, options)
//         return () => editorRef.current!.destroy()
//     },[])
//
//     useEffect(() => {
//         editorRef.current!.update(props.value)
//     }, [props.value])
//
//     return (
//         <div ref={containerRef}/>
//     )
// }
//