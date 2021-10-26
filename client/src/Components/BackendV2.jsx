import React from 'react'
import DisplayHomePage from './DisplayHomePage';
import AddCustomer from './AddCustomer'
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState , useEffect } from 'react';

let setState;
let setCounter;
let counter;
let room = [];
let temp;
let state;
let ArraySize;

const updateCustStats =  gql` 
    mutation updateWaitStatus($Room: String! , $Email: String! , $Status: String!){
        updateCurrentStatus(inputCustomerStatus: {
            EmailAddress: $Email,
            Room: $Room,
            Status: $Status
        })
        {
            EmailAddress
            Room
            Status
        }
    }
`;

const deleteCustomer = gql` 
    mutation delete_customer($Room: String!) {
        deleteCheckInCustomer(inputRoomType: {Room: $Room})
        {
            Room
        }
    }
`;

const update_checkInStatus = gql`
    mutation updateCustomerCheckInStatus($Email: String! , $Room: String!){
        updateCheckInStatus(inputCustomerEmail: {
            EmailAddress: $Email,
            Room: $Room
        })
        {
            EmailAddress
        }
    }
`;

const get_all_customer = gql` 
    query getAllCustomer($room: String!) {
        queryAllCustomer(inputRoomType: {Room: $room}) {
        Name
        EmailAddress
        Contact
        Remarks
        RegistrationTime
        CheckInStatus
        Status
        Room
        }
    }
`;

const insertACustomer = gql`
    mutation addCustomer($Name: String! , $Email: String! , $Contact: String! , $Remarks: String , $Time: String , $CheckInStatus: Boolean , $Status: String!, $Room: String!) {
        insertCustomer(inputCustomerDetails: {
            Name: $Name,
            EmailAddress: $Email,
            Contact: $Contact,
            Remarks: $Remarks,
            CheckInStatus: $CheckInStatus,
            Status: $Status,
            Room: $Room,
            RegistrationTime: $Time
        })
        {
            Name
            EmailAddress
        }
    }
`;


function getTime(){
    const d = new Date();
    let time = d.toLocaleTimeString();
    let time_ = <span>{time}</span>
    return (time_)
}

const Backend = (props) => {

    const [pageViewType, setPageViewType] = useState("deluxeRoom")
    const [deluxeRoomCounter , setDeluxeRoomCounter] = useState(25)
    const [premierRoomCounter , setPremierRoomCounter] = useState(25)
    const [deluxeRoomWaitList , setDeluxeRoomWaitlist] = useState([])
    const [premierRoomWaitList , setPremierRoomWaitlist] = useState([])
    const [premierRoomMsgCode , setPremierRoomMsgCode] = useState(0)
    const [deluxeRoomMsgCode , setDeluxeRoomMsgCode] = useState(0)

    const deluxeRoomData  = useQuery(get_all_customer, {
        variables: {
                room: "deluxeRoom"
        }
    });

    const premierRoomData = useQuery(get_all_customer, {
        variables: {
                room: "premierRoom"
        }
    });

    const [addCustomer] = useMutation(insertACustomer);
    const [updateCheckIn] = useMutation(update_checkInStatus);
    const [removeCustomer] = useMutation(deleteCustomer);
    const [updateCustomerWaitStatus] = useMutation(updateCustStats);


    useEffect(()=> {
       
        if (deluxeRoomData.data != null) {
            setDeluxeRoomWaitlist(deluxeRoomData.data.queryAllCustomer)
            ArraySize = deluxeRoomData.data.queryAllCustomer.length
            setDeluxeRoomCounter(25 - ArraySize)
        }

        if (premierRoomData.data !=null) {
            setPremierRoomWaitlist(premierRoomData.data.queryAllCustomer)
            ArraySize = premierRoomData.data.queryAllCustomer.length
            setPremierRoomCounter(25 - ArraySize)
        }
    } , [deluxeRoomData.data , premierRoomData.data ])

    const updateAll = () => {

        deluxeRoomData.refetch()
        premierRoomData.refetch()

        if (deluxeRoomData.data != null) {
            setDeluxeRoomWaitlist(deluxeRoomData.data.queryAllCustomer)
            ArraySize = deluxeRoomData.data.queryAllCustomer.length
            setDeluxeRoomCounter(25 - ArraySize)
        }

        if (premierRoomData.data !=null) {
            setPremierRoomWaitlist(premierRoomData.data.queryAllCustomer)
            ArraySize = premierRoomData.data.queryAllCustomer.length
            setPremierRoomCounter(25 - ArraySize)
        }
    }

    const updateStatusCode = (roomType , code) => {

        if (roomType == "premierRoom") {setPremierRoomMsgCode(code)}

        if (roomType == "deluxeRoom") {setDeluxeRoomMsgCode(code)}

    }

    const updateDatabaseRecords = async (customer , operation) => {
        
        customer.RegistrationTime = getTime().props.children
    
        await addCustomer({
            variables: {
                Name: customer.Name,
                Email: customer.EmailAddress,
                Contact: customer.Contact,
                Remarks: customer.Remarks,
                Time: customer.RegistrationTime,
                CheckInStatus: customer.CheckInStatus,
                Status: customer.Status,
                Room: customer.Room
            }
        })
        
        if (customer.Room == "premierRoom") {
            setPremierRoomMsgCode(1)
            setPageViewType("premierRoom")
        }

        if (customer.Room == "deluxeRoom") {
            setDeluxeRoomMsgCode(1)
            setPageViewType("deluxeRoom")
        }

        updateAll()
    }


    const updateCustomerField = async (propertyType , field , index , newData) => {
        
        if (propertyType == "premierRoom") {
            setState = setPremierRoomWaitlist
            room = premierRoomWaitList.slice()
        }

        if (propertyType == "deluxeRoom") {
            setState = setDeluxeRoomWaitlist
            room = deluxeRoomWaitList.slice()
        }

        if (field == "CheckInStatus") {
            await updateCheckIn({
                variables: {
                    Email: room[index]["EmailAddress"],
                    Room: propertyType
                }
            })

        }

        if (field == "Status"){
            await updateCustomerWaitStatus({
                variables: {
                    Email: room[index]["EmailAddress"],
                    Room: propertyType,
                    Status: newData
                }
            })
        }

        updateAll()
    }


    const deleteCustomerRecord = async (propertyType , customerArr) => {

        await removeCustomer({
            variables: {
                Room: propertyType
            }
        })

        updateAll()

    }

    const selectDisplay = () => {
       
        
        state = {
            deluxeRoom: {custCounter: deluxeRoomCounter , waitingList: deluxeRoomWaitList , msgCode: deluxeRoomMsgCode},
            premierRoom: {custCounter: premierRoomCounter, waitingList: premierRoomWaitList , msgCode: premierRoomMsgCode},
            pageViewType: pageViewType
        }
      

        let display
        if (props.currentDisplayMode) {
            display =   <DisplayHomePage displayMode = {props.displayMode} 
                                  currentDisplayMode = {props.currentDisplayMode}  
                                  dataBaseRecords = {state} 
                                  currentPageViewType = {state.pageViewType}
                                  updateCustomerRecords = {updateCustomerField} 
                                  deleteCustomerRecord = {deleteCustomerRecord}
                                  updateStatusCode = {updateStatusCode}
                                  />
        }
          else {
            display =  <AddCustomer updateRecords = {updateDatabaseRecords} 
                                     dataBaseRecords = {state}
                                     currentDisplayMode = {props.currentDisplayMode}
                                     displayMode = {props.displayMode}/>
        }
        return display
    }


    return (<div> {selectDisplay()} </div>)

}


export default Backend;


