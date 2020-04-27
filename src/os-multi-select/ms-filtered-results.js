function VM(props) {
    Object.assign(this, props);
    const vm = this;
    this.results = ko.pureComputed(function () {
        return vm.options().map((opt) => Object.assign({}, opt, {
            groups: opt.groups ? opt.groups.split(/\s*,\s*/) : []
        }));
    });
    const groups = ko.pureComputed(function () {
        console.info("Computing groups from", vm.results().map((opt) => opt.groups));
        const s = new Set(vm.results().map((opt) => opt.groups).reduce((a,b) => a.concat(b), []));

        return Array.from(s.values()).filter((v) => typeof v !== 'undefined').sort();
    });

    this.filteredGroups = ko.pureComputed(function () {
        console.info("Groups:", groups());
        return groups().filter(
            (g) => g.toLowerCase().includes(vm.filter().toLowerCase())
        ).map((g) => {
            return {
                name: g,
                results: vm.results().filter((r) => r.groups.includes(g))
            }
        });
    });
    this.filteredResults = ko.pureComputed(function () {
        return vm.results().filter(
            (opt) => opt.label.toLowerCase().includes(vm.filter().toLowerCase())
        );
    });
    this.groupedResults = ko.pureComputed(function () {
        console.info("Grouped?", groups());
        return groups().length > 0;
    });
}

export default {
    viewModel: VM,
    template: `
    <div class="filtered-results">
        <!-- ko if: groupedResults -->
            <!-- ko foreach: filteredGroups -->
                <div class="group-heading" data-bind="text:name"></div>
                <div class="results" data-bind="foreach: results">
                    <div class="result" data-bind="text: $data.label, click: $parents[1].onClick, css: {selected: $data.selected}"></div>
                </div>
            <!-- /ko -->
        <!-- /ko -->
        <!-- ko ifnot: groupedResults -->
            <div class="results" data-bind="foreach: filteredResults">
                <div class="result" data-bind="text: $data.label, click: $parent.onClick, css: {selected: $data.selected}"></div>
            </div>
        <!-- /ko -->
    </div>
    `
};
