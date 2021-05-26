<template lang="pug">
.hello
  h1 {{ str }}
</template>

<script>
export default {
  name: 'PairSymbolsParser',
  props: {
    str: String,
  },
  data() {
    return {
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
    isPairBracket: () => this.bracketSymbolIndex >= 0,
    isPairQuote: () => this.quoteSymbolIndex >= 0,
    isPairSymbol: () => this.isPairBracket || this.isPairQuote,
  },
  methods: {
    isComparedSymbol() {
      const lastStackElem = stack[stack.length - 1];

      if (!lastStackElem) {
        return false;
      }

      return (
        lastStackElem == openingBrackets[bracketSymbolIndex] ||
        lastStackElem == quotes[quoteSymbolIndex]
      );
    },

    setVars(localIsOpening, isBracket = true) {
      if (isBracket) {
        quoteSymbolIndex = -1;
      } else {
        bracketSymbolIndex = -1;
      }

      isOpening = localIsOpening;
    },

    findPairSymbolIndex(symbol) {
      bracketSymbolIndex = openingBrackets.indexOf(symbol);

      if (isPairBracket()) {
        setVars(true);
        return;
      }

      bracketSymbolIndex = closingBrackets.indexOf(symbol);

      if (isPairBracket()) {
        setVars(false);
        return;
      }

      quoteSymbolIndex = quotes.indexOf(symbol);

      if (isPairQuote()) {
        if (!isComparedSymbol()) {
          setVars(true, false);
        } else {
          setVars(false, false);
        }
      }
    },

    parsePairSymbols() {
      let curSymbol;

      stack.length = 0;

      for (let i = 0; i < str.length; i++) {
        curSymbol = str[i];

        findPairSymbolIndex(curSymbol);

        console.log(curSymbol);
        console.log(bracketSymbolIndex);
        console.log(quoteSymbolIndex);
        console.log(isOpening);
        console.log(stack);
        console.log(isComparedSymbol());

        if (isPairSymbol()) {
          if (isOpening) {
            stack.push(curSymbol);
          } else if (isComparedSymbol()) {
            if (!stack.pop(curSymbol)) {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      if (stack.length) {
        return false;
      }

      return true;
    },
  },

  // const str = '[](([ghjghjg]"hjghjdfg"))';

  // console.log(parsePairSymbols(str));
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
