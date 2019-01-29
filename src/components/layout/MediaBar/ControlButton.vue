<template>
  <div :class="'media-controls ' + icon">
    <div class="control-buttons">
      <div :class="icon + ' button'" v-if="icon === 'repeat'">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.7778 20H62.2222V32L80 16L62.2222 0V12H8.88889V36H17.7778V20ZM62.2222 60H17.7778V48L0 64L17.7778 80V68H71.1111V44H62.2222V60Z" fill="currentColor"></path>
        </svg>
      </div>
      <div :class="icon + ' button'" v-if="icon === 'more'">
        <svg width="122" height="30" viewBox="0 0 122 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M106.868 30C115.225 30 122 23.2843 122 15C122 6.71573 115.225 0 106.868 0C98.5112 0 91.7364 6.71573 91.7364 15C91.7364 23.2843 98.5112 30 106.868 30Z" fill="currentColor"></path>
          <path d="M15.1318 30C23.4888 30 30.2636 23.2843 30.2636 15C30.2636 6.71573 23.4888 0 15.1318 0C6.77473 0 0 6.71573 0 15C0 23.2843 6.77473 30 15.1318 30Z" fill="currentColor"></path>
          <path d="M61.4729 30C69.8299 30 76.6046 23.2843 76.6046 15C76.6046 6.71573 69.8299 0 61.4729 0C53.1158 0 46.3411 6.71573 46.3411 15C46.3411 23.2843 53.1158 30 61.4729 30Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if="icon === 'shuffle'" class="button">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.85 47.075L0 72.925L7.075 80L32.925 54.15L25.85 47.075ZM0 27.5L10.225 17.275L72.925 80L80 72.925L17.275 10.2L27.5 0H0L0 27.5ZM47.075 25.85L54.15 32.925L69.8 17.275L80 27.5V0H52.5L62.725 10.225L47.075 25.85Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if=" icon ==='skip'" class="button">
        <svg width="130" height="78" viewBox="0 0 130 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M70.6092 42.4403L8.69825 76.3448C4.32858 78.7379 0.775456 76.8237 0.769492 72.0728L0.683601 5.36896C0.677637 0.617965 4.24806 -1.34103 8.65113 0.997215L70.5489 33.8676C74.952 36.2059 74.9794 40.0471 70.6092 42.4403Z" fill="currentColor"></path>
          <path d="M125.844 42.4402L63.9326 76.3448C59.563 78.7379 56.0098 76.8237 56.0039 72.0727L55.918 5.36893C55.912 0.617941 59.4824 -1.34105 63.8855 0.997192L125.783 33.8676C130.186 36.2058 130.214 40.0471 125.844 42.4402Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if="icon === 'play'" class="play button">
        <svg class="play" width="103" height="103" viewBox="0 0 102 107" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M97.1524 58.8029L54.5161 81.9192L11.8789 105.036C5.86029 108.3 0.966371 105.689 0.958156 99.2109L0.899005 53.7306L0.839854 8.25114C0.831638 1.77251 5.74938 -0.898842 11.814 2.28967L54.4413 24.7009L97.0695 47.113C103.134 50.3015 103.172 55.5395 97.1524 58.8029Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if="icon === 'pause'" class="pause button">
        <svg width="103" height="103" viewBox="0 0 101 103" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.83853 0H35.4826C38.153 0 40.3211 2.20859 40.3211 4.9289V97.7565C40.3211 100.477 38.153 102.685 35.4826 102.685H4.83853C2.1681 102.685 0 100.477 0 97.7565V4.9289C0 2.20859 2.1681 0 4.83853 0ZM65.3202 0H95.9642C98.6346 0 100.803 2.20859 100.803 4.9289V97.7565C100.803 100.477 98.6346 102.685 95.9642 102.685H65.3202C62.6497 102.685 60.4816 100.477 60.4816 97.7565V4.9289C60.4816 2.20859 62.6497 0 65.3202 0Z" fill="currentColor"></path>
        </svg>
      </div>
      <div class="button" v-if="icon === 'back'" onclick="back();">
        <svg width="130" height="78" viewBox="0 0 130 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M70.6092 42.4403L8.69825 76.3448C4.32858 78.7379 0.775456 76.8237 0.769492 72.0728L0.683601 5.36896C0.677637 0.617965 4.24806 -1.34103 8.65113 0.997215L70.5489 33.8676C74.952 36.2059 74.9794 40.0471 70.6092 42.4403Z" fill="currentColor"></path>
          <path d="M125.844 42.4402L63.9326 76.3448C59.563 78.7379 56.0098 76.8237 56.0039 72.0727L55.918 5.36893C55.912 0.617941 59.4824 -1.34105 63.8855 0.997192L125.783 33.8676C130.186 36.2058 130.214 40.0471 125.844 42.4402Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if="icon === 'save'" class="save button">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 45.7143H45.7143V80H34.2857V45.7143H0V34.2857H34.2857V0H45.7143V34.2857H80V45.7143Z" fill="currentColor"></path>
        </svg>
      </div>
      <div v-if="icon === 'saved'" class="saved button">
        <svg width="90" height="80" viewBox="0 0 90 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.584 63.1234L7.24197 38.2557L-1.95236e-07 46.694L28.584 80L90 8.43832L82.758 2.27488e-07L28.584 63.1234Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "control-button",
  props: ["icon"]
}
</script>

<style lang='less' scoped>
</style>
