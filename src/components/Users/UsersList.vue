<template>
  <div class="container">
    <section class="users">
      <h2 class="users__heading">Working with GET request</h2>
      <div class="users__items">
        <article class="user" v-for="(user, idx) in users" :key="idx">
          <div class="user__avatar">
            <img
              class="user__img"
              :src="$image(user.avatar)"
              alt="User avatar"
            />
          </div>

          <tooltip
            :ref="'name' + idx"
            :text="user.name"
            :activated="checkActivated(user.id, 'name')"
          >
            <div class="user__name">
              <span class="user__label">
                {{ user.name }}
              </span>
            </div>
          </tooltip>

          <div class="user__info">
            <tooltip
              :ref="'address' + idx"
              :text="user.address"
              :activated="checkActivated(user.id, 'address')"
            >
              <div class="user__address">
                <span class="user__label">
                  {{ user.address }}
                </span>
              </div>
            </tooltip>

            <tooltip
              :ref="'position' + idx"
              :text="user.position"
              :activated="checkActivated(user.id, 'position')"
            >
              <div class="user__position">
                <span class="user__label">
                  {{ user.position }}
                </span>
              </div>
            </tooltip>

            <div class="user__phone">
              <span class="user__label">{{ user.phone }}</span>
            </div>
          </div>
        </article>
      </div>
      <div class="spinner-container">
        <base-spinner></base-spinner>
      </div>
      <div class="btn-more">
        <base-button :custom-width="120">Show more</base-button>
      </div>
    </section>
  </div>
</template>

<script>
import users from "@/store/usersData.js";
import tooltip from "../Utils/ToolTip.vue";
import BaseSpinner from "../UI/BaseSpinner.vue";

export default {
  components: {
    tooltip,
    "base-spinner": BaseSpinner,
  },
  inject: ["checkEllipsis"],
  data() {
    return {
      users,
      toolTipSize: 288,
      toolTipActive: [],
    };
  },
  methods: {
    addTooltips() {
      this.users.forEach((element) => {
        const addItem = (field) => {
          const checkEllipsis = this.checkEllipsis(
            element[field],
            this.toolTipSize
          );
          this.toolTipActive.push({
            [`id${element.id}${field}`]: checkEllipsis,
          });
        };

        addItem("name");
        addItem("address");
        addItem("position");
      });
    },
    checkActivated(id, field) {
      const result = this.toolTipActive.find(
        (item) => item[`id${id}${field}`]
      ) ? true : false;
      return result;
    },
  },
  mounted() {
    this.addTooltips();
  },
};
</script>

<style lang="scss" scoped>
.users {
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(328px, 1fr));
    grid-auto-rows: minmax(254px, auto);
    gap: 20px;

    @include md {
      grid-template-columns: repeat(auto-fit, minmax(344px, 1fr));
      gap: 16px;
    }

    @include lg {
      grid-template-columns: repeat(auto-fit, minmax(282px, 1fr));
      gap: 29px;
    }
    @include xl {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      gap: 29px;
    }
  }
}

.btn-more {
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
}

.user {
  background: $light;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  &__img {
    display: block;
    width: 70px;
    height: auto;
  }

  &__name,
  &__info {
    width: 100%;
    text-align: center;
  }

  &__label {
    @include ellipsis;
    display: block;
    margin: 0 auto;
  }
}

.articlewidth {
  display: block;
  visibility: hidden;
  width: 100%;
  max-width: 100%;
  height: 2px;
}

.spinner-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
}

</style>
