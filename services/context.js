import React,{useState, createContext} from 'react';
import Layout from '../components/layout';

export const RequestContext = createContext();

export const ServiceProvider = props => {

    const [Request,setRequest] = useState({
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
                    departureTime: '',
                    returnTime: '',
                }
            ],
    })
return(
    <ServiceProvider>
        <RequestContext.Provider value={[Request,setRequest]}>
            <Layout/>
        </RequestContext.Provider>
    </ServiceProvider>
    )
}