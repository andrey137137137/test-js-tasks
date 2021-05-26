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
      span.badge.bg-primary(:class='classes') Large
</template>

<script>
export default {
  name: 'PairSymbolsParser',
  data() {
    return {
      str: '[](([ghjghjg]"hjghjdfg"))',
      openingBrackets: '<([{',
      closingBrackets: '>)]}',
      quotes: '"`\'',
      stack: [],
      bracketSymbolIndex: -1,
      quoteSymbolIndex: -1,
      isOpening: false,
    };
  },
  computed: {
    isPairBracket() {
      return this.bracketSymbolIndex >= 0;
    },
    isPairQuote() {
      return this.quoteSymbolIndex >= 0;
    },
    isPairSymbol() {
      return this.isPairBracket || this.isPairQuote;
    },
    isComparedSymbol() {
      const lastStackElem = this.stack[this.stack.length - 1];

      if (!lastStackElem) {
        return false;
      }

      return (
        lastStackElem == this.openingBrackets[this.bracketSymbolIndex] ||
        lastStackElem == this.quotes[this.quoteSymbolIndex]
      );
    },
    classes() {
      const result = this.parsePairSymbols();
      return {
        'bg-success': result,
        'bg-danger': !result,
      };
    },
  },
  methods: {
    setVars(localIsOpening, isBracket = true) {
      if (isBracket) {
        this.quoteSymbolIndex = -1;
      } else {
        this.bracketSymbolIndex = -1;
      }

      this.isOpening = localIsOpening;
    },

    findPairSymbolIndex(symbol) {
      this.bracketSymbolIndex = this.openingBrackets.indexOf(symbol);

      if (this.isPairBracket) {
        this.setVars(true);
        return;
      }

      this.bracketSymbolIndex = this.closingBrackets.indexOf(symbol);

      if (this.isPairBracket) {
        this.setVars(false);
        return;
      }

      this.quoteSymbolIndex = this.quotes.indexOf(symbol);

      if (this.isPairQuote) {
        if (!this.isComparedSymbol) {
          this.setVars(true, false);
        } else {
          this.setVars(false, false);
        }
      }
    },

    parsePairSymbols() {
      let curSymbol;

      this.stack.length = 0;

      for (let i = 0; i < this.str.length; i++) {
        curSymbol = this.str[i];

        this.findPairSymbolIndex(curSymbol);

        if (this.isPairSymbol) {
          if (this.isOpening) {
            this.stack.push(curSymbol);
          } else if (this.isComparedSymbol) {
            if (!this.stack.pop(curSymbol)) {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      if (this.stack.length) {
        return false;
      }

      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
