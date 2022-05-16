<template>
    <MainLayout>
        <template #content>
            <div class="pt-2">
                Welcome to the ThreeFold Connect two-factor authenticator, enabling you access to ThreeFold Grid tools
                and solutions. Not a single person in the world will be able to log in to your account, not even us.
            </div>
            <div class="pt-2">Make sure your ThreeFold Connect app is open before sending the login request.</div>

            <div class="pt-2">
                <label class="text-sm font-bold" for="email">
                    What is your username? This can be found under settings in the mobile app</label
                >
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="name"
                        v-model="username"
                        aria-describedby="email-error"
                        class="block w-full pr-10 border-red-300 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                        name="email"
                        type="email"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500" />
                    </div>
                </div>
                <p id="name-error" class="mt-2 text-xs text-red-600">Your password must be less than 4 characters.</p>
            </div>
        </template>
    </MainLayout>
</template>

<script lang="ts" setup>
    import { ExclamationCircleIcon } from '@heroicons/vue/solid';

    import MainLayout from '@/layouts/MainLayout.vue';
    import { ref, watch } from 'vue';

    const username = ref<string>('');

    watch(username, _ => {
        console.log(username.value);
    });

    const validateUsername = () => {
        console.log('Hi');
    };
</script>
