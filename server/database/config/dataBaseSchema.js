const mongoose_ = require('./database')
const mongoose = require('mongoose');
const waitList_handler = require('../dataBaseHandler')

const customerSchema = new mongoose.Schema({
    Name: {type: String , required: true},
    EmailAddress: {type: String , required: true},
    Contact: {type: Number, required: true},
    Remarks: String,
    CheckInStatus: Boolean,
    Status: String,
    Room: String,
    RegistrationTime: String
})

const roomSchema = new mongoose.Schema({
    EmailAddress: {type: String , required: true},
    Customer: customerSchema
})

const customer = mongoose.model('customer' , customerSchema ,'customer' )
const premierRoom = mongoose.model('premierRoom' , roomSchema ,'premierRoom')
const deluxeRoom = mongoose.model('deluxeRoom' , roomSchema , 'deluxeRoom')


//Insert a dummy customer into deluxeRoom during first start up
const deluxeRoom_test = new waitList_handler(deluxeRoom);

async function insertDummyCustomer(){
    const d = new Date();
    let time = d.toLocaleTimeString();

    dummyCustomer = {
        Name: "Christopher", 
        EmailAddress: "Christopher@gmail.com",
        Contact: 123456789,
        Remarks: "Extra Blanket",
        CheckInStatus: false,
        Status: "Queuing",
        Room: "deluxeRoom",
        RegistrationTime: time
    }

    const result = await deluxeRoom_test.findAll()
    if (result.length < 1) {
        await deluxeRoom_test.insertOne(dummyCustomer)
    }
    
}

insertDummyCustomer();


module.exports = {Customer_: customer , DeluxeRoom_: deluxeRoom , PremierRoom_: premierRoom};