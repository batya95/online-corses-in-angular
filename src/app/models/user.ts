export class User {
  constructor(
    public name: string,
    public address: string,
    public email: string,
    public password: string,
    public isLecturer: boolean = false,
    public id?: number
  ) {}
}

  
