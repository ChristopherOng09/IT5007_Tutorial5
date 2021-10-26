const waitList_handler = require('../database/dataBaseHandler')
const database_schema = require('../database/config/dataBaseSchema')


const deluxeRoom = new waitList_handler(database_schema.DeluxeRoom_);
const premierRoom = new waitList_handler(database_schema.PremierRoom_);


resolvers = {

    Query: {
        queryOneCustomer: async (parent , args) => {
            let result;
           
            if (args.custEmailInput.Room == "premierRoom") {
                result = await premierRoom.findOne({EmailAddress : args.custEmailInput.EmailAddress})
            }   
            
            if (args.custEmailInput.Room == "deluxeRoom"){
                result = await deluxeRoom.findOne({EmailAddress : args.custEmailInput.EmailAddress})
            }

            if (result == null) return null;

            return result.Customer
        },

        queryAllCustomer: async (parent , args) => {
            let result
            
            if (args.inputRoomType.Room == "premierRoom") {
                result = await premierRoom.findAll()
            }   
            
            if (args.inputRoomType.Room == "deluxeRoom"){
                result = await deluxeRoom.findAll()
            }

            let temp = [];
            
            result.forEach(function(item , index){
                temp.push(item.Customer)
            })

            return temp
            
        }
    },

    Mutation: {
        insertCustomer: async (parent , args) => {
            console.log(args.inputCustomerDetails)
            let result;
            const create_customer = {
                Name: args.inputCustomerDetails.Name,
                EmailAddress: args.inputCustomerDetails.EmailAddress,
                Contact: args.inputCustomerDetails.Contact,
                Remarks: args.inputCustomerDetails.Remarks,
                CheckInStatus: args.inputCustomerDetails.CheckInStatus,
                Status: args.inputCustomerDetails.Status,
                Room: args.inputCustomerDetails.Room,
                RegistrationTime: args.inputCustomerDetails.RegistrationTime
            }

            const new_customer = new database_schema.Customer_(create_customer)

            if (args.inputCustomerDetails.Room == "premierRoom") {
                result = await premierRoom.insertOne(new_customer)
                
            }

            if (args.inputCustomerDetails.Room == "deluxeRoom"){
                result = await deluxeRoom.insertOne(new_customer)
            }

            return args.inputCustomerDetails
        },

        deleteCustomer: async (parent, args) => {
            let result = false;
            if (args.inputCustomerEmail.Room == "premierRoom") {
                 result = await premierRoom.deleteOne({EmailAddress: args.inputCustomerEmail.EmailAddress})
            }

            if (args.inputCustomerEmail.Room == "deluxeRoom"){
                 result = await deluxeRoom.deleteOne({EmailAddress: args.inputCustomerEmail.EmailAddress})
            }

            return args.inputCustomerEmail
        },


        deleteCheckInCustomer: async(parent, args) => {
            console.log(args.inputRoomType.Room)
            if (args.inputRoomType.Room == "premierRoom") {
                await premierRoom.deleteMany()
            }
            if (args.inputRoomType.Room == "deluxeRoom") {
                await deluxeRoom.deleteMany()
            }

            return args.inputRoomType
        },

        updateCheckInStatus: async(parent , args) => {
            let result = false;
            if (args.inputCustomerEmail.Room == "premierRoom") {
                 result = await premierRoom.updateCheckInStatus({EmailAddress: args.inputCustomerEmail.EmailAddress})
            }

            if (args.inputCustomerEmail.Room == "deluxeRoom"){
                 result = await deluxeRoom.updateCheckInStatus({EmailAddress: args.inputCustomerEmail.EmailAddress})
            }


            return args.inputCustomerEmail

        },

        updateCurrentStatus: async(parent, args) => {
            if (args.inputCustomerStatus.Room == "premierRoom") {
                result = await premierRoom.updateCustomerStatus({EmailAddress: args.inputCustomerStatus.EmailAddress} , args.inputCustomerStatus.Status)
           }

           if (args.inputCustomerStatus.Room == "deluxeRoom"){
                result = await deluxeRoom.updateCustomerStatus({EmailAddress: args.inputCustomerStatus.EmailAddress} , args.inputCustomerStatus.Status)
           }

           return args.inputCustomerStatus
        }

    }

}

module.exports = resolvers