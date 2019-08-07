import React,{useState, createContext} from 'react';

export const requestContext = createContext();

export const ServiceProvider = props => {

    const [request,setRequest] = useState({
            adultCount: 1,
            childCount: 0,
            infantCount: 0,
            isDirectFlight: false,
            isPlusOrMinus3Days: false,
            searchType: 2,
            preferedFlightClass: 0,
                segments: [
            {
                departureLocationCode: '',
                departureDate: '',
                arrivalLocationCode: '',
                returnDate: '',
                departureTime: "Any",
                returnTime: "Any"
            }
            ],
    })
return(
    <div>
        <requestContext.Provider value={[request,setRequest]}>
            {props.children}
        </requestContext.Provider>
    </div>
    )
}