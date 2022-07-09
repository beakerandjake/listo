
export default function Sidebar(props) {
    return (
        <div>
            <h1>Sidebar!</h1>
            <nav>
                {props.items.map(x => (<h1>{x.name}</h1>))}
            </nav>
        </div>
    )
}