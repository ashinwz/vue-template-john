<template>
    <div>
        <div class="bg-gray-200 w-20 h-20">
            <svg id="svgExample" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'FormData',
    mounted() {
        this.getImage('OC(C(=O)O[C@H]1C[N+]2(CCCOC3=CC=CC=C3)CCC1CC2)(C1=CC=CS1)C1=CC=CS1')
    },
    methods: {
        getImage(smi) {
            let moleculeOptions = {};
            let reactionOptions = {};

            let sd = new SmiDrawer(moleculeOptions, reactionOptions);
            sd.draw(smi, '#svgExample', 'dark')

        }
    }
}
</script>
