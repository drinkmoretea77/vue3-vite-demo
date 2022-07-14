<template>
  <div class="container">
    <section class="user-form">
      <div class="user-form__form-container">
        <h2>Working with POST request</h2>
        <v-form class="user-form__form">
          <v-text-field
            v-model="username"
            variant="outlined"
            label="Your name"
            class="base-input"
            hint="Please enter your name"
            :rules="[rules.required, rules.counter]"
          ></v-text-field>
          <v-text-field
            v-model="email"
            variant="outlined"
            label="Email"
            class="base-input"
            hint="Please enter your email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            variant="outlined"
            label="Phone"
            class="base-input"
            hint="Please enter your phone (+380 xx xxx xxxx)"
            v-maska="'+380 ## ### ####'"
            :rules="[rules.required, rules.phone]"
          ></v-text-field>
          <span class="user-form__label">Select your position</span>
          <v-radio-group v-model="position" class="base-radio">
            <v-radio label="Frontend developer" value="frontend"></v-radio>
            <v-radio label="Backend developer" value="backend"></v-radio>
            <v-radio label="Designer" value="designer"></v-radio>
            <v-radio label="QA" value="qa"></v-radio>
          </v-radio-group>
          <v-file-input
            v-model="avatar"
            accept="image/*"
            label="Upload your photo"
            class="base-file-input"
            show-size
            :rules="[rules.required, rules.img_size]"
          ></v-file-input>
          <div class="spinner-container">
            <base-spinner></base-spinner>
          </div>
          <div class="user-form__submit">
            <base-button disabled>Sign up</base-button>
          </div>
        </v-form>
      </div>
      <div class="user-form__success-container">
        <h2>User successfully registered</h2>
        <div class="imgSuccess">
          <img
            class="imgSuccess__img"
            :src="imgSuccess"
            alt="register success"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { maska } from "maska";
import imgSuccess from "../../assets/success-image.svg";
import BaseSpinner from "../UI/BaseSpinner.vue";

export default {
  directives: { maska },
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
  components: { "base-spinner": BaseSpinner },
  data() {
    return {
      imgSuccess,
      username: null,
      email: null,
      phone: null,
      position: null,
      avatar: [],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        img_size: (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 20000 ||
            "Avatar size should be less than 2 MB!"
          );
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const phone_pattern =
            /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm;
          return phone_pattern.test(value) || "Invalid phone.";
        },
      },
      data() {
        return {
          primaryColor: "#00bdd3",
          red: "red",
        };
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.user-form {
  margin-bottom: 50px;

  &__label {
    display: block;
    margin: 0 0 10px;
  }
  .base-input:not(:last-child) {
    margin-bottom: 12px;
  }
  .base-input:last-child {
    margin-bottom: 5px;
  }
  .base-file-input {
    margin-top: 5px;
  }
  &__submit {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

.imgSuccess {
  display: flex;
  justify-content: center;

  &__img {
    display: block;
    max-width: 328px;
    height: auto;
  }
}
.spinner-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
