import React, {useState} from "react";
import JsonEd from '../JsonEd'

const Test = () => {
    const [value, setValue] = useState({action: 'test'})
    console.log(value)
    return <div>
        <JsonEd
            name={'test'}
            value={value}
            onChange={(data) => setValue(data)}
            mode={'code'}
        />
        <button onClick={() => setValue({test: 'test'})}>Paste</button>
    </div>
}

export default Test