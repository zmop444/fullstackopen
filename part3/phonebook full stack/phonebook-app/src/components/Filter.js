const Filter = ({filter, setFilter}) => {
    const onChangeFilter = (event) => setFilter(event.target.value)
    return (
        <div>
            filter shown with <input value={filter} onChange={onChangeFilter} />
        </div>
    )
}
export default Filter