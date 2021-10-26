
fakeCustomer = {
    name: "Christopher",
    email: "Christopher@gmail.com",
    contact: 92478796,
    remarks: null,
    time: "26 Oct 2021 10.00 PM",
    status: "Queuing",
    checkIn: false
}


function InitialiseDataBase() {
    db_ = connect("localhost:27017/Hotel_California_Waitlist");  
    db = db_.customer
    print("Successfully initialised and connected to database\n")
    print("Starting CRUD test\n")

    
    print("----------------Create Customer-----------------------")
    outcome = db.insertOne(fakeCustomer)
    print('Result of insert_id:', outcome.insertedId);
    print('\n')
    

    print("-------------Read Customer from Database-------------")
    let result = db.find({_id: outcome.insertedId})
    print('Result of find:', printjson(result[0]));
    print('\n')

    print("--------------Update Customer------------------------")
    print("Customer email before change: " + fakeCustomer.email)
    db.updateOne({_id: outcome.insertedId} , [{$addFields: {email: "Chris@gmail.com"} }])
    result = db.find({name: "Christopher"});
    print('Result of update (Customer new email):', result[0].email);
    print('\n')

    print("-------------Delete Customer------------------------")
    result = db.deleteOne({_id: outcome.insertedId});
    print("Delete acknowledgement: " + result.acknowledged)
    print("Deleted count: " + result.deletedCount)
    print('\n')
     
    print("End of CRUD test\n")
}

InitialiseDataBase();