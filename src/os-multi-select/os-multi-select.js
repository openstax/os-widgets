import msFilterSpec from './ms-filter';
import msFilteredResultsSpec from './ms-filtered-results';
import msSelectionsSpec from './ms-selections';
import './os-multi-select.scss';

function registerComponents() {
    if (registerComponents.isDone) {
        return;
    }
    ko.components.register('ms-filter', msFilterSpec);
    ko.components.register('ms-filtered-results', msFilteredResultsSpec);
    ko.components.register('ms-selections', msSelectionsSpec);
    registerComponents.isDone = true;
}
registerComponents.isDone = false;

function getValuesFrom(selector) {
    const options = Array.from(selector.querySelectorAll('option'));

    return options.map((opt) => {
        const selected = ko.observable(opt.selected);

        selected.subscribe((newValue) => {
            opt.selected = newValue;
        });
        return {
            label: opt.textContent,
            value: opt.value,
            selected
        }
    });
}

function htmlToElement(html) {
    const template = document.createElement('template');

    template.innerHTML = html.trim();
    return template.content.firstChild;
}

export default function (originalSelector) {
    const filter = ko.observable('');
    const options = ko.observableArray(getValuesFrom(originalSelector));
    const selections = ko.pureComputed(() =>
        options().filter((opt) => Boolean(opt.selected()))
    );
    const vm = {
        options,
        prompt: 'Select one or more',
        filter,
        selections,
        filteredOptions: ko.pureComputed(
            () => options().filter(
                (opt) => !selections().includes(opt)
            )
        ),
        clearFilter() {
            filter('');
        },
        addSelection(item) {
            item.selected(true);
        }
    };
    const container = htmlToElement(`
        <div class="os-multiselect">
            <label data-bind="text:prompt"></label>
            <div class="selections-and-filter">
                <ms-filter params="filter: filter"></ms-filter>
                <ms-selections params="selections: selections"></ms-selections>
            </div>
            <ms-filtered-results params="options: filteredOptions, filter: filter, onClick: addSelection"></ms-filtered-results>
        </div>
    `);

    originalSelector.parentNode.insertBefore(container, originalSelector);
    originalSelector.style.display = 'none';
    registerComponents();
    ko.applyBindings(vm, container);
};
