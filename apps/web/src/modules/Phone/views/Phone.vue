<template>
    <MainLayout>
        <template #content>
            <div class="prose prose-blue">
                <h1>Verify phone</h1>

                <div v-if="statusChecking === 0" class="pt-4">
                    <Spinner :text="loadingText"></Spinner>
                </div>

                <div v-if="statusChecking === 1">
                    <VerifySuccess :text="successText"></VerifySuccess>
                </div>

                <div v-if="statusChecking === 2">
                    <VerifyFailed :text="failedText"></VerifyFailed>
                </div>

                <div v-if="isMobile()" class="pt-4">
                    <button
                        type="button"
                        class="bg-threefoldPink w-full text-center items-center px-3 py-3 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white hover:bg-threefoldPink"
                        @click="openApp"
                    >
                        Open ThreeFold Connect app
                    </button>
                </div>
            </div>
        </template>
    </MainLayout>
</template>

<script lang="ts" setup>
    import Spinner from '@/modules/Core/components/Spinner.vue';
    import VerifySuccess from '@/modules/Core/components/VerifySuccess.vue';
    import VerifyFailed from '@/modules/Core/components/VerifyFailed.vue';
    import MainLayout from '@/modules/Core/layouts/MainLayout.vue';

    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import { validatePhone } from '@/modules/Phone/services/phone.service';
    import { isMobile } from '@/modules/Core/utils/mobile.util';

    const route = useRoute();

    const loadingText = ' Please wait while we validate your phone address';
    const failedText = ' There was a problem validating your phone, please contact support if this problem persists.';
    const successText = ' Successfully verified your phone!';

    // Status 0: CHECKING
    // Status 1: SUCCESS
    // Status 2: FAILURE
    const statusChecking = ref<number>(0);

    onMounted(async () => {
        const username = route.query.userId as string;
        const code = route.query.verificationCode as string;

        if (!username || !code) {
            return;
        }

        statusChecking.value = await validatePhone(username, code);
    });

    const openApp = () => {
        const url = 'threebot://register';
        window.open(url);
    };
</script>

<style scoped></style>
