/**
 * @author Christian Brel <ch.brel@gmail.com>
 * @author Vincent Forquet
 * @author Nicolas Forget
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';

// Import TUIOManager
import TUIOManager from 'tuiomanager/core/TUIOManager';

import buildMenu from './menu';

/** TUIOManager starter **/
const tuioManager = new TUIOManager();
tuioManager.start();

/** App Code **/

const buildApp = () => {
  $('#app').css('width', `${1920}px`);
  $('#app').css('height', `${1080}px`);
  $('#app').append('<div id="example-container" style="position: relative;"> </div>');
  buildMenu();
};

$(window).ready(() => {
  buildApp();
});
