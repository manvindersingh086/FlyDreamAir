const sendGrid = require('@sendgrid/mail')
const sendGridAPIKey = process.env.SENDGRID_API_KEY
sendGrid.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email,name) => {
    sendGrid.send({
        to: email,
        from:'ms020@uowemail.edu.au',
        subject:'Thanks for joining in!',
        text:'Welcome to the app, ${name}. Let me know how you get along with the web app.'
    
    }).then(() => {
        res.redirect('/users');
    }).catch((error) => {
        console.log('error', error);
    });
}

const sendGoodByeMail = (email,name) => {
    sendGrid.send ({
        to: email,
        from:'ms020@uowmail.edu.au',
        subject:'Good Bye!',
        text:'GoodBye, ${name}. Is there anything we could have done to keep you on board?.'
    })
}
module.exports= {
    sendWelcomeEmail,
    sendGoodByeMail
}