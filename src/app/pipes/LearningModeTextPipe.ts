import { Pipe, PipeTransform } from '@angular/core';
import { LearningMode } from '../models/course';

@Pipe({
    name: 'learningModeText',
    standalone: true
  })
  export class LearningModeTextPipe implements PipeTransform {
    transform(mode: LearningMode): string {
      switch (mode) {
        case LearningMode.Frontal:
          return 'פרונטלי';
        case LearningMode.Zoom:
          return 'זום';
        default:
          return '';
      }
    }
  }
  