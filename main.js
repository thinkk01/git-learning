function Validator(options){
    const formElemnt = document.querySelector(options.form);
    if(formElemnt){
        options.rules.forEach(function(rule){
            const inputElement = formElemnt.querySelector(rule.selector);
            
            const errorElement = inputElement.parentElement.querySelector('.form-message')
    
            if(inputElement){
                inputElement.onblur = function(){
                    const errorMessage = rule.test(inputElement.value)
                    if(errorMessage){
                        errorElement.innerText = errorMessage
                        inputElement.parentElement.classList.add('invalid')
                    }else{
                        errorElement.innerText = ''
                        inputElement.parentElement.classList.remove('invalid')
                    }
                }
            }
        })
    }
}
Validator.isRequired = function(selector){
    return {
        selector : selector,
        test: function(value){
            return value ? undefined : 'Vui lòng nhập fullname.'
        }
    };
}
Validator.isEmail = function(selector){
    return {
        selector : selector,
        test: function(value){
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email.'
        }
    }
}
Validator.minLength = function(selector,minLength){
    return{
        selector : selector,
        minLength : minLength,
        test : function(value){
                return value.length>=minLength? undefined : `Vui lòng nhập tối thiểu ${minLength} kí tự.`
            }
    }
}