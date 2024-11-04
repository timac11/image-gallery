import { action, makeObservable, observable } from 'mobx';
import { UserType } from '@/types/user.ts';
import { AuthPayload } from '@/types/auth.ts';
import { UserApiServiceType } from '@/api/user/user-api-service.ts';

export class UserStore {
  user: UserType = undefined as unknown as UserType;
  isLoading = false;
  isAuthorized = false;
  isFetched = false;

  constructor(
    private readonly userApiService: UserApiServiceType,
    private clearStores: () => void,
  ) {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      isAuthorized: observable,
      isFetched: observable,
      setUser: action,
      setLoading: action,
      setAuthorized: action,
    });
  }

  setUser(user: UserType) {
    this.user = user;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setFetched(isFetched: boolean) {
    this.isFetched = isFetched;
  }

  setAuthorized(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  login = async (payload: AuthPayload): Promise<void> => {
    this.setLoading(true);

    try {
      const data = await this.userApiService.login(payload);
      this.setUser(data.data);
      this.setAuthorized(true);
    } catch (e) {
      // log error
      throw e;
    } finally {
      this.setLoading(false);
    }
  };

  logout = async (): Promise<void> => {
    this.setLoading(true);

    try {
      await this.userApiService.logout();
      this.clearStores();
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
      this.setAuthorized(true);
    } catch (e) {
      // log error
      this.setLoading(false);
      this.setAuthorized(false);
      throw e;
    } finally {
      this.setLoading(false);
      this.setFetched(true);
    }
  };

  clear = () => {
    this.user = undefined as unknown as UserType;
    this.isLoading = false;
    this.isAuthorized = false;
    this.isFetched = false;
  };
}
