import { bootstrapApplication } from '@angular/platform-browser';
import { Welcome} from './app/welcome/welcome';

bootstrapApplication(Welcome)
  .catch(err => console.error(err));
