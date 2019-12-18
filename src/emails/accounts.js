const sgMail = require('@sendgrid/mail')

//const ApiKey ='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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'parmar.naitik1@gmail.com',
        subject:'WELCOME to task-application',
        text:`welcome mr/mrs ${name}. get along with the app`
    })
}
const sendRemoveEmail= (email,name )=>{
    sgMail.send({
        to:email,
        from:'parmar.naitik1@gmail.com',
        subject:'Help us to improve!',
        text:`mr/mrs ${name}.can we get your feedback for task-app.`
    })
}
module.exports={
    sendWelcomeEmail,
    sendRemoveEmail
}