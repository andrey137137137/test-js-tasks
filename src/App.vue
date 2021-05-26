<template lang="pug">
#app
  img(alt='Vue logo', src='./assets/logo.png')
  PairSymbolsParser
</template>

<script>
import PairSymbolsParser from './components/PairSymbolsParser.vue';

export default {
  name: 'App',
  components: {
    PairSymbolsParser,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
