<template>
    <div class="min-h-screen bg-white">
        <div class="wrapper">
          <div class="hidden md:block h-screen artwork">
          </div>
          <div class="w-3/5 mx-auto">
            <div class="flex items-center h-full">
              <div class="flex flex-col">
                <div class="font-medium pt-4 text-xl">Threefold Connect Authenticator</div>
                <slot name="content"></slot>
              </div>
            </div>

<!--            <slot name="content"/>-->
          </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.artwork{
  background-image: url("/side.png");
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
}
</style>
