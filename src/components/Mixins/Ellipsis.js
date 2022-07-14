const ellipsis = {
  methods: {
    visualLength(str) {
      this.$refs.ruler.innerHTML = str;
      const rulerWidth = this.$refs.ruler.offsetWidth;
      this.$refs.ruler.innerHTML = "";
      return rulerWidth;
    },
    trimToPx(str, length) {
      let tmp = str;
      let trimmed = str;

      if (length < this.visualLength("...")) return str;

      while (this.visualLength(trimmed) > length) {
        tmp = tmp.slice(0, -1);
        trimmed = tmp + "...";
      }

      return trimmed;
    },
    checkEllipsis(str, length) {
      return this.visualLength(str) > length;
    }
  },
};

export default ellipsis
