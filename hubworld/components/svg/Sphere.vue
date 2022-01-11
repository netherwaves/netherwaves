<template>
    <div>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="99.5" vector-effect="non-scaling-stroke"/>
            <circle cx="100" cy="100" r="99.5" stroke="#181818" vector-effect="non-scaling-stroke"/>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
circle:first-child {
    @include dynamicBg(fill);
}
</style>