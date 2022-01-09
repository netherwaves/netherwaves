<template>
    <div id="p5Canvas"></div>
</template>

<script>
export default {
    async mounted() {
        const { default: P5 } = await import('p5');

        const sketch = (s) => {
            s.setup = () => {
                s.createCanvas(500, 500);
            };

            s.draw = () => {
                s.background(0);
            };
        }

        const canvas = new P5(sketch, 'p5Canvas');
    }
}
</script>