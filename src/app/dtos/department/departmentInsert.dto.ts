import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class DepartmentInsertDTO{

    @IsString()
    @IsNotEmpty()
    department_name: string;

    @IsNumber()
    @IsNotEmpty()
    manager_id: number;

    constructor(data: any){
        this.manager_id=data.manager_id;
        this.department_name=data.department_name;
    }
    
}