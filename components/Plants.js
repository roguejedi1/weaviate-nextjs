const Plant = ({ plant }) => {
    return (
        <div>
            <h5>Plant: {plant.name}</h5>
            <h6>More info: {plant.url}</h6>
        </div>
    )
}

export default Plant