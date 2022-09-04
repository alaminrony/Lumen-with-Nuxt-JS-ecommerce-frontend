import Vue from 'vue'
import moment from 'moment';

export default () => {
  Vue.filter('dateFormat', function (value) {
     if (!value) return ''
     return moment(String(value)).format('YYYY-MM-DD')
    //  return Intl.DateTimeFormat("us-EN").format(new Date(value))
  })

  Vue.filter('dateTime', function (value) {
     if (!value) return ''
     return moment(String(value)).format('YYYY-MM-DD HH:mm')
    //  return Intl.DateTimeFormat("us-EN").format(new Date(value))
  })
}