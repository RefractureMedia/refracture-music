<template>
  <div v-bind:class="'sidebar sidebar_main sidebar_' + state">
    <div class="sidebar_top clear">
      <div class="sidebar_title sidebar_content">
        <banner/>
        <div class="sidebar_toggle_x" style="width: 15px;">
          <a v-if="state == 'open'" class="sidebar_toggle_x" v-on:click="sidebar_toggle">╳</a>
        </div>
      </div>
    </div>
    <div class="sidebar_content">
      <div class="top-items">
        <p v-bind:class="active('browse')">
          <router-link v-on:click.native="browse" to="../Browse/Search">Browse</router-link>
        </p>
        <p v-bind:class="active('library')">
          <router-link v-on:click.native="library" to="../Library/Songs">Library</router-link>
        </p>
        <p v-bind:class="active('visualizer')">
          <router-link v-on:click.native="visualize" to="../Visualizer">Visualizer</router-link>
        </p>
      </div>
      <div class="bottom-items">
        <div class="bottom-items-content">
          <div class="left">
            <p>
              <a>Settings</a>
            </p>
          </div>
          <div class="right">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.8879 0C13.8584 0 0 13.4583 0 30C0 46.5417 13.8584 60 30.8879 60C48.302 60 60 48.2938 60 30.8781V27.1392C60 25.9941 59.063 25.0674 57.9051 25.0674H33.126C31.9722 25.0674 31.0311 25.9941 31.0311 27.1392V34.6169C31.0311 35.758 31.9722 36.6887 33.126 36.6887H47.3691C45.4951 44.1907 39.7136 48.3747 30.8879 48.3747C20.4542 48.3747 11.964 40.1281 11.964 29.996C11.964 19.8638 20.4542 11.6213 30.8879 11.6213C34.8159 11.6213 38.6293 12.8069 41.8085 14.9919C42.1809 15.2468 42.6064 15.3763 43.0278 15.3763C43.6047 15.3763 44.1776 15.1376 44.5827 14.6803L49.6727 8.99919C50.4869 8.0928 50.3519 6.6806 49.3617 5.96034C44.0466 2.10413 37.5696 0 30.8879 0ZM30.8879 2.07176C37.0622 2.07176 43.1833 4.0464 48.1056 7.62746L43.0033 13.2884C39.4435 10.8443 35.2537 9.5495 30.8879 9.5495C23.8584 9.5495 17.635 12.9363 13.8175 18.1117L7.65139 13.5352C12.8928 6.59158 21.3543 2.07176 30.8879 2.07176ZM6.46072 15.2428L12.6678 19.8476C10.9002 22.8419 9.87316 26.3056 9.87316 30C9.87316 32.3712 10.311 34.6372 11.0761 36.7575L4.66448 41.508C3.02373 37.9957 2.09493 34.103 2.09493 30C2.09493 24.5859 3.69885 19.5279 6.46072 15.2428ZM24.689 15.7526C24.554 15.7567 24.4149 15.789 24.284 15.8457C23.752 16.0804 23.5147 16.6873 23.748 17.2093L24.599 19.103C24.775 19.4915 25.1555 19.7181 25.5606 19.7181C25.6997 19.7181 25.847 19.6898 25.9861 19.6291C26.5139 19.3984 26.7512 18.7874 26.5139 18.2614L25.6628 16.3717C25.4869 15.9792 25.0982 15.7486 24.689 15.7526ZM20.1023 18.9331C19.8363 18.9371 19.5704 19.0383 19.3699 19.2447C18.9689 19.6534 18.9771 20.3129 19.3944 20.7095L20.9002 22.15C21.1047 22.3442 21.3666 22.4373 21.6285 22.4373C21.9026 22.4373 22.1768 22.3321 22.3813 22.1257C22.7864 21.713 22.7741 21.0575 22.3568 20.6609L20.8511 19.2204C20.6424 19.0221 20.3723 18.925 20.1023 18.9331ZM17.0581 23.5703C16.653 23.5784 16.2684 23.8252 16.1047 24.2217C15.8879 24.7518 16.1457 25.3547 16.6817 25.5692L18.6252 26.3461C18.752 26.3947 18.8871 26.4189 19.018 26.4189C19.4313 26.4189 19.8241 26.1762 19.9877 25.7715C20.2046 25.2414 19.9468 24.6385 19.4108 24.4241L17.4673 23.6472C17.3322 23.5946 17.1972 23.5703 17.0581 23.5703ZM33.126 27.1392H57.9051V30.8781C57.9051 38.7605 55.3232 45.3763 50.8061 50.0944L45.0409 45.2064C47.1072 43.1022 48.5966 40.4073 49.4067 37.1824C49.5581 36.5673 49.419 35.9118 49.018 35.41C48.6211 34.9083 48.0155 34.6169 47.3691 34.6169H33.126V27.1392ZM16.0065 29.0046C15.4255 29.0046 14.9591 29.4659 14.9591 30.0405C14.9591 30.6151 15.4255 31.0763 16.0065 31.0763H18.1015C18.6825 31.0763 19.1489 30.6151 19.1489 30.0405C19.1489 29.4659 18.6825 29.0046 18.1015 29.0046H16.0065ZM19.0344 33.662C18.8953 33.6579 18.7602 33.6822 18.6252 33.7348L16.6817 34.5117C16.1457 34.7262 15.8879 35.3291 16.1047 35.8592C16.2684 36.2638 16.6612 36.5107 17.0745 36.5107C17.2054 36.5107 17.3404 36.4864 17.4673 36.4338L19.4108 35.6569C19.9468 35.4424 20.2046 34.8395 19.9877 34.3094C19.8241 33.9129 19.4394 33.666 19.0344 33.662ZM21.6489 37.6436C21.3789 37.6356 21.1088 37.7327 20.9002 37.9309L19.3944 39.3715C18.9771 39.768 18.9689 40.4276 19.3699 40.8363C19.5745 41.0467 19.8486 41.1519 20.1227 41.1519C20.3846 41.1519 20.6465 41.0548 20.8511 40.8605L22.3568 39.42C22.7741 39.0235 22.7823 38.368 22.3813 37.9552C22.1809 37.7529 21.9149 37.6477 21.6489 37.6436ZM11.9108 38.724C15.2864 45.6393 22.5123 50.4465 30.8879 50.4465C35.9738 50.4465 40.2414 49.095 43.4574 46.5983L49.2962 51.5471C44.644 55.6137 38.3306 57.9282 30.8879 57.9282C20.0082 57.9282 10.5237 52.0407 5.63011 43.3814L11.9108 38.724ZM25.581 40.3628C25.1719 40.3547 24.775 40.5854 24.599 40.9779L23.748 42.8716C23.5147 43.3936 23.752 44.0046 24.284 44.2352C24.419 44.2959 24.5622 44.3243 24.7054 44.3243C25.1064 44.3243 25.491 44.0936 25.6628 43.7092L26.5139 41.8195C26.7512 41.2935 26.5139 40.6825 25.9861 40.4518C25.8511 40.3912 25.716 40.3628 25.581 40.3628Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "./Banner.vue";

export default {
  name: "sidebar",
  props: ["state"],
  components: { Banner },
  data() {
    return {
      state: "open",
      currentCatagory: "Library",
      categories: ["Browse", "Library", "Visualize"],
      currentPage: "Songs"
    };
  },
  mounted() {
    this.me;
  },
  methods: {
    center_margin() {},
    sidebar_toggle() {
      if (this.$parent.state == "closed") {
        this.$parent.state = "open";
      } else {
        this.$parent.state = "closed";
      }
    },
    browse() {
      this.$parent.pages = ["Search", "Feed", "Popular"];
    },
    library() {
      this.$parent.pages = ["Songs", "Artists", "Albums", "Playlists"];
    },
    visualize() {
      this.$parent.pages = [""];
    },
    active(input) {
      if (this.$parent.$route.path.split("/")[1] == input) {
        return "currentCategory";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../variables.less";

.sidebar_title {
  float: left;
  margin-right: 2vw;
  & > img {
    min-width: 100px;
    width: 100%;
  }
}

.sidebar_content {
  display: block;
  margin-top: 2vh;
  margin-left: 1vw;
  & div > p {
    padding-left: 1rem;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    font-size: 1.3rem;
    transition: padding-left 0.1s;
    color: @accent-secondary;
    transition: color 0.05s;
    &:hover {
      padding-left: 1.6rem;
      transition: margin-left 0.1s;
      color: @accent-primary;
      transition: color 0.05s;
    }
    & > a {
      color: @accent-secondary;
      transition: color 0.05s;
      &:hover {
        text-decoration: none;
        color: @accent-primary;
        transition: color 0.05s;
      }
    }
    & .router-link-active {
      color: @accent-primary;
      &:hover {
        &::before {
          padding-left: 1rem;
        }
      }
    }
  }
  & > .bottom-items {
    display: flex;
    align-items: center;
    height: -webkit-fill-available;
    & .bottom-items-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    & .left {
      float: left;
    }
    & .right {
      width: 3vw;
      height: 3vw;
      background: @background-primary;
      border-radius: 1vw;
      padding: 0.3rem;
      float: right;
      margin-left: auto;
      margin-right: 1vw;
      color: @accent-secondary;
      cursor: pointer;
      transition: border-radius 0.05s;

      &:hover {
        color: @accent-primary;
        border-radius: 0.5vw;
        transition: border-radius 0.05s;
      }
    }
  }
}
</style>
</template>

<style lang="less" scoped>
@import "../../variables.less";

.sidebar_title {
  float: left;
  margin-right: 2vw;
  & > img {
    min-width: 100px;
    width: 100%;
  }
}

.sidebar_content {
  display: block;
  margin-top: 2vh;
  margin-left: 1vw;
  & div > p {
    padding-left: 1rem;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    font-size: 1.3rem;
    transition: padding-left 0.1s;
    color: @accent-secondary;
    transition: color 0.05s;
    &:hover {
      padding-left: 1.6rem;
      transition: margin-left 0.1s;
      color: @accent-primary;
      transition: color 0.05s;
    }
    & > a {
      color: @accent-secondary;
      transition: color 0.05s;
      &:hover {
        text-decoration: none;
        color: @accent-primary;
        transition: color 0.05s;
      }
    }
    & .router-link-active {
      color: @accent-primary;
      &:hover {
        &::before {
          padding-left: 1rem;
        }
      }
    }
  }
  & > .bottom-items {
    display: flex;
    align-items: center;
    height: -webkit-fill-available;
    & .bottom-items-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    & .left {
      float: left;
    }
    & .right {
      width: 3vw;
      height: 3vw;
      background: @background-primary;
      border-radius: 1vw;
      padding: 0.3rem;
      float: right;
      margin-left: auto;
      margin-right: 1vw;
      color: @accent-secondary;
      cursor: pointer;
      transition: border-radius 0.05s;

      &:hover {
        color: @accent-primary;
        border-radius: 0.5vw;
        transition: border-radius 0.05s;
      }
    }
  }
}
</style>

<script>
import Banner from "./Banner.vue";

export default {
  name: "sidebar",
  props: ["state"],
  components: { Banner },
  data() {
    return {
      state: "open",
      currentCatagory: "Library",
      categories: ["Browse", "Library", "Visualize"],
      currentPage: "Songs"
    };
  },
  mounted() {
    this.me;
  },
  methods: {
    center_margin() {},
    sidebar_toggle() {
      if (this.$parent.state == "closed") {
        this.$parent.state = "open";
      } else {
        this.$parent.state = "closed";
      }
    },
    browse() {
      this.$parent.pages = ["Search", "Feed", "Popular"];
    },
    library() {
      this.$parent.pages = ["Songs", "Artists", "Albums", "Playlists"];
    },
    visualize() {
      this.$parent.pages = [""];
    },
    active(input) {
      if (this.$parent.$route.path.split("/")[1] == input) {
        return "currentCategory";
      } else {
        return "";
      }
    }
  }
};
</script>


