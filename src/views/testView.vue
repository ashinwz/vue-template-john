<template>
    <div>
        {{ formData }}
        {{ responseData }}
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'FormData',
    computed: {
        ...mapState(['formData']),
        ...mapState(['responseData'])
    }
}
</script>