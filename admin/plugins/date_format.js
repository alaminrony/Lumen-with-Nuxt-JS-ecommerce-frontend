import Vue from 'vue'

export default () => {
  Vue.filter('date_format', function (value) {
     if (!value) return ''
     return Intl.DateTimeFormat("us-EN").format(new Date(value))
  })
}