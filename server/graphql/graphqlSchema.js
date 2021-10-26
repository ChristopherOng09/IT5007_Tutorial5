const  {gql} = require('apollo-server-express')

const typeDefs = gql`
    type customer {
        Name: String!,
        EmailAddress: String!,
        Contact: String!,
        Remarks: String,
        CheckInStatus: Boolean,
        Status: String!,
        Room: String!,
        RegistrationTime: String
    }

    type customerEmail_ {
        EmailAddress: String!,
        Room: String!
    }

    type customerDetails_ {
        Name: String!,
        EmailAddress: String!,
        Contact: String!,
        Remarks: String,
        CheckInStatus: Boolean,
        Status: String!,
        Room: String!,
        RegistrationTime: String
    }

    type roomType_ {
        Room: String
    }

    type customerStatusDetails_ {
        EmailAddress: String!,
        Room: String!,
        Status: String!
    }

    input customerStatusDetails {
        EmailAddress: String!,
        Room: String!,
        Status: String!
    }


    input roomType {
        Room: String!
    }

    input customerDetails {
        Name: String!,
        EmailAddress: String!,
        Contact: String!,
        Remarks: String,
        CheckInStatus: Boolean,
        Status: String!,
        Room: String!,
        RegistrationTime: String
    }

    input customerEmail {
        EmailAddress: String!,
        Room: String!
    }



    type Query {
        queryOneCustomer(custEmailInput: customerEmail!): customer
    }

    type Query {
        queryAllCustomer(inputRoomType: roomType): [customer!]
    }

    type Mutation {
        insertCustomer(inputCustomerDetails: customerDetails): customerDetails_
        deleteCustomer(inputCustomerEmail: customerEmail): customerEmail_
        deleteCheckInCustomer(inputRoomType: roomType): roomType_
        updateCheckInStatus(inputCustomerEmail: customerEmail): customerEmail_
        updateCurrentStatus(inputCustomerStatus: customerStatusDetails): customerStatusDetails_
    }

`;


module.exports = typeDefs;