import Marionette from 'backbone.marionette'
import template from './contactcard-tpl.html'
import RepositoriesView from './repositories-view'

export default Marionette.View.extend({
  attributes: {
    id: 'contact-view'
  },

  className: 'col-md-6',

  template: template,

  modelEvents: {
    change: 'render',
    'change:rating': 'updateRating'
  },

  regions: {
    repositories: '.repositories-view'
  },

  ensureChildView(regionName, ViewClass, options) {
    if (!this.getRegion(regionName).hasView()) {
      this.showChildView(regionName, new ViewClass(options))
    }
  },

  _reInitRegions() {},

  onRender() {
    // do not rerender repositories view
    this.ensureChildView('repositories', RepositoriesView, {model: this.model})
    if (!this.ratingInitialized) {
      this.$('#contact-rating').barrating({
        initialRating: this.model.get('rating'),
        theme: 'fontawesome-stars',
        onSelect: (value) => {
          this.model.set('rating', +value)
        }
      })
      this.ratingInitialized = true
    }
  },

  templateContext() {
    return {
      ratingInitialized: this.ratingInitialized
    }
  },

  updateRating() {
    this.$('#contact-rating').barrating('set', this.model.get('rating'))
  },

  onDestroy() {
    this.$('#contact-rating').barrating('destroy')
  }
})