<template>
    <MainLayout v-if="!isMobile()">
        <template #content>
            <div class="prose">
                <h1>Threefold Connect Authenticator</h1>
                <p>
                    Welcome to the <a class="font-bold">ThreeFold Connect</a> two-factor authenticator, enabling you
                    access to
                    <a class="font-bold">ThreeFold</a>
                    Grid tools and solutions. Not a single person in the world will be able to log in to your account,
                    not even us.
                </p>
                <p>
                    Make sure your <a class="font-bold">ThreeFold Connect app</a> is open before sending the
                    <i>login request</i>.
                </p>
            </div>

            <div class="pt-8">
                <label class="text-sm font-black text-gray-800" for="name">
                    What is your username? This can be found under settings in the mobile app</label
                >
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="name"
                        v-model="username"
                        aria-describedby="email-error"
                        :class="{
                            'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500': errorUsername,
                        }"
                        class="block w-full pr-14 focus:outline-none sm:text-sm rounded-md"
                        name="name"
                        type="text"
                        :maxlength="50"
                        @keyup.enter="login"
                        @keyup="listenToUsername"
                    />
                    <div
                        class="text-sm text-gray-600 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                    >
                        .3bot
                    </div>
                </div>
                <p v-show="errorUsername" id="name-error" class="mt-2 text-xs text-red-600">
                    {{ errorUsername }}
                </p>
            </div>
            <div v-show="username && username.length > 0" class="prose text-xs text-gray-600">
                <div class="pt-1">Your ThreeFold ID: {{ username }}.3bot</div>
            </div>

            <div class="pt-4">
                <button
                    :disabled="!userKnown"
                    type="button"
                    :class="{
                        'bg-gray-500': !userKnown,
                        'bg-threefoldPink': userKnown,
                    }"
                    class="disabled:hover:bg-gray-500 w-full text-center items-center px-3 py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white hover:bg-threefoldPink"
                    @click="login"
                >
                    Sign in
                </button>
            </div>
        </template>
    </MainLayout>
    <div v-else>Mobile Layout WIP</div>
</template>

<script lang="ts" setup>
    import MainLayout from '@/layouts/MainLayout.vue';
    import { onBeforeMount, ref } from 'vue';
    import { validateName } from '@/utils/name.validate';
    import { isMobile } from '@/utils/misc';
    import { emitCheckName } from '@/modules/Core/services/socket.service';
    import { SocketCheckName } from '@/modules/Core/interfaces/socket.interface';
    import { useDebounceFn } from '@vueuse/core';
    import { Config } from '@/modules/Core/configs';
    import { useRouter } from 'vue-router';
    import { loginUser } from '@/modules/Login/services/login.service';
    import { selectedImageId, userKnown, username } from '@/modules/Initial/data';
    import { generateRandomImageId } from '@/modules/Login/utils/generate.util';

    const isValidUsername = ref<boolean>(false);
    const errorUsername = ref<string | null>(null);

    const router = useRouter();

    onBeforeMount(() => {
        setTimeout(() => {
            checkName();
        }, 1000);
    });

    const debounceCheckName = useDebounceFn(() => {
        checkName();
    }, Config.DEBOUNCE_NAME_SOCKET);

    const checkName = () => {
        const socketName: SocketCheckName = { doubleName: username.value + '.3bot' };
        emitCheckName(socketName);
    };

    const listenToUsername = () => {
        debounceCheckName();
        validateUsername();
    };

    const validateUsername = () => {
        const isValidName = validateName(username.value);
        isValidUsername.value = isValidName.valid;
        errorUsername.value = isValidName.error;
    };

    const login = async () => {
        validateUsername();

        if (!isValidUsername.value) return;
        if (!userKnown.value) return;

        selectedImageId.value = generateRandomImageId();

        await loginUser();

        await router.push({ name: 'login' });
    };
</script>
