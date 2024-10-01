import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterDTO{
    user_name: string;
    password: string;
    role_id: number;

    constructor(data: any){
        this.user_name=data.user_name;;
        this.password=data.password;
        this.role_id=data.role_id || 2;
    }
}