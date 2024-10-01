import type { LoginDTO } from "@/domain/DTOs/Authentication/LoginDTO";
import { AuthenticationRepository } from "@/infrastructure/Core/Repositories/Authentication/AuthenticationRepository";
import { useSessionStore } from "@/stores/Session";
import { useUserStore } from "@/stores/User";

export const AuthenticationService = {
    authRepository: new AuthenticationRepository(),

    async login(loginDTO: LoginDTO): Promise<boolean> {
        try {
            const sessionStore = useSessionStore();
            // const userStore = useUserStore();
            const response = await this.authRepository.login(loginDTO.toObject());

            if (response.code === 200) {
                sessionStore.setDatos(response.data);
                localStorage.setItem('session-store', JSON.stringify(response.data));
                await this.loadUserData();
                localStorage.setItem('session-active', 'true');
                return true;
            }

            return false;
        } catch (error: any) {
            this.handleError(error);
            return false;
        }
    },

    async logout(): Promise<boolean> {
        try {
            const sessionStore = useSessionStore();
            const userStore = useUserStore();
            const response = await this.authRepository.logout();

            // if (response) {
            localStorage.removeItem('session-active');
            localStorage.removeItem('session-store');
            localStorage.removeItem('user');
            sessionStore.$reset();
            userStore.$reset();
            return true;
            // }

            return false;
        } catch (error: any) {
            this.handleError(error);
            return false;
        }
    },

    async loadUserData(): Promise<void> {
        try {
            const userStore = useUserStore();
            const response = await this.authRepository.me() as any;
            console.log(response);

            // if (response.code === 200) {
            localStorage.setItem('user', JSON.stringify(response));
            userStore.setDatos(response);
            // }

        } catch (error: any) {
            this.handleError(error);
        }
    },

    handleError(error: any): void {
        console.error("Ocurrió un error:", error.message || error);
    },
};
