module.exports = mongoose =>  {
 const Schema = mongoose.Schema;
 UserSchema =  new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
         required: true
    },
    status: {
         type: String, 
         default: 'active'
    }
 });

 UserSchema.method("toJSON", function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
 });

 const User =  mongoose.model("User", UserSchema);
 //j

 return User ;
}