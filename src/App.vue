<template>
  <div id="app">
    <div>
      Data: {{ example }}
    </div>

    <button @click="doTest">Test</button>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'app',

  data() {
    return {
      example: ''
    }
  },

  methods: {
    async doTest () {
      try {
        const res = await axios.post(
          'http://localhost:8000/graphql', {
          query: '{ links { url } }'
        })
        this.example = res.data.data.language
      } catch (e) {
        console.log('err', e)
      }
    }
  },
}

</script>