<script setup>



const data = ref({
    email: '',
    password: ''
})
const errorMessage = ref(null)

let flags = ref({
    loggingIn: false
})

const auth = useAuth()

onMounted(async () => {
    if (auth.loggedIn) {
        await navigateTo('/')
    }
})

const login = async (e) => {
    e.preventDefault()
    flags.value.loggingIn = true
    try {
        let tmp = await auth.login({body: data.value})
        if (tmp.twoFactor){
            localStorage.setItem('2fa_email', data.value.email)
            return await navigateTo("/auth/2fa")
        }
    } catch (e) {
        console.error(e);
        errorMessage.value = e?.response?._data?.message || e.message
        flags.value.loggingIn = false
        return
    }
    await navigateTo('/')
}
</script>

<template>
    <div class="login login-v1">
        <!-- BEGIN login-container -->
        <div class="login-container">
            <!-- BEGIN login-body -->
            <div class="login-body">
                <!-- BEGIN login-content -->

                <!-- END login-header -->
                <div class="login-content fs-13px">
                    <div class="card rounded-3 shadow">
                        <div class="card-body p-5">
                            <!-- BEGIN login-header -->
                            <div class="login-header">
                                <div class="brand">
                                </div>
                            </div>
                            <div v-if="auth.loggedIn">
                                Logged in
                            </div>
                            <Transition>
                                <div class="alert alert-danger alert-dimissible" v-if="errorMessage" role="alert">
                                    <div>{{ errorMessage }}</div>
                                    <button type="button" class="btn-close" aria-label="Close"
                                            @click="errorMessage=null"></button>
                                </div>
                            </Transition>
                            <form @submit="login">
                                <div class="form-floating mb-20px">
                                    <input type="email" class="form-control fs-13px h-45px" id="emailAddress"
                                            v-model="data.email"
                                            placeholder="Email Address"/>
                                    <label for="emailAddress" class="d-flex align-items-center py-0">
                                        Email
                                        Address
                                    </label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" class="form-control fs-13px h-45px" id="password"
                                            v-model="data.password"
                                            placeholder="Password"/>
                                    <label for="password" class="d-flex align-items-center py-0">Password</label>
                                </div>
                                <div class="mt-0 mb-20px">
                                    <a href="/password/reset" class="fs-10px text-theme">Forgot your password?</a>
                                </div>
                                <div class="login-buttons">
                                    <button type="submit" class="btn h-45px btn-theme d-block w-100 btn-lg"
                                            :disabled="(!data.email || !data.password) || flags.loggingIn">
                                        Sign me in
                                    </button>
                                </div>
                            </form>

                        </div>
                        <!-- END login-content -->
                    </div>
                    <!-- END login-body -->
                </div>
            </div>
        </div>
        <!-- END login-container -->
    </div>
</template>

<style scoped>
.lottie {
    width: 20% !important;
    height: 50% !important;
    display: block;
    position: absolute;
    top: -19%;
    left: -7%;
}

.alert .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1.25rem 1rem;
}
</style>