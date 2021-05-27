<template lang="pug">
.container
  .row
    .input-group.input-group-lg
      input.form-control(
        type='text',
        aria-label='Sizing example input',
        aria-describedby='inputGroup-sizing-lg',
        v-model='str'
      )
    h1 {{ getSet }}
    hr
    h1 {{ strLength }} : {{ count }}
</template>

<script>
export default {
  name: 'TransformToSet',
  data() {
    return {
      str: '112344566789',
      uniquas: {},
      count: 0,
    };
  },
  computed: {
    strLength() {
      return this.str.length;
    },
    getSet() {
      const $vm = this;
      const result = [];

      $vm.count = 0;
      $vm.uniquas = {};

      for (let i = 0; i < $vm.str.length; i++) {
        result.push($vm.str[i]);
      }

      return result
        .filter(item => {
          $vm.count++;

          if (Object.prototype.hasOwnProperty.call($vm.uniquas, item)) {
            $vm.uniquas[item] = false;
          } else {
            $vm.uniquas[item] = true;
          }

          return $vm.uniquas[item];
        })
        .filter(item => {
          $vm.count++;
          return $vm.uniquas[item];
        });
    },
  },
};
</script>
