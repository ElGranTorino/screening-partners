<template>
    <div :class="[
        `toast toast--position-${position}`,
        running ? 'toast--running' : '' 
      ]" 
      v-if="display">
      <div class="toast__progress"></div>
      <div class="toast__wrap">
        <div class="toast__body">
          {{message}}
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'V-Toast',
    props: {
      message: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      display: {
        type: Boolean,
        required: false,
        default: false
      },
      running: {
        type: Boolean,
        required: false,
        default: false,
      }
    }
}
</script>
<style>
    
</style>