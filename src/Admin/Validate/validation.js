import validator from "validator";

export function ValidateData(data, rules){
    let errors = {};
    Object.keys(data).forEach(field => {
        if(rules.hasOwnProperty(field)){
            let fieldErrors = [];
            let val = data[field];
            if(rules[field].true){

            } else {
                if(rules[field].required && validator.isEmpty(val)){
                    fieldErrors.push("Yêu cầu điền thông tin!");
                }
                if(!validator.isEmpty(data[field])){
                    if(rules[field].minlength && !validator.isLength(val, rules[field].minlength)){
                        fieldErrors.push(`Nhập vào ít nhất ${ rules[field].minlength } ký tự`);
                    }
                    if(rules[field].alpha && !validator.isAlpha(val.split(" ").join(""))){
                        fieldErrors.push("Tên chỉ được phép chứa ký tự");
                    }
                    if(rules[field].email && !validator.isEmail(val)){
                        fieldErrors.push("Email không hợp lệ!");
                    }
                    if(rules[field].number && !validator.isNumeric(val)){
                        fieldErrors.push("Số điện thoại chỉ bao gồm ký tự số");
                    }
                    if(rules[field].equals && !validator.equals(val, data[rules[field].equals])){
                        fieldErrors.push("Mật khẩu xác nhận không khớp!");
                    }
                }
            }
            if(fieldErrors.length > 0){
                errors[field] = fieldErrors;
            }
        }
    })
    return errors;
} 

