const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/* User schema */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trimt: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

/* Hasch funktion för lösenord */
userSchema.pre('save', async function(next) {
    try{
        if(this.isNew || this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            
        }
        next()

    } catch(error) {
        next(error);
    }
});

/* Registrera användare */
userSchema.statics.register = async function(username, password) {
    try {
        const user = new this({ username, password});
        await user.save();
        return user;
    } catch(error) {
        throw error;
    }
};

/* Jämför hashat lösenord */
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw error;
    }
}

/* Logga in användare */
userSchema.statics.login = async function(username, password) {
    try {
        const user = await this.findOne({ username });
        if(!user) {
            throw new Error('Fel användarnamn/lösenord')
        }

        const isPasswordMatch = await user.comparePassword(password);

        /* Validering */
        if(!isPasswordMatch) {
            throw new Error('Fel användarnamn/lösenord')
        }

        return user;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;