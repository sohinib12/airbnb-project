import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllReviewsThunk, addReviewThunk, deleteReviewThunk } from "../../store/review";
import { getSpotDetailsThunk } from "../../store/spot";



export default function ({spotId}){
    const dispatch = useDispatch();
    const spot = useSelector((state)=>state.spots.singleSpot);
    const reviews = useSelector((state)=> state.reviews);
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)
    const [errorValidations, setErrorValidations] = useState([])

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
        dispatch(getSpotDetailsThunk(spotId))
        console.log(spot)
    }, [dispatch, spotId, spot.numReviews])

    useEffect(()=> {
        const errors = []
        if(rating > 5 || rating < 1) errors.push('rating should be between 1 and 5')
        if(body.length === 0) errors.push('please provide a review ')

        setErrorValidations(errors)
    },[rating, body])

    return (
        <div className="review-container">
            <div>

            </div>
        </div>
    )
}
