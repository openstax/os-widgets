import msFilteredResultsSpec from './ms-filtered-results'
import msSelectionsSpec from './ms-selections'
import msToggleButton from './ms-toggle-button'
import './os-multi-select.scss'

function registerComponents () {
  if (registerComponents.isDone) {
    return
  }
  ko.components.register('ms-filtered-results', msFilteredResultsSpec)
  ko.components.register('ms-selections', msSelectionsSpec)
  ko.components.register('ms-toggle-button', msToggleButton)
  registerComponents.isDone = true
}
registerComponents.isDone = false

function getValuesFrom (selector) {
  const groups = Array.from(selector.querySelectorAll('optgroup'))
  const options = Array.from(selector.querySelectorAll('option'))

  function proxyForOptionSelected (opt) {
    const selected = ko.observable(opt.selected)

    selected.subscribe((newValue) => {
      opt.selected = newValue
      selector.dispatchEvent(new window.Event('change'))
    })

    return selected
  }

  if (groups.length > 0) {
    return options.reduce((a, b) => {
      const group = b.parentNode.label
      const foundOpt = a.find((opt) => b.value === opt.value)

      if (foundOpt) {
        foundOpt.groups.push(group)
        return a
      }

      return a.concat({
        label: b.textContent,
        value: b.value,
        selected: proxyForOptionSelected(b),
        groups: [group]
      })
    }, [])
  }

  return options.map((opt) => ({
    label: opt.textContent,
    value: opt.value,
    selected: proxyForOptionSelected(opt)
  }))
}

function htmlToElement (html) {
  const template = document.createElement('template')

  template.innerHTML = html.trim()
  return template.content.firstChild
}

export default function (originalSelector) {
  ko.options.deferUpdates = true

  const filter = ko.observable('')
  const options = ko.observableArray(getValuesFrom(originalSelector))
  const selections = ko.pureComputed(() =>
    options().filter((opt) => Boolean(opt.selected()))
  )
  const resultsShown = ko.observable(false)
  const vm = {
    options,
    filter,
    selections,
    placeholder: originalSelector.dataset.placeholder || '',
    toggleSelection (item) {
      item.selected(!item.selected())
    },
    resultsShown
  }
  const container = htmlToElement(`
        <div class="os-multiselect">
            <div class="selections-and-filter">
                <ms-selections params="selections: selections, filter: filter, placeholder: placeholder"></ms-selections>
                <ms-toggle-button params="isOpen: resultsShown"></ms-toggle-button>
            </div>
            <!-- ko if: resultsShown -->
                <ms-filtered-results params="options: options, filter: filter, onClick: toggleSelection"></ms-filtered-results>
            <!-- /ko -->
        </div>
    `)

  filter.subscribe((newValue) => {
    if (newValue !== '') {
      resultsShown(true)
    }
  })
  originalSelector.parentNode.insertBefore(container, originalSelector)
  originalSelector.style.display = 'none'
  registerComponents()
  ko.applyBindings(vm, container)
};
