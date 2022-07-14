<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <a class="header__logo-link" href="/">
          <img class="logo__img" src="@/assets/Logo.svg" alt="Logo" />
        </a>
        <div class="header__buttons">
          <base-button>{{ buttons.user }}</base-button>
          <base-button>{{ buttons.signUp }}</base-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      buttons: {
        user: "User",
        signUp: "Sign up",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $light;

  &__inner {
    display: flex;
    flex: 0 1 auto;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;
  }

  &__logo {
    display: block;
    max-width: 104px;
    height: auto;
    margin-right: 20px;
  }

  &__logo-link {
    display: flex;
    align-items: center;
  }

  &__buttons {
    display: flex;
    flex: 0 1 auto;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 0 10px;
  }
}
</style>
