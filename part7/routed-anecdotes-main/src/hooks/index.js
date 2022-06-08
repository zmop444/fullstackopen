import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const attributes = {
        type,
        value,
        onChange
    }
    
    return [
        value,
        attributes,
        reset
    ]
    
    // vs no repeat of value. but is less clean.
    // return {
    //     attributes,
    //     reset
    // }
}