const validator = require('validator');

module.exports = function validations(details){
    let errors;
    details.email = details.email ? details.email : ""
    details.name = details.name ? details.name : ""
    details.scale = details.scale ? details.scale : ""
    details.time = details.time ? details.time : ""
    details.emotion = details.emotion ? details.emotion : ""
    details.description = details.description ? details.description : ""
    details.place = details.place ? details.place : ""

    
    //name checks
    if(validator.isEmpty(details.name)){
        errors = "Name feild is required"
        return errors
    }else if(details.name.length < 3){
        errors = "Invalid Name"
        return errors
    }

    //email checks
    if(validator.isEmpty(details.email)){
        errors = "Email feild is required"
        return errors
    }else if(!validator.isEmail(details.email)){
        errors = "Invalid Email"
        return errors
    }

    //scale checks
    if(validator.isEmpty(details.scale)){
        errors = "Enter the scale from 1 - 10"
        return errors
    }else if(details.scale < 1 || details.scale > 10){
        errors = "scale must be in range 1 - 10"
        return errors
    }

    //place checks
    if(validator.isEmpty(details.place)){
        errors = "Place feild is required"
        return errors
    }

    //time checks
    if(validator.isEmpty(details.time)){
        errors = "Time feild is required"
        return errors
    }

    //emotion checks
    if(!details.emotion){
        errors = "Emotion feild is required"
        return errors
    }

    //textarea checks
    if(validator.isEmpty(details.description)){
        errors = "Description feild is required"
        return errors
    }

}