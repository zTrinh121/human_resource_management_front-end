import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    email: string;


    role_id: number = 2;

    constructor(data: any){
        this.user_name=data.user_name;;
        this.password=data.password;
        this.email=data.email;
        this.role_id=data.role_id || 2;
    }
}