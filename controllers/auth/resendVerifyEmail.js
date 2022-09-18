const {User} = require("../../models/user");

const {RequestError, sendEmail} = require("../../helpers");

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(404, "Not found");
    }
    if(user.verify) {
        throw RequestError(400, "Verification has already been passed");
    };
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`
    };
    await sendEmail(mail);
    res.json({
        message: "Verification email sent"
    })
};

module.exports = resendVerifyEmail;