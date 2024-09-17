import { Pipe, PipeTransform } from '@angular/core';
import { LearningMode } from '../models/course';

@Pipe({
  name: 'learningModeIcon',
  standalone: true
})
export class LearningModeIconPipe implements PipeTransform {
  transform(mode: LearningMode | number): string {
    switch (Number(mode)) {
      case LearningMode.Frontal:
        return '🏫';
      case LearningMode.Zoom:
        return '💻';
      default:
        return '';
    }
  }
  
}




