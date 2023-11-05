import axios from 'axios';
import { apiUrl } from '../../config';

type Category = {

}

export function getAll() {
  return axios.get<Category[]>(apiUrl+'/categories');
}
