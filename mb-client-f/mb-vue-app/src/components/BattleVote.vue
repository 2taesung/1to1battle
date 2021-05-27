<template>
  <div class="d-flex justify-content-center">
    <ul @click.prevent="onClick(battle)">
      {{ battle.title }}
    </ul>
    <button class='btn btn-danger btn-custom-sm' @click.prevent="onClickDelete(battle)" style="padding: 5px;">제거</button>
    
  </div>
</template>

<script>

export default {
  name: 'BattleVote',
  props: {
    battle: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onClick(battle) {
      this.$store.commit('DETAIL_POST', battle)
      this.$router.push('/detail')
    },
    onClickDelete(battle) {
      this.$store.dispatch('FETCH_DELETE_POST', battle)
      console.log(battle)
    }
  }
}
</script>

<style>
</style>