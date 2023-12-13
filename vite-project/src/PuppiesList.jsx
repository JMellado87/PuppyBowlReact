
import { Link } from 'react-router-dom'

const PuppiesList = ({puppies}) => {
    return (
        <div>
            <h1>Puppy Bowl Players</h1>
            <h3>
                <Link to='/puppies/newpuppy'>
                    Click here to add a new puppy
                </Link>
            </h3>
            <ul>
                {
                    puppies.map((puppy) => {
                        return (
                            <li key={puppy.id}>
                                <Link to={`/puppies/${puppy.id}`}>
                                    {puppy.name}
                                </Link>
                            </li>
                        )
                    })    
                }
            </ul>
        </div>
    )
}

export default PuppiesList