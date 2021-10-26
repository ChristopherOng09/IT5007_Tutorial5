class waitList_handler{
    constructor(model_){
        this.model = model_
    
    }

    async findOne(query){
        const result = await this.model.findOne(query);
        return result
    }

    async findAll(){
        const result = await this.model.find({});
        return result
    }

    async deleteOne(query){
        const exists = await this.model.exists(query)
        if (exists){
            await this.model.deleteOne(query)
            return true
        }
        return false
    }

    async insertOne(new_customer){
        const temp_ = {
            EmailAddress: new_customer.EmailAddress,
            Customer: new_customer
        }

        const exists = await this.model.exists({EmailAddress: new_customer.EmailAddress})

        if (!exists){
            const temp = new this.model(temp_);
            temp.save()
        }
        //return false if save to database fail due to customer alr in records
        return !exists
        
       
    }

    async deleteMany(){
        await this.model.deleteMany({'Customer.CheckInStatus' : {$in: [true]}})
    }


    async updateCheckInStatus(query){
        const customerRecords = await this.findOne(query)
        const checkInStatus = customerRecords.Customer.CheckInStatus
        const result = await this.model.updateOne(query , {$set: {"Customer.CheckInStatus": !checkInStatus}})
        if (result.modifiedCount > 0) {
            console.log("Number of records checkInStatus modified: " + result.modifiedCount);
            return true
        }
        return false
     }


    async updateCustomerStatus(query , newStatus){
        const customerRecords = await this.findOne(query)
        const currentStatus = customerRecords.Customer.CheckInStatus
        const result = await this.model.updateOne(query , {$set: {"Customer.Status": newStatus}})
        if (result.modifiedCount > 0) {
            console.log("Number of records status modified: " + result.modifiedCount);
            return true
        }
        return false
    } 
}

module.exports = waitList_handler;