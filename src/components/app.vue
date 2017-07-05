/*
Represents a top level view of the app. Basically just serves as a placeholder
for other top level views, which are inserted by the router.
*/

<template lang=pug>
transition(name='slide',appear)
  router-view
</template>

<script>
  export default {};
</script>


<style>

</style>
