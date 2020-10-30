function validateSignUp(type)
{
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword')
    
    if((email.value == "" || email.value == null) && (type == 'email' || type =="finalValidate"))
    {
        alert('Email is mandatory!')
        return false;
    }
    if((username.value == "" || username.value == null) && (type == 'username'|| type =="finalValidate"))
    {
        alert('Name is mandatory');
        return false;
    }
    if((password.value == "" || password.value == null) && (type == 'password' || type=="finalValidate"))
    {
        alert('Password is mandatory!');
        return false;
    }
    if((confirmPassword.value == "" || confirmPassword.value == null) && (type == 'confirmPassword' || type=="finalValidate"))
    {
        alert('Confirm Password is mandatory!');
        return false;
    }
    if(password.value != confirmPassword.value)
    {
        alert('Password and Confirm Password should be same!')
        return false;
    }
    // if(password.value == "" || email.value == "" || password.value == "" || confirmPassword == "")
    // {
    //     alert("Please fill all the details!");
    //     return false;
    // }
    return true;
}

function validateLogin()
{
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if(email.value == "" || email.value == null)
    {
        alert('Email is mandatory!');
        return false;
    }
    if(password.value == "" || password.value == null)
    {
        alert('Password is mandatory!')
        return false;
    }
    return true;
}

function validateFeedback()
{
    const name= document.getElementById('name');
    const email= document.getElementById('email');
    const feedbackType = document.getElementById('feedbackType');
    const comment = document.getElementById('comments');

    if(name.value == "" || name.value == null)
    {
        alert('Name is mandatory!');
        return false;
    }
    if(email.value == "" || email.value == null)
    {
        alert('Email is mandatory!');
        return false;
    }
    if(feedbackType.value == "" || feedbackType.value == null)
    {
        alert('Feedback is mandatory!');
        return false;
    }
    if(comment.value == "" || comment.value ==  null)
    {
        alert('Comment is mandatory!');
        return false;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return true;
}

