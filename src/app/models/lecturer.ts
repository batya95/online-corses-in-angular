export class Lecturer {
    constructor(
      public id: number,
      public name: string,
      public address: string,
      public email: string,
      public password: string,
      public isLecturer: boolean = true
    ) {}
  }
  