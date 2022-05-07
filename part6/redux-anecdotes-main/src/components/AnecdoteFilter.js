import { connect } from "react-redux"
import { update } from "../reducers/filterReducer"

const AnecdoteFilter = ({ update }) => {

    const onChangeFilter = event => {
        const filter = event.target.value
        update(filter)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <label style={style}>
            filter <input onChange={onChangeFilter} />
        </label>
    )
}

const mapDispatchToProps = {
    update
}

const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)
export default ConnectedAnecdoteFilter