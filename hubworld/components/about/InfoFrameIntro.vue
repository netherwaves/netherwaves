<template>
    <article class="info-frame">
        <h2 class="title">avery<br>{{ age }}<br>they/none</h2>
        <p class="content">multimedia artist<br>creative developer<br>@ tiohtià:ke (montréal), qc</p>
    </article>
</template>

<script>
export default {
    props: ['data'],

    computed: {
        age() {
            const millis = Math.abs(new Date() - new Date('04/24/2000'));
            return Math.floor(millis / (1000 * 60 * 60 * 24 * 365.25));
        }
    }
}
</script>