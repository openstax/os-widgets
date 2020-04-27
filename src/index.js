import './index.scss'
import ko from 'knockout';
import osMultiSelect from './os-multi-select/os-multi-select';

const grouped = document.querySelector('select');
const ungrouped = document.querySelector('select.ungrouped');

window.ko = ko;
osMultiSelect(grouped);
osMultiSelect(ungrouped);
