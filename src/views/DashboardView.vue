<template>
  <div class="flex flex-col">
    <div class="px-3 py-3"><TableShow /></div>
    <div class="px-3 py-3 flex flex-row space-x-5">
      <div class="w-1/3 h-[30rem] shadow">
        <ControlList />
      </div>
      <div class="w-2/3 h-[30rem] shadow">
        <DataList />
      </div>
    </div>
  </div>
</template>

<script setup>
import TableShow from "@/components/TableShow.vue";
import DataList from "@/components/DataList.vue";
import ControlList from "@/components/ControlList.vue";
</script>
