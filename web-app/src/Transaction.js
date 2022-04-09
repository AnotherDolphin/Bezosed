

export default function Transaction({ props, setParent }) {

    const reassign = async (company) => {
        await fetch('http://localhost:3000/reassign',
            {
                method: 'PUT',
                body: JSON.stringify({ company: company }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        setParent()
    }

    return (
        <div className={`transaction ${props.bezosed ? 'bezosed' : ''}`}>
            <h3>{props.merchant_name}</h3>
            <div>
                <p>{props.date}</p>
                <h4>${props.amount}</h4>
            </div>
            <div className="reassign">
                <p>Assign <strong>{props.merchant_name}</strong> to Bezos</p>
                <div className="switch" onClick={() => reassign(props.merchant_name)}>
                    <span>off</span>
                    <div className="track">
                        <div className="thumb"></div>
                    </div>
                    <span>on</span>
                </div>
            </div>
        </div>
    )
}
