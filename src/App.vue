<template>
  <v-app>
    <v-main class="main">
      <Header />
      <Promo />
      <Users />
      <UserForm />
    </v-main>
  </v-app>
  <span ref="ruler"></span>
</template>

<script>
import Header from "@/components/Layout/Header.vue";
import Promo from "@/components/Banners/Promo.vue";
import Users from "@/components/Users/UsersList.vue";
import UserForm from "@/components/Users/UserForm.vue";
import ellipsis from "@/components/Mixins/ellipsis.js";

export default {
  name: "App",

  mixins: [ellipsis],

  components: {
    Header,
    Promo,
    Users,
    UserForm,
  },

  data: () => ({}),
  
  provide() {
    return {
      checkEllipsis: this.checkEllipsis,
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: $bg-primary;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  font-family: Nunito, sans-serif;
}

#ruler {
  visibility: hidden;
  white-space: nowrap;
}
</style>
