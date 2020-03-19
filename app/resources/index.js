import Airtable from 'airtable';

import excerpt from './excerpt';
import textSource from './textSource';
import author from './author';
import meal from './meal';
import theft from './theft';
import intrusion from './intrusion';
import sourceContent from './sourceContent';
import emergency from './emergency';
import foodItem from './foodItem';
import measurement from './measurement';

const apiKey = 'keyXl84W0rtRUuOEV';

const base = new Airtable({
  apiKey,
}).base('appO4vBVgVx66KFPX');

export default {
  airtable: base,
  author,
  sourceContent,
  excerpt,
  foodItem,
  theft,
  intrusion,
  emergency,
  meal,
  measurement,
  textSource,
};
