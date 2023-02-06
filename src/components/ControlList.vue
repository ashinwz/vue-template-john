<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col text-left px-4 py-4">
    <div class="flex-col">
      <h1 class="mx-4 text-xl font-semibold text-gray-900 dark:text-white">
        Options
      </h1>
      <p class="mx-4 mt-2 text-sm text-gray-700 dark:text-white">
        A list of all the users in your account including their name, title,
        email and role.
      </p>
    </div>
    <div
      class="mt-4 mx-4 border-t border-b border-gray-100 divide-y divide-gray-200 overflow-y-auto"
    >
      <div
        v-for="(person, personIdx) in people"
        :key="personIdx"
        class="relative flex items-start py-4"
      >
        <div class="min-w-0 flex-1 text-sm">
          <label
            :for="`person-${person.id}`"
            class="font-medium text-gray-700 dark:text-white select-none"
            >{{ person.name }}</label
          >
        </div>
        <div class="ml-3 flex items-center h-5">
          <input
            :id="`person-${person.id}`"
            :name="`person-${person.id}`"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];

export default {
  setup() {
    return {
      people,
    };
  },
};
</script>
