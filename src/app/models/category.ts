export class Category {
    constructor(
      public id: number,
      public name: string,
      public iconPath: string
    ) {}

    
  }
  export const CATEGORIES: Category[] = [
    new Category(1, 'פיתוח תוכנה', 'fa-code'),
    new Category(2, 'עיצוב גרפי', 'fa-paint-brush'),
    new Category(3, 'ניהול פרויקטים', 'fa-tasks'),
    new Category(4, 'שיווק דיגיטלי', 'fa-bullhorn'),
    new Category(5, 'אבטחת מידע', 'fa-shield-alt'),
    new Category(6, 'ניתוח נתונים', 'fa-chart-bar'),
    new Category(7, 'UI/UX', 'fa-pencil-ruler'),
    new Category(8, 'DevOps', 'fa-server'),
    new Category(9, 'בינה מלאכותית', 'fa-robot'),
    new Category(10, 'פיתוח משחקים', 'fa-gamepad')
  ];
  
  