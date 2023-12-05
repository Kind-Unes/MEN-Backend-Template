// Import your services here
const UserService = require("../services/user_services");

// Implement your controllers
exports.register = async (req, res, next) => {
    try {
        // get the req body
        const { email, password } = req.body;

        // validation test
        if (!email || !password) {
            throw new Error('Parameters are not correct');
        }

        // duplicates test
        const duplicate = await UserService.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`This email: ${email}, is already registered!`);
        }

        // Registering the user in the database
        const response = await UserService.registerUser(email, password);

        // sending back a response to the client
        res.status(200).json({ status: true, success: "You have been successfully registered!" });
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameters are not correct');
        }

        // Check if the user exists
        let user = await UserService.getUserByEmail(email);

        if (!user) {
            throw new Error('User does not exist');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new Error('Username or Password does not match');
        }

        // Creating Token
        let tokenData = { _id: user._id, email: user.email };
        const token = await UserService.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error); // Log the error for debugging
        next(error); // Pass the error to the error handler middleware
    }
};
