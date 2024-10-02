import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export default class LoginDTO{
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(data: any){
        this.user_name=data.user_name;;
        this.password=data.password;
    }
    
}