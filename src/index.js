import './index.scss'
import ko from 'knockout';
import osMultiSelect from './os-multi-select/os-multi-select';

const sel = document.querySelector('select');

window.ko = ko;
osMultiSelect(sel);
