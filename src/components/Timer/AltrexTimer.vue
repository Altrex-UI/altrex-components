<template>
  <div
    class="altrex-timer"
    :class="[
      `altrex-timer--${variant}`,
      `altrex-timer--${size}`,
      { 'altrex-timer--running': isRunning },
      { 'altrex-timer--complete': isComplete }
    ]"
    role="timer"
    :aria-label="`Timer: ${formattedTime}`"
  >
    <!-- Circular Progress Visualization -->
    <div class="altrex-timer__visual">
      <svg
        class="altrex-timer__circle"
        :width="circleSize"
        :height="circleSize"
        :viewBox="`0 0 ${circleSize} ${circleSize}`"
      >
        <!-- Background circle -->
        <circle
          class="altrex-timer__circle-bg"
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
          fill="none"
        />
        <!-- Progress circle -->
        <circle
          class="altrex-timer__circle-progress"
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          fill="none"
        />
      </svg>

      <!-- Time Display -->
      <div class="altrex-timer__time">
        {{ formattedTime }}
      </div>
    </div>

    <!-- Preset Buttons -->
    <div v-if="showPresets" class="altrex-timer__presets">
      <AltrexButton
        v-for="preset in presets"
        :key="preset"
        size="xs"
        variant="ghost"
        :label="formatPresetLabel(preset)"
        @click="setTime(preset)"
        :disabled="isRunning"
      />
    </div>

    <!-- Control Buttons -->
    <div v-if="showControls" class="altrex-timer__controls">
      <AltrexButton
        v-if="!isRunning"
        :left-icon="'generic-play'"
        variant="fill"
        :size="size"
        aria-label="Start timer"
        @click="start"
        :disabled="timeRemaining === 0"
      />
      <AltrexButton
        v-else
        :left-icon="'generic-pause'"
        variant="fill"
        :size="size"
        aria-label="Pause timer"
        @click="pause"
      />
      <AltrexButton
        :left-icon="'generic-refresh'"
        variant="ghost"
        :size="size"
        aria-label="Reset timer"
        @click="reset"
      />
    </div>
  </div>
</template>

<script>
import AltrexButton from '@/components/Button/AltrexButton.vue'

export default {
  name: 'AltrexTimer',
  components: {
    AltrexButton
  },
  props: {
    initialTime: {
      type: Number,
      default: 60,
      validator: (value) => value >= 0
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => ['s', 'm', 'l'].includes(value)
    },
    showControls: {
      type: Boolean,
      default: true
    },
    showPresets: {
      type: Boolean,
      default: true
    },
    presets: {
      type: Array,
      default: () => [30, 60, 90, 120, 180, 300]
    }
  },
  data() {
    return {
      timeRemaining: this.initialTime,
      isRunning: false,
      isComplete: false,
      intervalId: null
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeRemaining / 60)
      const seconds = this.timeRemaining % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    percentage() {
      return (this.timeRemaining / this.initialTime) * 100
    },
    circleSize() {
      const sizes = {
        s: 120,
        m: 160,
        l: 200
      }
      return sizes[this.size]
    },
    strokeWidth() {
      const widths = {
        s: 6,
        m: 8,
        l: 10
      }
      return widths[this.size]
    },
    radius() {
      return (this.circleSize - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    strokeDashoffset() {
      return this.circumference - (this.percentage / 100) * this.circumference
    }
  },
  mounted() {
    if (this.autoStart && this.timeRemaining > 0) {
      this.start()
    }
  },
  beforeUnmount() {
    this.clearInterval()
  },
  methods: {
    start() {
      if (this.timeRemaining === 0) {
        this.reset()
      }

      this.isRunning = true
      this.isComplete = false
      this.$emit('start')

      this.intervalId = setInterval(() => {
        this.tick()
      }, 1000)
    },
    pause() {
      this.isRunning = false
      this.clearInterval()
      this.$emit('pause')
    },
    reset() {
      this.isRunning = false
      this.isComplete = false
      this.timeRemaining = this.initialTime
      this.clearInterval()
      this.$emit('reset')
    },
    setTime(seconds) {
      if (!this.isRunning) {
        this.timeRemaining = seconds
        this.isComplete = false
      }
    },
    tick() {
      this.timeRemaining--
      this.$emit('tick', this.timeRemaining)

      if (this.timeRemaining <= 0) {
        this.complete()
      }
    },
    complete() {
      this.isRunning = false
      this.isComplete = true
      this.timeRemaining = 0
      this.clearInterval()
      this.$emit('complete')
      this.playSound()
    },
    clearInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    playSound() {
      // Create a simple beep sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      } catch (error) {
        console.warn('Unable to play timer sound:', error)
      }
    },
    formatPresetLabel(seconds) {
      if (seconds < 60) {
        return `${seconds}s`
      }
      const minutes = seconds / 60
      return `${minutes}m`
    }
  }
}
</script>

<style lang="stylus" scoped>
.altrex-timer
  display: flex
  flex-direction: column
  align-items: center
  gap: $altrex-spacing-6
  width: max-content

  &--s
    gap: $altrex-spacing-4

  &--l
    gap: $altrex-spacing-8

  &--primary
    --altrex-timer-color $altrex-colors-primary-500

  &--success
    --altrex-timer-color $altrex-colors-success-500

  &--warning
    --altrex-timer-color $altrex-colors-warning-500

  &--danger
    --altrex-timer-color $altrex-colors-danger-500

  &--info
    --altrex-timer-color $altrex-colors-info-500

  &--complete
    .altrex-timer__visual
      animation: altrex-timer-pulse 0.5s ease-in-out 3

    .altrex-timer__time
      color: var(--altrex-timer-color)

.altrex-timer__visual
  position: relative
  display: flex
  align-items: center
  justify-content: center

.altrex-timer__circle
  transform: rotate(-90deg)

.altrex-timer__circle-bg
  stroke: var(--altrex-colors-neutral-200)

  [data-theme="dark"] &
    stroke: var(--altrex-colors-dark-border-subtle)

.altrex-timer__circle-progress
  stroke: var(--altrex-timer-color)
  stroke-linecap: round
  transition: stroke-dashoffset 1s linear

  .altrex-timer--complete &
    stroke: var(--altrex-timer-color)

.altrex-timer__time
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  font-weight: $altrex-fontWeight-bold
  color: var(--altrex-colors-neutral-800)
  font-variant-numeric: tabular-nums
  user-select: none

  [data-theme="dark"] &
    color: var(--altrex-colors-dark-text-secondary)

  .altrex-timer--s &
    font-size: $altrex-fontSize-2xl

  .altrex-timer--m &
    font-size: $altrex-fontSize-4xl

  .altrex-timer--l &
    font-size: $altrex-fontSize-5xl

.altrex-timer__presets
  display: flex
  gap: $altrex-spacing-2
  flex-wrap: wrap
  justify-content: center
  max-width: 100%

.altrex-timer__controls
  display: flex
  gap: $altrex-spacing-3
  align-items: center

  .altrex-timer--s &
    gap: $altrex-spacing-2

  .altrex-timer--l &
    gap: $altrex-spacing-4

@keyframes altrex-timer-pulse
  0%, 100%
    transform: scale(1)
  50%
    transform: scale(1.05)
</style>
