export default function Profile (props) {
    
    const dataStyle = {
        color: "#f0f0f0",
    }

    return (
        <div className="profile">
            <h2>{props.data.username}'s <span style={dataStyle}>profile card</span></h2>
            <p><span style={dataStyle}>username: </span>{props.data.username}
            <br/><span style={dataStyle}>password: </span>{props.data.password}
            <br/><span style={dataStyle}>email: </span>{props.data.email}</p>
    </div>
    );
}