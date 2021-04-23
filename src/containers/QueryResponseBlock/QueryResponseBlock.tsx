import React, {FC} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react'


const QueryResponseBlock: FC = () => {
    return (
        <div>
            <Editor
                mode={'code'}
                value={{action: 'sys.get'}}
                onChange={() => console.log('changes')}
                navigationBar={false}
                search={false}
                statusBar={false}
            />
        </div>
    )
}

export default QueryResponseBlock