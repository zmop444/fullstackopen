import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
    // const content = useField('text')
    const [content, contentAttributes, resetContent] = useField('text')
    const [author, authorAttributes, resetAuthor] = useField('text')
    const [info, infoAttributes, resetInfo] = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        props.showTimedNotification(`a new anecdote ${content} created!`)
        navigate('/')
    }

    const resetAllFields = () => {
        resetContent()
        resetAuthor()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...contentAttributes} />
                </div>
                <div>
                    author
                    <input name='author' {...authorAttributes} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...infoAttributes} />
                </div>
                <button>create</button>
                <button type='button' onClick={resetAllFields}>reset</button>
            </form>
        </div>
    )
}
export default CreateNew