import { Link, useParams } from 'react-router-dom'

const SinglePuppy = ({puppies, deletePuppy}) => {

    const params = useParams()
    const id = params.id*1

    const onePuppy = puppies.find((puppy) => {
        return puppy.id === id
    })

    if(!onePuppy) {
        return null
    } else {
        return (
            <div>
                <Link to='/puppies'>Back to all puppies</Link>
                <br />
                <h1>{onePuppy.name}</h1>
                <h3>Breed: {onePuppy.breed}</h3>
                <h3>Status: {onePuppy.status}</h3>
                <img src={onePuppy.imageUrl} />
                <br />
                <button onClick={() => {deletePuppy(onePuppy)}}>Delete puppy</button>
            </div>
        )
    }
}

export default SinglePuppy