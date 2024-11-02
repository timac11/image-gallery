import { action, observable } from 'mobx';
import { UserType } from '@/types/user.ts';
import { AuthPayload } from '@/types/auth.ts';
import { UserApiServiceType } from '@/api/user/user-api-service.ts';

export class UserStore {
  @observable user: UserType = undefined as unknown as UserType;
  @observable isLoading = true;
  @observable isAuthorized = false;

  constructor(private readonly userApiService: UserApiServiceType) {}

  @action setUser(user: UserType) {
    this.user = user;
  }

  @action setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action setAuthorized(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  authUser = async (payload: AuthPayload): Promise<void> => {
    this.setLoading(true);

    try {
      const data = await this.userApiService.auth(payload);
      this.setUser(data.data);
    } catch (e) {
      // log error
      throw e;
    } finally {
      this.setLoading(false);
    }
  };

  fetchProfile = async (): Promise<void> => {
    this.setLoading(true);

    try {
      const data = await this.userApiService.fetchProfile();
      this.setUser(data.data);
    } catch (e) {
      // log error
      throw e;
    } finally {
      this.setLoading(false);
    }
  };
}
