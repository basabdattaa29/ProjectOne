const mongoose = require('mongoose');
const SchemaVariable = mongoose.Schema;

const RegistrationSchema = new SchemaVariable({
    EMail: {
        type: String,
        required: true
    },
    Passwd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Registration', RegistrationSchema);