<template>
  <div class="promo container">
    <div class="promo__banner">
      <h1 class="promo__title">
        {{ banner.title }}
      </h1>
      <p class="promo__text">
        {{ banner.descr }}
      </p>
      <base-button>{{ banner.button }}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        title: "Test assignment for front-end developer",
        descr:
          "What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.",
        button: "Sign up",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$promo-height-mobile: 500px;
$promo-height-desktop: 650px;

.promo {
  height: $promo-height-mobile;
  color: $light;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/src/assets/promo.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  flex: 0 1 auto;

  @include lg {
    height: $promo-height-desktop;
  }

  &__banner {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 0 auto;
    justify-content: flex-start;
    align-items: center;
    padding: 40px 0 0;
    max-width: 100%;
    overflow: hidden;

    @media (min-width: 380px) {
      max-width: 380px;
    }

    @include md {
      padding-top: 0;
      justify-content: center;
    }
  }

  &__title,
  &__text {
    text-align: center;
  }

  &__text {
    margin-bottom: 32px;
  }
}
</style>
