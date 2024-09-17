export enum LearningMode {
  Frontal = 0,
  Zoom = 1
}

export class Course {
  constructor(
    public id: number,
    public name: string,
    public categoryId: number,
    public lessonsCount: number,
    public startDate: Date,
    public syllabus: string[],
    public learningMode: LearningMode,
    public lecturerId: number,
    public imagePath: string,
    public description: string
  ) { }
}
