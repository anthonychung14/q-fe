/**
 * Asynchronously loads the component for ViewCards
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
