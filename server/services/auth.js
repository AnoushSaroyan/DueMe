const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretOrkey = require("../../config/keys").secretOrkey;
const validateRegisterInputs = require("../validation/register");
const validateLoginInput = require("../validation/login");

// here we'll be taking in the `data` from our mutation
const register = async data => {
    try {
        const { message, isValid } = validateRegisterInputs(data);

        if (!isValid) {
            throw new Error(message);
        }

        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("This user already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(
            {
                name,
                email,
                password: hashedPassword
            },
            err => {
                if (err) throw err;
            }
        );

        user.save();
        // we'll create a token for the user
        const token = jwt.sign({ id: user._id }, secretOrkey);

        // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
        return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
        throw err;
    }
};

const logout = async id => {
    const user = await User.findById(id);

    return { 
        token: "",
        loggedIn: false,
        ...user._doc,
        password: null
    };
};

const login = async data => {
    try {
        // use our other validator we wrote to validate this data
        const { message, isValid } = validateLoginInput(data);

        if (!isValid) {
            throw new Error(message);
        }

        const { email, password } = data;
        const user = await User.findOne({email});

        // if user exists, then we want to compare the password
        // if user does not exist, we throw an error
        if (user) {
            const hashedPassword = user.password;
            if (bcrypt.compareSync(password, hashedPassword)){

                const token = jwt.sign({ id: user._id }, secretOrkey);
                return { token, loggedIn: true, ...user._doc, password: null };

            } else {
                throw new Error("Credentials do not match");
            }
        } else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        throw error;
    }

}

const verifyUser = async data => {
    try {
        // we take in the token from our mutation
        const { token } = data;
        // we decode the token using our secret password to get the
        // user's id
        const decoded = jwt.verify(token, secretOrkey);
        const { id } = decoded;

        // then we try to use the User with the id we just decoded
        // making sure we await the response
        const loggedIn = await User.findById(id).then(user => {
            return user ? true : false;
        });

        return { loggedIn };
    } catch (err) {
        // throw err;
        return { loggedIn: false };
    }
};

module.exports = { register, logout, login, verifyUser };