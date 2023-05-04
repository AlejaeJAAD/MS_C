<template>
    <div class="wave-divider">
        <svg viewBox="0 0 1440 320">
            <path fill="#ffffff" d="M0,192L48,181.3C96,171,192,149,288,138.7C384,128,480,128,576,128C672,128,768,128,864,112C960,96,1056,64,1152,48C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
    </div>
</template>

<style scoped>
.wave-divider {
    position: relative;
    z-index: 0;
    overflow: hidden;
}

svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: -1;
}
</style>