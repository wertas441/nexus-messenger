

export function validateUserLogin(userLogin: string): string | null {
    const login = userLogin.trim();

    if (!login.trim()){
        return ('Пожалуйста, введите логин пользователя')
    }

    if (login.length < 3){
        return (`Логин должен содержать минимум 3 символов (сейчас ${login.length})`)
    }

    if (login.length > 15){
        return (`Логин может содержать максимум 15 символов (сейчас ${login.length})`)
    }

    const userNameRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if (!userNameRegex.test(login)) {
        return ('Логин может содержать только латинские буквы, цифры и некоторые спец.символы')
    }

    return null;
}

export function validateUserPassword(password: string): string | null {
    const pass = password.trim();

    if (!pass) {
        return ('Пожалуйста, введите ваш пароль');
    }

    if (pass.length < 8)  {
        return (`Пароль должен содержать минимум 8 символов (сейчас ${pass.length})`);
    }

    if (pass.length > 25){
        return (`Пароль может быть максимум 25 символов (сейчас ${pass.length})`);
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!passwordRegex.test(pass)) {
        return ('Пароль может содержать только латинские буквы, цифры и некоторые спец.символы')
    }

    return null;
}

export function validateUserEmail(email: string): string | null {
    if (!email.trim()){
        return ('Пожалуйста, введите ваш email');
    }

    return null;
}

export function validateUserConfirmPassword(password:string, confirmPassword:string):string | null {
    if (!password.trim()){
        return ('Пожалуйста, подтвердите ваш пароль');
    }

    if (password != confirmPassword){
        return ('Пароль не совпадает с тем, что вы ввели ранее')
    }

    return null;
}
